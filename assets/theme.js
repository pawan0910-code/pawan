/* Baroda Fresh theme — progressive enhancement only.
   Every form posts to Shopify natively without JavaScript. */
(() => {
  const theme = window.theme || { strings: {}, routes: {} };
  const cartAddUrl = `${theme.routes.cartAdd || '/cart/add'}.js`;
  const cartUrl = `${theme.routes.cart || '/cart'}.js`;

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

  /* ---------- Cart state ---------- */
  const announce = (message) => {
    const status = document.getElementById('CartStatus');
    if (!status) return;
    status.textContent = '';
    window.setTimeout(() => { status.textContent = message; }, 50);
  };

  const renderCart = (cart) => {
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.hidden = cart.item_count === 0;
      el.firstChild.nodeValue = String(cart.item_count);
    });
    const dock = document.querySelector('[data-cart-dock]');
    if (dock) {
      const count = dock.querySelector('[data-cart-dock-count]');
      const total = dock.querySelector('[data-cart-dock-total]');
      const template = cart.item_count === 1 ? theme.strings.itemsOne : theme.strings.itemsOther;
      if (count && template) count.textContent = template.replace('[count]', cart.item_count);
      if (total) total.textContent = formatPrice(cart.total_price);
      dock.hidden = cart.item_count === 0;
    }
  };

  const flashButton = (button) => {
    const label = button.querySelector('[data-label]');
    const icon = button.querySelector('.icon');
    const prevLabel = label ? label.textContent : null;
    const prevIcon = icon ? icon.textContent : null;
    if (label) label.textContent = theme.strings.added;
    if (icon) icon.textContent = 'check';
    button.classList.add('is-added');
    window.setTimeout(() => {
      if (label) label.textContent = prevLabel;
      if (icon) icon.textContent = prevIcon;
      button.classList.remove('is-added');
    }, 1200);
  };

  document.addEventListener('submit', async (event) => {
    const form = event.target.closest('[data-product-form]');
    if (!form || !window.fetch) return;
    event.preventDefault();

    const button = form.querySelector('[type="submit"]');
    if (!button || button.disabled || button.getAttribute('aria-busy') === 'true') return;
    button.setAttribute('aria-busy', 'true');

    try {
      const response = await fetch(cartAddUrl, {
        method: 'POST',
        headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: new FormData(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.description || data.message || theme.strings.addError);

      flashButton(button);
      const cart = await (await fetch(cartUrl, { headers: { Accept: 'application/json' } })).json();
      renderCart(cart);
      announce(`${data.product_title || data.title} — ${theme.strings.addedToCart}`);
      const error = form.querySelector('[data-form-error]');
      if (error) error.textContent = '';
    } catch (error) {
      const target = form.querySelector('[data-form-error]');
      if (target) target.textContent = error.message;
      announce(error.message || theme.strings.addError);
    } finally {
      button.removeAttribute('aria-busy');
    }
  });

  /* ---------- Variant pills (spotlight + product page) ---------- */
  document.querySelectorAll('[data-variant-form]').forEach((form) => {
    const json = form.querySelector('[data-variants]');
    if (!json) return;
    const variants = JSON.parse(json.textContent);
    const idInput = form.querySelector('[data-variant-id]');
    const price = form.querySelector('[data-price]') || form.closest('[data-product]')?.querySelector('[data-price]');
    const compare = form.closest('[data-product]')?.querySelector('[data-compare-price]');
    const title = form.querySelector('[data-variant-title]');
    const button = form.querySelector('[data-add-button]');
    const buttonLabel = button?.querySelector('[data-label]');

    form.addEventListener('change', (event) => {
      if (!event.target.matches('[data-option-index]')) return;
      const selected = [];
      form.querySelectorAll('[data-option-index]:checked').forEach((input) => {
        selected[Number(input.dataset.optionIndex)] = input.value;
      });
      const variant = variants.find((v) => v.options.every((value, i) => value === selected[i]));

      if (!variant) {
        if (button) button.disabled = true;
        if (buttonLabel) buttonLabel.textContent = theme.strings.unavailable;
        return;
      }
      idInput.value = variant.id;
      if (price) price.textContent = formatPrice(variant.price);
      if (title) title.textContent = variant.title;
      if (compare) {
        const onSale = variant.compare_at_price && variant.compare_at_price > variant.price;
        compare.hidden = !onSale;
        if (onSale) compare.textContent = formatPrice(variant.compare_at_price);
      }
      if (button) {
        button.disabled = !variant.available;
        if (buttonLabel) buttonLabel.textContent = variant.available ? button.dataset.labelAdd : theme.strings.soldOut;
      }
      if (form.hasAttribute('data-update-url') && window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set('variant', variant.id);
        window.history.replaceState({}, '', url);
      }
    });
  });

  /* ---------- Quantity steppers ---------- */
  document.addEventListener('click', (event) => {
    const step = event.target.closest('[data-qty-step]');
    if (!step) return;
    const input = step.closest('.qty')?.querySelector('input');
    if (!input) return;
    const min = Number(input.min || 0);
    const next = Math.max(min, Number(input.value || 0) + Number(step.dataset.qtyStep));
    input.value = next;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  /* ---------- Auto-submit (sort select, cart quantity) ---------- */
  document.addEventListener('change', (event) => {
    const el = event.target.closest('[data-autosubmit]');
    if (!el) return;
    const form = el.form || el.closest('form');
    if (!form) return;
    window.clearTimeout(form._submitTimer);
    form._submitTimer = window.setTimeout(() => form.requestSubmit ? form.requestSubmit() : form.submit(), 400);
  });

  /* ---------- Header search icon focuses on-page search bar ---------- */
  document.querySelectorAll('[data-search-toggle]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const input = document.querySelector('[data-searchbar] input[type="search"]');
      if (!input) return;
      event.preventDefault();
      input.scrollIntoView({ block: 'center', behavior: 'smooth' });
      input.focus({ preventScroll: true });
    });
  });

  /* ---------- Voice search (only where supported) ---------- */
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (Recognition) {
    document.querySelectorAll('[data-voice-search]').forEach((button) => {
      const form = button.closest('form');
      const input = form.querySelector('input[type="search"]');
      button.hidden = false;
      button.addEventListener('click', () => {
        const recognition = new Recognition();
        recognition.lang = document.documentElement.lang || 'en';
        recognition.interimResults = false;
        button.classList.add('is-listening');
        input.placeholder = theme.strings.listening;
        recognition.onresult = (e) => {
          input.value = e.results[0][0].transcript;
          form.submit();
        };
        recognition.onend = () => button.classList.remove('is-listening');
        recognition.start();
      });
    });
  }
})();
