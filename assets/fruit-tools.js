/* Baroda Fresh — fruit tools: compare, fruit guide (smart search), season calendar, finder.
   Data: <script data-fruit-data> (snippets/fruit-data.liquid) built from the Fruit Guide
   metaobjects. Every value is per 100 g edible portion (USDA FoodData Central / IFCT 2017).
   % Daily Value uses the US FDA reference values for adults (2,000 kcal diet). */
(() => {
  if (window.__fruitToolsInit) return;
  window.__fruitToolsInit = true;

  const theme = window.theme || {};
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const nowMonth = MONTHS[new Date().getMonth()];
  const price = (cents) => (typeof theme.formatPrice === 'function' ? theme.formatPrice(cents) : `₹${Math.round(cents / 100)}`);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : null; };
  const round = (n, d) => (n == null ? null : Math.round(n * 10 ** d) / 10 ** d);
  const fmt = (n, d = 1) => (n == null ? '—' : String(round(n, d)));

  /* ---------- Nutrient catalogue ---------- */
  // better: 'high' | 'low' | null (no winner — e.g. fat, carbs). dv: FDA Daily Value.
  const MACROS = [
    { key: 'kcal', label: 'Energy', unit: 'kcal', d: 0, better: 'low', hint: 'lower = lighter' },
    { key: 'carbs', label: 'Carbohydrates', unit: 'g', d: 1, better: null, dv: 275 },
    { key: 'sugar', label: 'Natural sugar', unit: 'g', d: 1, better: 'low', hint: 'lower = less sugar' },
    { key: 'fiber', label: 'Dietary fibre', unit: 'g', d: 1, better: 'high', dv: 28 },
    { key: 'protein', label: 'Protein', unit: 'g', d: 1, better: 'high', dv: 50 },
    { key: 'fat', label: 'Fat', unit: 'g', d: 1, better: null, dv: 78 },
    { key: 'water', label: 'Water', unit: '%', d: 0, better: 'high', hint: 'higher = more hydrating' },
  ];
  const MICROS = [
    { key: 'vitc', label: 'Vitamin C', unit: 'mg', d: 0, better: 'high', dv: 90 },
    { key: 'vita', label: 'Vitamin A', unit: 'µg', d: 0, better: 'high', dv: 900 },
    { key: 'folate', label: 'Folate (B9)', unit: 'µg', d: 0, better: 'high', dv: 400 },
    { key: 'b6', label: 'Vitamin B6', unit: 'mg', d: 2, better: 'high', dv: 1.7 },
    { key: 'vitk', label: 'Vitamin K', unit: 'µg', d: 1, better: 'high', dv: 120 },
    { key: 'potassium', label: 'Potassium', unit: 'mg', d: 0, better: 'high', dv: 4700 },
    { key: 'mg', label: 'Magnesium', unit: 'mg', d: 0, better: 'high', dv: 420 },
    { key: 'ca', label: 'Calcium', unit: 'mg', d: 0, better: 'high', dv: 1300 },
    { key: 'fe', label: 'Iron', unit: 'mg', d: 2, better: 'high', dv: 18 },
  ];
  const ALL = [...MACROS, ...MICROS];
  const pctDV = (m, v) => (m.dv && v != null ? Math.round((v / m.dv) * 100) : null);
  const giBand = (gi) => (gi == null ? null : gi <= 55 ? 'Low' : gi <= 69 ? 'Medium' : 'High');

  /* ---------- Data ---------- */
  const gramsOf = (title) => {
    const m = String(title || '').match(/(\d+(?:\.\d+)?)\s*(kg|g|gm|gms|grams?)\b/i);
    if (!m) return null;
    return m[2].toLowerCase() === 'kg' ? parseFloat(m[1]) * 1000 : parseFloat(m[1]);
  };
  const load = () => {
    const el = document.querySelector('[data-fruit-data]');
    if (!el) return [];
    let raw = [];
    try { raw = JSON.parse(el.textContent); } catch (e) { return []; }
    const seen = new Set();
    return raw.filter((f) => f && f.name).map((f, i) => {
      const fruit = { ...f };
      // A fruit must have a unique key even if a handle is missing.
      let handle = f.handle || String(f.name).toLowerCase().replace(/[^a-z0-9]+/g, '-');
      if (seen.has(handle)) handle = `${handle}-${i}`;
      seen.add(handle);
      fruit.handle = handle;
      ALL.forEach((m) => { fruit[m.key] = num(f[m.key]); });
      fruit.gi = num(f.gi);
      fruit.months = Array.isArray(f.months) ? f.months : [];
      fruit.inSeason = fruit.months.includes(nowMonth);
      let buy = null;
      (f.products || []).forEach((p) => {
        if (!p || !p.available) return;
        (p.variants || []).forEach((v) => {
          if (!v.available) return;
          if (!buy || v.price < buy.variant.price) buy = { product: p, variant: v };
        });
      });
      fruit.buy = buy;
      fruit.url = buy ? buy.product.url : null;
      fruit.hasNutrition = fruit.kcal != null;
      return fruit;
    });
  };

  /* ---------- Shared bits ---------- */
  const thumb = (F, size = 64) => (F.img
    ? `<img src="${esc(F.img)}" alt="" width="${size}" height="${size}" loading="lazy">`
    : `<span class="icon" aria-hidden="true">nutrition</span>`);

  const addForm = (F, cls = 'btn btn--primary') => {
    if (!F.buy) return `<span class="ft-soon t-label">${esc(F.months.length ? 'Back in season soon' : 'Currently unavailable')}</span>`;
    const { variant } = F.buy;
    const label = variant.title && variant.title !== 'Default Title' ? ` · ${variant.title}` : '';
    return `<form method="post" action="${esc((theme.routes && theme.routes.cartAdd) || '/cart/add')}" data-product-form class="ft-add">
      <input type="hidden" name="id" value="${variant.id}"><input type="hidden" name="quantity" value="1">
      <button type="submit" name="add" class="${cls}"><span class="icon icon--18" aria-hidden="true">add</span><span data-label>${esc(price(variant.price))}${esc(label)}</span></button>
    </form>`;
  };
  const compareUrl = (a, b) => (theme.routes && theme.routes.comparePage
    ? `${theme.routes.comparePage}?a=${encodeURIComponent(a)}${b ? `&b=${encodeURIComponent(b)}` : ''}` : null);

  // Nutrition facts table for one fruit (detail sheet).
  const factsTable = (F) => {
    const row = (m) => {
      const v = F[m.key];
      if (v == null) return '';
      const dv = pctDV(m, v);
      return `<tr><th scope="row">${esc(m.label)}</th><td>${fmt(v, m.d)} ${esc(m.unit)}</td><td>${dv == null ? '' : `${dv}%`}</td></tr>`;
    };
    return `<p class="t-label-sm c-muted ft-facts__cap">Per 100 g · % Daily Value</p><table class="ft-facts" aria-label="Nutrition per 100 g">
      <tbody>${MACROS.map(row).join('')}<tr class="ft-facts__sep"><th colspan="3">Vitamins &amp; minerals</th></tr>${MICROS.map(row).join('')}
      ${F.gi != null ? `<tr><th scope="row">Glycemic index</th><td>${F.gi}</td><td>${giBand(F.gi)}</td></tr>` : ''}</tbody>
    </table>`;
  };

  // Highlight badges ("Top 3 for vitamin C") computed across the catalogue.
  const computeHighlights = (fruits) => {
    const withData = fruits.filter((F) => F.hasNutrition);
    const tops = [['vitc', 'Top vitamin C'], ['fiber', 'High fibre'], ['water', 'Most hydrating'], ['potassium', 'Potassium rich'], ['vita', 'Vitamin A rich'], ['fe', 'Iron rich']];
    tops.forEach(([key, label]) => {
      [...withData].filter((F) => F[key] != null).sort((x, y) => y[key] - x[key]).slice(0, 3)
        .forEach((F) => { (F.highlights = F.highlights || []).push(label); });
    });
    [...withData].sort((x, y) => x.kcal - y.kcal).slice(0, 3).forEach((F) => { (F.highlights = F.highlights || []).push('Lowest calories'); });
  };

  /* ---------- Compare ---------- */
  const winner = (m, A, B) => {
    if (!m.better) return null;
    const va = A[m.key]; const vb = B[m.key];
    if (va == null || vb == null) return null;
    const diff = Math.abs(va - vb); const hi = Math.max(va, vb);
    if (hi === 0 || diff / hi < 0.1) return 'tie';
    const aBetter = m.better === 'high' ? va > vb : va < vb;
    return aBetter ? 'a' : 'b';
  };
  const reasonFor = (m, W, L) => {
    const w = W[m.key]; const l = L[m.key];
    if (m.key === 'kcal') return `Fewer calories (${fmt(w, 0)} vs ${fmt(l, 0)} kcal)`;
    if (m.key === 'sugar') return `Less natural sugar (${fmt(w)} vs ${fmt(l)} g)`;
    if (m.key === 'water') return `More hydrating (${fmt(w, 0)}% water)`;
    const x = l > 0 ? w / l : null;
    const name = m.label.replace(' (B9)', '').replace(/^Dietary f/, 'f').replace(/^([A-Z])(?=[a-z])/, (c) => c.toLowerCase());
    if (x && x >= 2) return `${x >= 10 ? Math.round(x) : fmt(x, 1)}× more ${name}`;
    return `More ${name} (${fmt(w, m.d)} vs ${fmt(l, m.d)} ${m.unit})`;
  };

  const initCompare = (root, fruits) => {
    const list = fruits.filter((f) => f.hasNutrition).sort((x, y) => x.name.localeCompare(y.name));
    const result = root.querySelector('[data-cmp-result]');
    if (list.length < 2) { result.innerHTML = '<p class="t-body c-muted">Fruit data is being added — please check back soon.</p>'; return; }
    const byHandle = Object.fromEntries(list.map((f) => [f.handle, f]));
    const selA = root.querySelector('[data-cmp-select="a"]');
    const selB = root.querySelector('[data-cmp-select="b"]');
    const options = list.map((f) => `<option value="${esc(f.handle)}">${esc(f.name)}</option>`).join('');
    selA.innerHTML = options; selB.innerHTML = options;

    const params = new URLSearchParams(window.location.search);
    let a = params.get('a'); let b = params.get('b');
    if (!byHandle[a]) a = byHandle[root.dataset.defaultA] ? root.dataset.defaultA : list[0].handle;
    if (!byHandle[b] || b === a) b = byHandle[root.dataset.defaultB] && root.dataset.defaultB !== a ? root.dataset.defaultB : list.find((f) => f.handle !== a).handle;

    const popular = [['apple', 'banana'], ['guava', 'apple'], ['orange', 'sweet-lime'], ['watermelon', 'muskmelon'], ['kiwi', 'orange'], ['papaya', 'pineapple']].filter(([x, y]) => byHandle[x] && byHandle[y]);
    const popWrap = root.querySelector('[data-cmp-popular]');
    if (popWrap && popular.length) {
      popWrap.hidden = false;
      popWrap.querySelector('[data-cmp-popular-list]').innerHTML = popular
        .map(([x, y]) => `<li><button type="button" class="quick-pill quick-pill--neutral" data-pair="${x},${y}">${esc(byHandle[x].name)} vs ${esc(byHandle[y].name)}</button></li>`).join('');
    }

    const render = () => {
      selA.value = a; selB.value = b;
      [...selA.options].forEach((o) => { o.disabled = o.value === b; });
      [...selB.options].forEach((o) => { o.disabled = o.value === a; });
      const A = byHandle[a]; const B = byHandle[b];
      const url = new URL(window.location.href);
      url.searchParams.set('a', a); url.searchParams.set('b', b);
      window.history.replaceState(window.history.state, '', url);

      const wins = { a: [], b: [] };
      const rowsFor = (metrics) => metrics.map((m) => {
        const va = A[m.key]; const vb = B[m.key];
        if (va == null && vb == null) return '';
        const w = winner(m, A, B);
        if (w === 'a') wins.a.push(reasonFor(m, A, B));
        if (w === 'b') wins.b.push(reasonFor(m, B, A));
        const max = Math.max(va || 0, vb || 0) || 1;
        const icon = '<span class="icon icon--16" role="img" aria-label="better">check_circle</span>';
        const cell = (v, side) => {
          const dv = pctDV(m, v);
          const isWin = w === side;
          return `<div class="cmp-cell cmp-cell--${side}${isWin ? ' is-win' : ''}">
            <span class="cmp-val">${isWin && side === 'a' ? icon : ''}<span>${v == null ? '—' : `${fmt(v, m.d)}<small> ${esc(m.unit)}</small>`}</span>${isWin && side === 'b' ? icon : ''}</span>
            <span class="cmp-bar" aria-hidden="true"><span style="width:${v == null ? 0 : Math.max(3, (v / max) * 100)}%"></span></span>
            ${dv != null ? `<span class="cmp-dv">${dv}% DV</span>` : ''}
          </div>`;
        };
        return `<div class="cmp-row" role="row">${cell(va, 'a')}<div class="cmp-label" role="rowheader"><span class="t-label">${esc(m.label)}</span>${m.hint ? `<span class="t-body-sm c-muted">${esc(m.hint)}</span>` : ''}</div>${cell(vb, 'b')}</div>`;
      }).join('');
      const macroRows = rowsFor(MACROS);
      const microRows = rowsFor(MICROS);

      const head = (F) => `<div class="cmp-fruit">
          <span class="cmp-fruit__img">${thumb(F, 96)}</span>
          <h2 class="t-headline c-primary">${esc(F.name)}</h2>
          ${F.taste ? `<p class="t-body-sm c-muted">${esc(F.taste)}</p>` : ''}
          ${F.inSeason ? '<span class="badge badge--mint">In season now</span>' : ''}
        </div>`;
      const textRow = (label, x, y) => (x || y ? `<div class="cmp-row cmp-row--text" role="row">
          <div class="cmp-cell cmp-cell--a"><span class="t-body">${esc(x || '—')}</span></div>
          <div class="cmp-label" role="rowheader"><span class="t-label">${esc(label)}</span></div>
          <div class="cmp-cell cmp-cell--b"><span class="t-body">${esc(y || '—')}</span></div></div>` : '');
      const season = (F) => (F.months.length ? F.months.join(', ') : (F.season || 'Most of the year'));
      const gi = (F) => (F.gi == null ? 'Not established' : `${F.gi} (${giBand(F.gi)})`);
      const verdictCol = (F, items) => `<div class="cmp-verdict__col">
          <p class="t-label-lg">Pick ${esc(F.name)} for</p>
          ${items.length ? `<ul role="list">${items.map((x) => `<li><span class="icon icon--16" aria-hidden="true">check</span>${esc(x)}</li>`).join('')}</ul>` : '<p class="t-body-sm cmp-verdict__none">Very close on nutrition — choose by taste.</p>'}
        </div>`;
      const sources = [A, B].filter((F) => F.source).map((F) => `${esc(F.name)}: ${esc(F.source)}`).join(' · ');

      result.innerHTML = `
        <div class="cmp-heads">${head(A)}<span class="cmp-vs t-label-sm" aria-hidden="true">VS</span>${head(B)}</div>
        <section class="panel cmp-table" role="table" aria-label="Nutrition facts per 100 g">
          <h2 class="cmp-table__title t-title-lg c-primary"><span class="icon icon--20" aria-hidden="true">nutrition</span> Nutrition facts <span class="t-label-sm c-muted">per 100 g</span></h2>
          ${macroRows}
        </section>
        <section class="panel cmp-table" role="table" aria-label="Vitamins and minerals per 100 g">
          <h2 class="cmp-table__title t-title-lg c-primary"><span class="icon icon--20" aria-hidden="true">eco</span> Vitamins &amp; minerals <span class="t-label-sm c-muted">per 100 g · % Daily Value</span></h2>
          ${microRows}
        </section>
        <section class="panel cmp-extra">
          <h2 class="cmp-table__title t-title-lg c-primary"><span class="icon icon--20" aria-hidden="true">lightbulb</span> Good to know</h2>
          <div class="cmp-verdict">${verdictCol(A, wins.a)}${verdictCol(B, wins.b)}</div>
          <div class="cmp-table cmp-table--flat">
            ${textRow('Glycemic index', gi(A), gi(B))}
            ${textRow('Best months', season(A), season(B))}
            ${textRow('Taste', A.taste, B.taste)}
            ${textRow('How to store', A.store, B.store)}
          </div>
          <div class="cmp-shop">
            <div>${addForm(A, 'btn btn--outline btn--block')}</div>
            <div>${addForm(B, 'btn btn--outline btn--block')}</div>
          </div>
        </section>
        <p class="t-body-sm c-muted">GI (glycemic index) shows how fast a food’s carbs raise blood sugar: 55 or less is low, 70+ is high. % DV = share of an adult’s daily value (FDA reference, 2,000 kcal diet).</p>
        ${sources ? `<p class="t-body-sm c-muted">Sources — ${sources}. GI: International GI Tables 2008 (Atkinson et al., Diabetes Care).</p>` : ''}`;
    };

    root.addEventListener('change', (e) => {
      const which = e.target.dataset && e.target.dataset.cmpSelect;
      if (!which) return;
      if (which === 'a') a = e.target.value; else b = e.target.value;
      render();
    });
    root.addEventListener('click', (e) => {
      if (e.target.closest('[data-cmp-swap]')) { [a, b] = [b, a]; render(); return; }
      const pair = e.target.closest('[data-pair]');
      if (pair) { [a, b] = pair.dataset.pair.split(','); render(); result.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
    render();
  };

  /* ---------- Fruit card + detail sheet ---------- */
  const card = (F, extra = '') => {
    const stats = F.hasNutrition ? `<dl class="ft-card__stats">
        <div><dt>Energy</dt><dd>${fmt(F.kcal, 0)}<small> kcal</small></dd></div>
        <div><dt>Fibre</dt><dd>${fmt(F.fiber)}<small> g</small></dd></div>
        <div><dt>Vit C</dt><dd>${fmt(F.vitc, 0)}<small> mg</small></dd></div>
      </dl>` : '<p class="t-body-sm c-muted">Nutrition values coming soon.</p>';
    const hl = (F.highlights || []).slice(0, 2).map((h) => `<span class="badge badge--soft">${esc(h)}</span>`).join('');
    const cmp = F.hasNutrition ? compareUrl(F.handle) : null;
    return `<article class="ft-card panel">
      <button type="button" class="ft-card__top" data-fruit-open="${esc(F.handle)}" aria-haspopup="dialog">
        <span class="ft-card__img">${thumb(F)}</span>
        <span class="ft-card__id">
          <span class="t-title c-primary">${esc(F.name)}</span>
          ${F.taste ? `<span class="t-body-sm c-muted">${esc(F.taste)}</span>` : ''}
          <span class="ft-card__badges">${F.inSeason ? '<span class="badge badge--mint">In season</span>' : ''}${hl}</span>
        </span>
        <span class="icon icon--20 c-muted" aria-hidden="true">chevron_right</span>
      </button>
      ${extra}
      ${stats}
      <div class="ft-card__actions">
        ${addForm(F, 'btn btn--primary')}
        ${cmp ? `<a class="btn btn--outline" href="${esc(cmp)}"><span class="icon icon--18" aria-hidden="true">compare_arrows</span>Compare</a>` : ''}
      </div>
    </article>`;
  };

  const sheetFor = (fruits) => {
    let sheet = document.querySelector('[data-fruit-sheet]');
    if (!sheet) {
      sheet = document.createElement('dialog');
      sheet.className = 'drawer drawer--sheet ft-sheet';
      sheet.setAttribute('data-fruit-sheet', '');
      sheet.setAttribute('aria-labelledby', 'FruitSheetTitle');
      document.body.appendChild(sheet);
      sheet.addEventListener('click', (e) => {
        if (e.target === sheet || e.target.closest('[data-sheet-close]')) sheet.close();
      });
    }
    const byHandle = Object.fromEntries(fruits.map((f) => [f.handle, f]));
    return (handle, opener) => {
      const F = byHandle[handle];
      if (!F) return;
      const tip = (icon, label, text) => (text ? `<div class="ft-tip"><span class="icon icon--20" aria-hidden="true">${icon}</span><div><p class="t-label-lg c-primary">${label}</p><p class="t-body">${esc(text)}</p></div></div>` : '');
      const cmp = F.hasNutrition ? compareUrl(F.handle) : null;
      sheet.innerHTML = `<div class="drawer__panel">
        <div class="drawer__head"><h2 id="FruitSheetTitle" class="drawer__title t-title-lg">${esc(F.name)}</h2>
          <button type="button" class="icon-btn" data-sheet-close aria-label="Close"><span class="icon" aria-hidden="true">close</span></button></div>
        <div class="drawer__body">
          <div class="ft-sheet__hero"><span class="ft-sheet__img">${thumb(F, 120)}</span>
            <div class="ft-sheet__meta">
              ${F.taste ? `<p class="t-body"><strong>Taste:</strong> ${esc(F.taste)}</p>` : ''}
              ${F.texture ? `<p class="t-body"><strong>Texture:</strong> ${esc(F.texture)}</p>` : ''}
              <p class="t-body"><strong>Season:</strong> ${esc(F.months.length ? F.months.join(', ') : (F.season || 'Most of the year'))}</p>
              ${F.origin ? `<p class="t-body"><strong>Grown in:</strong> ${esc(F.origin)}</p>` : ''}
              ${(F.highlights || []).length ? `<p class="ft-card__badges">${F.highlights.map((h) => `<span class="badge badge--soft">${esc(h)}</span>`).join('')}</p>` : ''}
            </div></div>
          ${F.hasNutrition ? factsTable(F) : '<p class="t-body c-muted">Lab nutrition values for this fruit aren’t published by USDA or IFCT yet.</p>'}
          ${tip('verified', 'How to choose', F.select)}
          ${tip('kitchen', 'How to store', F.store)}
          ${tip('schedule', 'How to ripen', F.ripen)}
          ${tip('restaurant', 'How to eat', F.eat)}
          ${F.source ? `<p class="t-body-sm c-muted">Source: ${esc(F.source)}</p>` : ''}
        </div>
        <div class="drawer__foot ft-sheet__foot">${addForm(F, 'btn btn--primary btn--lg btn--block')}
          ${cmp ? `<a class="btn btn--outline btn--block" href="${esc(cmp)}"><span class="icon icon--18" aria-hidden="true">compare_arrows</span>Compare with another fruit</a>` : ''}
          ${F.url ? `<a class="drawer__view t-label" href="${esc(F.url)}">View product page</a>` : ''}</div>
      </div>`;
      sheet._opener = opener;
      if (!sheet.open) sheet.showModal();
    };
  };
  document.addEventListener('close', (e) => {
    if (e.target.matches && e.target.matches('[data-fruit-sheet]') && e.target._opener && e.target._opener.isConnected) e.target._opener.focus({ preventScroll: true });
  }, true);

  /* ---------- Fruit guide / engine (natural-language search) ---------- */
  const INTENTS = [
    { re: /vit(amin)?\s*c|immun/, label: 'richest in vitamin C', key: 'vitc', dir: -1, min: 20 },
    { re: /vit(amin)?\s*a|eye/, label: 'richest in vitamin A', key: 'vita', dir: -1, min: 10 },
    { re: /vit(amin)?\s*k/, label: 'richest in vitamin K', key: 'vitk', dir: -1, min: 5 },
    { re: /folate|folic|b9/, label: 'richest in folate', key: 'folate', dir: -1, min: 15 },
    { re: /\bb6\b/, label: 'richest in vitamin B6', key: 'b6', dir: -1, min: 0.08 },
    { re: /fib(re|er)|digest|full/, label: 'highest in fibre', key: 'fiber', dir: -1, min: 2.5 },
    { re: /potassium/, label: 'richest in potassium', key: 'potassium', dir: -1, min: 200 },
    { re: /iron/, label: 'richest in iron', key: 'fe', dir: -1, min: 0.25 },
    { re: /calcium/, label: 'richest in calcium', key: 'ca', dir: -1, min: 15 },
    { re: /magnes/, label: 'richest in magnesium', key: 'mg', dir: -1, min: 12 },
    { re: /protein/, label: 'highest in protein', key: 'protein', dir: -1, min: 0.8 },
    { re: /hydrat|water|summer|thirst/, label: 'most hydrating', key: 'water', dir: -1, min: 85 },
    { re: /low\s*sugar|less\s*sugar|diabet/, label: 'lowest in natural sugar', key: 'sugar', dir: 1, max: 9 },
    { re: /low\s*cal|light|weight|diet/, label: 'lowest in calories', key: 'kcal', dir: 1, max: 55 },
    { re: /energy|gym|workout|sport/, label: 'with the most natural energy', key: 'kcal', dir: -1, min: 60 },
    { re: /low\s*gi|glycemic/, label: 'with a low glycemic index (published values only)', key: 'gi', dir: 1, max: 55 },
  ];
  const TASTE = [
    { re: /sweet/, label: 'sweet', test: (F) => /sweet|honey|caramel|rich/i.test(F.taste || '') },
    { re: /tang|sour|tart|citrus/, label: 'tangy', test: (F) => /tang|tart|sour|citrus/i.test(F.taste || '') },
    { re: /cream|smooth/, label: 'creamy', test: (F) => /cream|butter|custard|smooth/i.test(`${F.taste || ''} ${F.texture || ''}`) },
  ];
  const runQuery = (fruits, q) => {
    const text = q.toLowerCase().trim();
    if (!text) return { list: [...fruits].sort((x, y) => x.name.localeCompare(y.name)), note: '' };
    const intent = INTENTS.find((i) => i.re.test(text));
    const taste = TASTE.find((t) => t.re.test(text));
    const season = /season|now|fresh today/.test(text) || MONTHS.some((m) => text.includes(m.toLowerCase()));
    const month = MONTHS.find((m) => text.includes(m.toLowerCase())) || nowMonth;
    let list = [...fruits];
    const notes = [];
    if (intent) {
      list = list.filter((F) => F[intent.key] != null && (intent.min == null || F[intent.key] >= intent.min) && (intent.max == null || F[intent.key] <= intent.max));
      list.sort((x, y) => intent.dir * (x[intent.key] - y[intent.key]));
      notes.push(`fruits ${intent.label}`);
    }
    if (taste) { list = list.filter(taste.test); notes.push(`that taste ${taste.label}`); }
    if (season) { list = list.filter((F) => F.months.includes(month)); notes.push(`in season in ${month}`); }
    if (!intent && !taste && !season) {
      list = list.filter((F) => `${F.name} ${F.taste || ''} ${F.texture || ''} ${F.origin || ''}`.toLowerCase().includes(text));
      list.sort((x, y) => x.name.localeCompare(y.name));
    }
    return { list, note: notes.length ? `Showing ${notes.join(', ')}` : '' };
  };

  const initGuide = (root, fruits) => {
    const listEl = root.querySelector('[data-guide-list]');
    const countEl = root.querySelector('[data-guide-count]');
    const input = root.querySelector('[data-guide-search]');
    const openSheet = sheetFor(fruits);
    const render = () => {
      const { list, note } = runQuery(fruits, input.value || '');
      listEl.innerHTML = list.map((F) => `<li>${card(F)}</li>`).join('')
        || '<li class="ft-empty t-body c-muted">No fruit matches that — try “vitamin C”, “low sugar”, “iron” or a fruit name.</li>';
      countEl.textContent = `${note ? `${note} · ` : ''}${list.length} fruit${list.length === 1 ? '' : 's'}`;
      root.querySelectorAll('[data-query]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.query === (input.value || '').trim())));
    };
    const initial = new URLSearchParams(window.location.search).get('q');
    if (initial) input.value = initial;
    input.addEventListener('input', render);
    root.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-query]');
      if (chip) { input.value = chip.dataset.query; render(); return; }
      const open = e.target.closest('[data-fruit-open]');
      if (open) openSheet(open.dataset.fruitOpen, open);
    });
    render();
  };

  /* ---------- Season calendar ---------- */
  const initSeason = (root, fruits) => {
    const monthsEl = root.querySelector('[data-season-months]');
    const listEl = root.querySelector('[data-season-list]');
    const titleEl = root.querySelector('[data-season-title]');
    const allEl = root.querySelector('[data-season-all]');
    const openSheet = sheetFor(fruits);
    let month = nowMonth;
    monthsEl.innerHTML = MONTHS.map((m) => `<button type="button" class="quick-pill quick-pill--neutral" data-month="${m}" aria-pressed="${m === month}">${m}${m === nowMonth ? ' · now' : ''}</button>`).join('');
    const render = () => {
      monthsEl.querySelectorAll('[data-month]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.month === month)));
      const shown = fruits.filter((F) => F.months.includes(month));
      titleEl.textContent = `Best in ${month}`;
      listEl.innerHTML = shown.map((F) => `<li>${card(F)}</li>`).join('')
        || '<li class="ft-empty t-body c-muted">No short-season fruit peaks this month — the year-round fruits below are all fresh.</li>';
    };
    allEl.innerHTML = fruits.filter((F) => !F.months.length).sort((x, y) => x.name.localeCompare(y.name))
      .map((F) => `<li><button type="button" class="ft-mini" data-fruit-open="${esc(F.handle)}"><span class="ft-mini__img">${thumb(F, 40)}</span><span class="t-label-lg">${esc(F.name)}</span></button></li>`).join('');
    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-month]');
      if (b) { month = b.dataset.month; render(); return; }
      const open = e.target.closest('[data-fruit-open]');
      if (open) openSheet(open.dataset.fruitOpen, open);
    });
    render();
    const current = monthsEl.querySelector(`[data-month="${month}"]`);
    if (current) current.scrollIntoView({ block: 'nearest', inline: 'center' });
  };

  /* ---------- Fruit finder ---------- */
  const GOALS = {
    vitc: { score: (F) => F.vitc, why: (F) => `${fmt(F.vitc, 0)} mg vitamin C per 100 g` },
    fiber: { score: (F) => F.fiber, why: (F) => `${fmt(F.fiber)} g fibre per 100 g` },
    water: { score: (F) => F.water, why: (F) => `${fmt(F.water, 0)}% water` },
    light: { score: (F) => (F.kcal == null ? null : -F.kcal), why: (F) => `only ${fmt(F.kcal, 0)} kcal per 100 g` },
    lowsugar: { score: (F) => (F.sugar == null ? null : -F.sugar), why: (F) => `${fmt(F.sugar)} g natural sugar per 100 g` },
    energy: { score: (F) => F.kcal, why: (F) => `${fmt(F.kcal, 0)} kcal of natural energy per 100 g` },
  };
  const TASTES = {
    any: () => true,
    sweet: (F) => /sweet|honey|caramel|rich/i.test(F.taste || '') && !/tart|sour|tang/i.test(F.taste || ''),
    tangy: (F) => /tang|tart|sour|citrus/i.test(F.taste || ''),
    creamy: (F) => /cream|butter|custard|smooth/i.test(`${F.taste || ''} ${F.texture || ''}`),
  };
  const initFinder = (root, fruits) => {
    const form = root.querySelector('[data-finder-form]');
    const listEl = root.querySelector('[data-finder-list]');
    const titleEl = root.querySelector('[data-finder-title]');
    const openSheet = sheetFor(fruits);
    const render = () => {
      const data = new FormData(form);
      const goal = GOALS[data.get('goal')] || GOALS.vitc;
      const taste = TASTES[data.get('taste')] || TASTES.any;
      let pool = fruits.filter((F) => F.hasNutrition && F.buy && goal.score(F) != null);
      if (data.get('season') === '1') pool = pool.filter((F) => F.inSeason || !F.months.length);
      let picks = pool.filter(taste);
      const relaxed = picks.length === 0;
      if (relaxed) picks = pool;
      picks = picks.sort((x, y) => goal.score(y) - goal.score(x)).slice(0, 3);
      titleEl.textContent = relaxed ? 'No exact taste match — here are the best for your goal' : 'Your top picks';
      listEl.innerHTML = picks.map((F, i) => `<li>${card(F, `<p class="ft-why"><span class="badge badge--amber">#${i + 1}</span> ${esc(goal.why(F))}</p>`)}</li>`).join('')
        || '<li class="ft-empty t-body c-muted">Nothing matches right now — try another option.</li>';
    };
    form.addEventListener('change', render);
    form.addEventListener('submit', (e) => e.preventDefault());
    root.addEventListener('click', (e) => {
      const open = e.target.closest('[data-fruit-open]');
      if (open) openSheet(open.dataset.fruitOpen, open);
    });
    render();
  };

  /* ---------- Share ---------- */
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-share]');
    if (!btn) return;
    try {
      if (navigator.share) await navigator.share({ title: document.title, url: window.location.href });
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        const label = btn.querySelector('[data-share-label]');
        const prev = label.textContent;
        label.textContent = 'Link copied';
        window.setTimeout(() => { label.textContent = prev; }, 1600);
      }
    } catch (err) { /* cancelled */ }
  });

  const init = () => {
    const fruits = load();
    computeHighlights(fruits);
    const run = (sel, fn) => document.querySelectorAll(`${sel}:not([data-ready])`).forEach((root) => { root.dataset.ready = ''; fn(root, fruits); });
    run('[data-fruit-compare]', initCompare);
    run('[data-fruit-guide]', initGuide);
    run('[data-fruit-season]', initSeason);
    run('[data-fruit-finder]', initFinder);
    document.querySelectorAll('[data-share][hidden]').forEach((b) => { if (navigator.share || navigator.clipboard) b.hidden = false; });
  };
  init();
  document.addEventListener('shopify:section:load', init);
})();
