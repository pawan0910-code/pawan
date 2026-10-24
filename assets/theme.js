/* Baroda Fresh theme — progressive enhancement only.
   Every form and link still works without JavaScript.

   All behaviour is wired through a handful of delegated listeners on `document`,
   so nothing is lost when markup is re-rendered (basket updates, Theme Editor
   section reloads, back/forward cache restores) and nothing is bound twice. */
(() => {
  if (window.__barodaFreshInit) return;
  window.__barodaFreshInit = true;

  const theme = window.theme || { strings: {}, routes: {} };
  const routes = theme.routes || {};
  const strings = theme.strings || {};
  const cartAddUrl = `${routes.cartAdd || '/cart/add'}.js`;
  const cartChangeUrl = `${routes.cartChange || '/cart/change'}.js`;
  const cartPath = routes.cart || '/cart';
  const DRAWER_SECTION = 'cart-drawer';

  /* ---------- Money ---------- */
  const formatMoney = (cents, format = theme.moneyFormat || '{{amount}}') => {
    const value = Number(cents) / 100;
    const withDelimiters = (num, decimals, thousands = ',', decimal = '.') => {
      const [whole, frac] = num.toFixed(decimals).split('.');
      const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
      return frac ? `${grouped}${decimal}${frac}` : grouped;
    };
    return format.replace(/\{\{\s*(\w+)\s*\}\}/, (_, key) => {
      switch (key) {
        case 'amount_no_decimals': return withDelimiters(value, 0);
        case 'amount_with_comma_separator': return withDelimiters(value, 2, '.', ',');
        case 'amount_no_decimals_with_comma_separator': return withDelimiters(value, 0, '.');
        case 'amount_with_apostrophe_separator': return withDelimiters(value, 2, "'");
        case 'amount_with_space_separator': return withDelimiters(value, 2, ' ', ',');
        default: return withDelimiters(value, 2);
      }
    });
  };
  // Mirrors Liquid's money_without_trailing_zeros used in the templates.
  const formatPrice = (cents) => formatMoney(cents).replace(/([.,])00(?!\d)/, '');
  theme.formatPrice = formatPrice; // shared with fruit-tools.js

  const announce = (message) => {
    const status = document.getElementById('CartStatus');
    if (!status || !message) return;
    status.textContent = '';
    window.setTimeout(() => { status.textContent = message; }, 50);
  };

  /* ---------- Basket: state + rendering ---------- */
  const drawer = () => document.querySelector('[data-cart-drawer]');
  const onCartPage = () => Boolean(document.querySelector('[data-cart-page]'));

  const setCount = (count) => {
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = String(count);
      el.hidden = count === 0;
    });
    document.querySelectorAll('[data-cart-count-text]').forEach((el) => { el.textContent = String(count); });
  };

  const parse = (html) => new DOMParser().parseFromString(html, 'text/html');

  // Replace the drawer's inner panel (keeps the <dialog> itself, so an open drawer stays open).
  const renderDrawer = (html) => {
    const current = document.querySelector('[data-cart-drawer-inner]');
    if (!html || !current) return;
    const next = parse(html).querySelector('[data-cart-drawer-inner]');
    if (!next) return;
    const hadFocus = current.contains(document.activeElement);
    current.replaceWith(next);
    setCount(Number(next.dataset.itemCount || 0));
    applyLocation();
    if (hadFocus) (next.querySelector('[data-cart-close]') || next).focus({ preventScroll: true });
  };

  const renderCartPage = (html) => {
    const current = document.querySelector('[data-cart-page]');
    if (!html || !current) return;
    const next = parse(html).querySelector('[data-cart-page]');
    if (next) { current.replaceWith(next); applyLocation(); }
  };

  const sectionsParam = () => {
    const ids = [DRAWER_SECTION];
    const page = document.querySelector('[data-cart-page]');
    if (page) ids.push(page.dataset.cartPage);
    return ids.join(',');
  };

  const applySections = (sections = {}) => {
    renderDrawer(sections[DRAWER_SECTION]);
    const page = document.querySelector('[data-cart-page]');
    if (page) renderCartPage(sections[page.dataset.cartPage]);
  };

  // Re-sync the basket from the server (used on back/forward restores and tab refocus).
  const refreshCart = async () => {
    try {
      const url = `${window.location.pathname}?sections=${encodeURIComponent(sectionsParam())}`;
      const response = await fetch(url, { headers: { Accept: 'application/json' } });
      if (response.ok) applySections(await response.json());
    } catch (e) { /* offline — keep what we have */ }
  };

  const showError = (message) => {
    const target = document.querySelector('[data-cart-error]');
    if (target) target.textContent = message || '';
  };

  /* ---------- Basket drawer open / close ---------- */
  const openDrawer = (opener) => {
    const dialog = drawer();
    if (!dialog || typeof dialog.showModal !== 'function') return false;
    closeFilters();
    if (!dialog.open) {
      dialog._opener = opener || document.activeElement;
      dialog.showModal();
    }
    document.querySelectorAll('[data-cart-open]').forEach((el) => el.setAttribute('aria-expanded', 'true'));
    return true;
  };

  const closeDrawer = () => {
    const dialog = drawer();
    if (dialog && dialog.open) dialog.close();
  };

  // Runs for every way the dialog closes (button, Esc, backdrop, programmatic).
  document.addEventListener('close', (event) => {
    if (!event.target.matches || !event.target.matches('[data-cart-drawer]')) return;
    document.querySelectorAll('[data-cart-open]').forEach((el) => el.setAttribute('aria-expanded', 'false'));
    showError('');
    const opener = event.target._opener;
    event.target._opener = null;
    if (opener && opener.isConnected && typeof opener.focus === 'function') opener.focus({ preventScroll: true });
  }, true);

  /* ---------- Basket: line changes (drawer + cart page) ---------- */
  let queue = Promise.resolve();
  const changeLine = (key, quantity) => {
    queue = queue.then(async () => {
      const panels = document.querySelectorAll('[data-cart-drawer-inner], [data-cart-page]');
      panels.forEach((el) => el.setAttribute('aria-busy', 'true'));
      try {
        const response = await fetch(cartChangeUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ id: key, quantity, sections: sectionsParam(), sections_url: window.location.pathname }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.description || data.message || strings.cartError);
        applySections(data.sections);
        if (data.sections == null) await refreshCart();
        showError('');
      } catch (error) {
        await refreshCart();
        showError(error.message || strings.cartError);
        announce(error.message || strings.cartError);
      } finally {
        document.querySelectorAll('[data-cart-drawer-inner], [data-cart-page]').forEach((el) => el.removeAttribute('aria-busy'));
      }
    });
    return queue;
  };

  /* ---------- Add to basket ---------- */
  const flashButton = (button) => {
    const label = button.querySelector('[data-label]');
    const icon = button.querySelector('.icon');
    if (button._flashTimer) return; // already flashing — keep the original label/icon
    const prevLabel = label ? label.textContent : null;
    const prevIcon = icon ? icon.textContent : null;
    if (label) label.textContent = strings.added;
    if (icon) icon.textContent = 'check';
    button.classList.add('is-added');
    button._flashTimer = window.setTimeout(() => {
      if (label && label.isConnected) label.textContent = prevLabel;
      if (icon && icon.isConnected) icon.textContent = prevIcon;
      button.classList.remove('is-added');
      button._flashTimer = null;
    }, 1200);
  };

  document.addEventListener('submit', async (event) => {
    const form = event.target.closest && event.target.closest('[data-product-form]');
    if (!form || !window.fetch) return;
    // Dynamic checkout ("Buy it now") and other non-add submitters keep native behaviour.
    if (event.submitter && event.submitter.name && event.submitter.name !== 'add') return;
    event.preventDefault();

    const button = form.querySelector('[type="submit"][name="add"]') || form.querySelector('[type="submit"]');
    if (!button || button.disabled || button.getAttribute('aria-busy') === 'true') return;
    button.setAttribute('aria-busy', 'true');
    const error = form.querySelector('[data-form-error]');
    if (error) error.textContent = '';

    try {
      const body = new FormData(form);
      body.append('sections', sectionsParam());
      body.append('sections_url', window.location.pathname);
      const response = await fetch(cartAddUrl, {
        method: 'POST',
        headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.description || data.message || strings.addError);

      if (button.isConnected) flashButton(button);
      if (data.sections) applySections(data.sections); else await refreshCart();
      announce(`${data.product_title || data.title} — ${strings.addedToCart}`);
      if (!onCartPage()) openDrawer(button.isConnected ? button : null);
    } catch (err) {
      if (error) error.textContent = err.message;
      else if (drawer() && drawer().open) showError(err.message);
      announce(err.message || strings.addError);
    } finally {
      button.removeAttribute('aria-busy');
    }
  });

  /* ---------- Variant pills (spotlight + product page) ---------- */
  const variantCache = new WeakMap();
  const variantsFor = (form) => {
    if (variantCache.has(form)) return variantCache.get(form);
    const json = form.querySelector('[data-variants]');
    let variants = [];
    try { variants = json ? JSON.parse(json.textContent) : []; } catch (e) { variants = []; }
    variantCache.set(form, variants);
    return variants;
  };

  const onVariantChange = (form) => {
    const variants = variantsFor(form);
    if (!variants.length) return;
    const scope = form.closest('[data-product]') || form.closest('[data-spotlight]') || form;
    const idInput = form.querySelector('[data-variant-id]');
    const price = form.querySelector('[data-price]') || scope.querySelector('[data-price]');
    const compare = scope.querySelector('[data-compare-price]');
    const title = form.querySelector('[data-variant-title]');
    const button = form.querySelector('[data-add-button]');
    const buttonLabel = button && button.querySelector('[data-label]');

    const selected = [];
    form.querySelectorAll('[data-option-index]:checked').forEach((input) => {
      selected[Number(input.dataset.optionIndex)] = input.value;
    });
    const variant = variants.find((v) => v.options.every((value, i) => value === selected[i]));

    if (!variant) {
      if (button) button.disabled = true;
      if (buttonLabel) buttonLabel.textContent = strings.unavailable;
      return;
    }
    if (idInput) idInput.value = variant.id;
    if (price) price.textContent = formatPrice(variant.price);
    if (title) title.textContent = variant.title;
    if (compare) {
      const onSale = variant.compare_at_price && variant.compare_at_price > variant.price;
      compare.hidden = !onSale;
      if (onSale) compare.textContent = formatPrice(variant.compare_at_price);
    }
    if (button) {
      button.disabled = !variant.available;
      if (buttonLabel) buttonLabel.textContent = variant.available ? button.dataset.labelAdd : strings.soldOut;
    }
    if (form.hasAttribute('data-update-url') && window.history.replaceState) {
      const url = new URL(window.location.href);
      url.searchParams.set('variant', variant.id);
      window.history.replaceState(window.history.state, '', url);
    }
  };

  /* ---------- Collection filter dropdowns ---------- */
  const closeFilters = (except) => {
    document.querySelectorAll('details.filter[open]').forEach((el) => {
      if (el !== except) el.removeAttribute('open');
    });
  };

  document.addEventListener('toggle', (event) => {
    const details = event.target;
    if (details.matches && details.matches('details.filter') && details.open) closeFilters(details);
  }, true);

  /* ---------- Delegated change handler ---------- */
  document.addEventListener('change', (event) => {
    const target = event.target;

    if (target.matches('[data-option-index]')) {
      const form = target.closest('[data-variant-form]');
      if (form) onVariantChange(form);
      return;
    }

    if (target.matches('[data-cart-input]')) {
      const quantity = Math.max(0, parseInt(target.value, 10) || 0);
      window.clearTimeout(target._timer);
      target._timer = window.setTimeout(() => changeLine(target.dataset.cartInput, quantity), 300);
      return;
    }

    const auto = target.closest('[data-autosubmit]');
    if (auto) {
      const form = auto.form || auto.closest('form');
      if (!form) return;
      window.clearTimeout(form._submitTimer);
      form._submitTimer = window.setTimeout(() => (form.requestSubmit ? form.requestSubmit() : form.submit()), 400);
    }
  });

  /* ---------- Sheets (location, account) ---------- */
  const openSheet = (id, opener) => {
    const sheet = document.getElementById(id);
    if (!sheet || typeof sheet.showModal !== 'function') return false;
    if (!sheet.open) { sheet._opener = opener || document.activeElement; sheet.showModal(); }
    return true;
  };
  document.addEventListener('close', (event) => {
    const el = event.target;
    if (!el.matches || !el.matches('dialog.drawer') || el.matches('[data-cart-drawer]')) return;
    if (el._opener && el._opener.isConnected) el._opener.focus({ preventScroll: true });
    el._opener = null;
  }, true);

  /* ---------- Delivery location ---------- */
  const LOC_KEY = 'bf-location';
  const readLocation = () => { try { return JSON.parse(window.localStorage.getItem(LOC_KEY)); } catch (e) { return null; } };
  const writeLocation = (loc) => { try { window.localStorage.setItem(LOC_KEY, JSON.stringify(loc)); } catch (e) { /* private mode */ } };
  function applyLocation() {
    const loc = readLocation();
    document.querySelectorAll('[data-location-label]').forEach((el) => {
      el.textContent = loc && loc.label ? loc.label : (el.dataset.default || el.textContent);
    });
    document.querySelectorAll('[data-location-pin-value]').forEach((el) => { el.textContent = loc && loc.pincode ? ` · ${loc.pincode}` : ''; });
  }
  const locationSheet = () => document.querySelector('[data-location-sheet]');
  const pincodeAllowed = (pin, spec) => String(spec || '').split(/[\s,]+/).filter(Boolean).some((part) => {
    const [from, to] = part.split('-').map((x) => parseInt(x, 10));
    const n = parseInt(pin, 10);
    return to ? n >= from && n <= to : n === from;
  });
  const setLocStatus = (text, ok) => {
    const el = document.querySelector('[data-location-status]');
    if (!el) return;
    el.hidden = !text;
    el.textContent = text || '';
    el.classList.toggle('is-ok', ok === true);
    el.classList.toggle('is-error', ok === false);
  };
  const syncLocationToCart = (loc) => {
    if (!loc || !window.fetch) return Promise.resolve();
    return fetch(`${routes.cartUpdate || '/cart/update'}.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ attributes: { 'Delivery area': loc.label || '', 'Delivery pincode': loc.pincode || '' } }),
    }).catch(() => {});
  };
  const saveLocation = (loc, message) => {
    const saved = { ...loc, ts: Date.now() };
    writeLocation(saved);
    applyLocation();
    setLocStatus(message, true);
    syncLocationToCart(saved);
    const sheet = locationSheet();
    if (sheet && sheet.open) window.setTimeout(() => { if (sheet.open) sheet.close(); }, 900);
  };
  const distanceKm = (a, b) => {
    const R = 6371; const rad = (d) => (d * Math.PI) / 180;
    const dLat = rad(b[0] - a[0]); const dLng = rad(b[1] - a[1]);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  };
  const useGps = (button) => {
    const sheet = locationSheet();
    if (!sheet) return;
    const city = sheet.dataset.city || 'Vadodara';
    if (!navigator.geolocation) { setLocStatus(strings.locNoGps || 'Location isn’t available on this device — enter your pincode or pick your area.', false); return; }
    button.setAttribute('aria-busy', 'true');
    setLocStatus(strings.locFinding || 'Finding your location…');
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const here = [pos.coords.latitude, pos.coords.longitude];
      const center = (sheet.dataset.center || '').split(',').map(Number);
      const radius = Number(sheet.dataset.radius || 15);
      const km = center.length === 2 && center.every(Number.isFinite) ? distanceKm(here, center) : 0;
      if (km > radius) {
        button.removeAttribute('aria-busy');
        setLocStatus(`You’re about ${Math.round(km)} km from ${city}. We currently deliver only within ${city}.`, false);
        return;
      }
      let area = null; let pincode = null;
      if (sheet.dataset.reverseGeocode === 'true') {
        try {
          const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=16&addressdetails=1&accept-language=en&lat=${here[0]}&lon=${here[1]}`, { headers: { Accept: 'application/json' } });
          const data = await r.json();
          const a = data.address || {};
          area = a.suburb || a.neighbourhood || a.quarter || a.city_district || a.residential || a.road || null;
          pincode = a.postcode ? String(a.postcode).replace(/\s/g, '') : null;
        } catch (e) { /* area name is optional */ }
      }
      button.removeAttribute('aria-busy');
      const label = area ? `${area}, ${city}` : (strings.locCurrent || `Current location, ${city}`);
      saveLocation({ label, area, pincode, source: 'gps' }, `✓ We deliver to ${label}.`);
    }, (err) => {
      button.removeAttribute('aria-busy');
      setLocStatus(err && err.code === 1
        ? 'Location permission was blocked — enter your pincode or pick your area instead.'
        : 'Couldn’t get your location — enter your pincode or pick your area instead.', false);
    }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 });
  };

  document.addEventListener('submit', (event) => {
    const form = event.target.closest && event.target.closest('[data-location-pin]');
    if (!form) return;
    event.preventDefault();
    const sheet = locationSheet();
    const pin = (form.elements.pincode.value || '').replace(/\D/g, '');
    const city = (sheet && sheet.dataset.city) || 'Vadodara';
    if (pin.length !== 6) { setLocStatus('Please enter a 6-digit pincode.', false); form.elements.pincode.focus(); return; }
    if (pincodeAllowed(pin, sheet && sheet.dataset.pincodes)) {
      const current = readLocation();
      const label = current && current.area ? `${current.area}, ${city}` : `${city} ${pin}`;
      saveLocation({ label, area: current && current.area, pincode: pin, source: 'pincode' }, `✓ Great — we deliver to ${pin}.`);
    } else {
      setLocStatus(`Sorry, we don’t deliver to ${pin} yet. We deliver across ${city}.`, false);
    }
  }, true);

  document.addEventListener('input', (event) => {
    const filter = event.target.closest && event.target.closest('[data-location-filter]');
    if (filter) {
      const q = filter.value.trim().toLowerCase();
      document.querySelectorAll('[data-location-area]').forEach((b) => { b.parentElement.hidden = q && !b.dataset.locationArea.toLowerCase().includes(q); });
      return;
    }
    const note = event.target.closest && event.target.closest('[data-cart-note]');
    if (note) {
      window.clearTimeout(note._timer);
      note._timer = window.setTimeout(() => {
        fetch(`${routes.cartUpdate || '/cart/update'}.js`, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ note: note.value }),
        }).catch(() => {});
      }, 500);
    }
  });

  /* ---------- Delegated click handler ---------- */
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    // Open the basket (header bag, Basket tab). Modified clicks still open /cart normally.
    const opener = target.closest('[data-cart-open]');
    if (opener) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0 || onCartPage()) return;
      if (openDrawer(opener)) event.preventDefault();
      return;
    }

    // Open a sheet (location, account). Modified clicks on links keep native behaviour.
    const sheetOpener = target.closest('[data-sheet-open]');
    if (sheetOpener) {
      if (sheetOpener.tagName === 'A' && (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0)) return;
      if (openSheet(sheetOpener.dataset.sheetOpen, sheetOpener)) event.preventDefault();
      return;
    }
    const openSheetEl = target.closest('dialog.drawer:not([data-cart-drawer])');
    if (openSheetEl && openSheetEl.open) {
      if (target === openSheetEl || target.closest('[data-sheet-close]')) { openSheetEl.close(); return; }
    }
    const gps = target.closest('[data-location-gps]');
    if (gps) { useGps(gps); return; }
    const area = target.closest('[data-location-area]');
    if (area) {
      const sheet = locationSheet();
      const city = (sheet && sheet.dataset.city) || 'Vadodara';
      const current = readLocation();
      saveLocation({ label: `${area.dataset.locationArea}, ${city}`, area: area.dataset.locationArea, pincode: current && current.pincode, source: 'area' }, `✓ We deliver to ${area.dataset.locationArea}.`);
      return;
    }

    // Close the basket: close button / links inside it, or a click on the backdrop.
    const dialog = drawer();
    if (dialog && dialog.open) {
      if (target === dialog) { closeDrawer(); return; }
      const closer = target.closest('[data-cart-close]');
      if (closer && dialog.contains(closer)) {
        if (closer.tagName !== 'A') event.preventDefault();
        closeDrawer();
        return;
      }
    }

    // Basket line quantity / remove buttons (drawer + cart page).
    const lineButton = target.closest('[data-cart-key][data-cart-qty]');
    if (lineButton) {
      event.preventDefault();
      if (lineButton.getAttribute('aria-disabled') === 'true') return;
      lineButton.setAttribute('aria-disabled', 'true');
      changeLine(lineButton.dataset.cartKey, Math.max(0, Number(lineButton.dataset.cartQty)));
      return;
    }

    // Quantity steppers (product page + cart page inputs).
    const step = target.closest('[data-qty-step]');
    if (step) {
      const input = step.closest('.qty') && step.closest('.qty').querySelector('input');
      if (!input) return;
      const min = Number(input.min || 0);
      const max = input.max ? Number(input.max) : Infinity;
      const next = Math.min(max, Math.max(min, (parseInt(input.value, 10) || 0) + Number(step.dataset.qtyStep)));
      if (String(next) === input.value) return;
      input.value = next;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      return;
    }

    // Header search icon: focus the on-page search bar when there is one.
    const searchToggle = target.closest('[data-search-toggle]');
    if (searchToggle) {
      const input = document.querySelector('[data-searchbar] input[type="search"]');
      if (!input) return;
      event.preventDefault();
      input.scrollIntoView({ block: 'center', behavior: 'smooth' });
      input.focus({ preventScroll: true });
      return;
    }

    // Voice search.
    const voice = target.closest('[data-voice-search]');
    if (voice) { startVoiceSearch(voice); return; }

    // Click outside an open filter dropdown closes it.
    if (!target.closest('details.filter')) closeFilters();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const open = document.querySelector('details.filter[open]');
    if (open) {
      open.removeAttribute('open');
      const summary = open.querySelector('summary');
      if (summary) summary.focus();
    }
  });

  /* ---------- Voice search (only where supported) ---------- */
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const revealVoice = () => {
    if (!Recognition) return;
    document.querySelectorAll('[data-voice-search][hidden]').forEach((button) => { button.hidden = false; });
  };
  const startVoiceSearch = (button) => {
    if (!Recognition || button.classList.contains('is-listening')) return;
    const form = button.closest('form');
    const input = form && form.querySelector('input[type="search"]');
    if (!input) return;
    const recognition = new Recognition();
    const placeholder = input.placeholder;
    recognition.lang = document.documentElement.lang || 'en';
    recognition.interimResults = false;
    button.classList.add('is-listening');
    input.placeholder = strings.listening || placeholder;
    recognition.onresult = (e) => {
      input.value = e.results[0][0].transcript;
      form.submit();
    };
    recognition.onend = () => {
      button.classList.remove('is-listening');
      input.placeholder = placeholder;
    };
    recognition.onerror = recognition.onend;
    try { recognition.start(); } catch (e) { recognition.onend(); }
  };
  revealVoice();
  applyLocation();

  /* ---------- Product recommendations ("You may also like") ---------- */
  const loadRecommendations = async () => {
    const containers = document.querySelectorAll('[data-recommendations][data-url]:not([data-loaded])');
    containers.forEach(async (container) => {
      container.setAttribute('data-loaded', '');
      try {
        const response = await fetch(container.dataset.url);
        if (!response.ok) return;
        const next = parse(await response.text()).querySelector('[data-recommendations]');
        if (next && next.innerHTML.trim()) container.innerHTML = next.innerHTML;
      } catch (e) { /* recommendations are optional */ }
    });
  };
  loadRecommendations();

  /* ---------- Page lifecycle ---------- */
  // Back/forward cache restores a frozen page: sync the basket and never restore an open overlay.
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    closeDrawer();
    closeFilters();
    document.querySelectorAll('[aria-busy="true"]').forEach((el) => el.removeAttribute('aria-busy'));
    refreshCart();
    applyLocation();
  });

  // Theme Editor: re-apply progressive enhancements after a section is re-rendered.
  document.addEventListener('shopify:section:load', () => {
    revealVoice();
    loadRecommendations();
  });
})();
