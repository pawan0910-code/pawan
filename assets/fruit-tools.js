/* Baroda Fresh — fruit tools: compare, guide, season calendar, fruit finder.
   Data comes from <script data-fruit-data> (snippets/fruit-data.liquid), built from the
   Fruit Guide metaobjects. Values are per 100 g edible portion. */
(() => {
  if (window.__fruitToolsInit) return;
  window.__fruitToolsInit = true;

  const theme = window.theme || {};
  const S = (theme.strings && theme.strings.fruit) || {};
  const t = (key, fallback, vars = {}) =>
    String(S[key] || fallback).replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : ''));
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const nowMonth = MONTHS[new Date().getMonth()];

  const price = (cents) => (typeof theme.formatPrice === 'function'
    ? theme.formatPrice(cents)
    : `₹${(cents / 100).toFixed(0)}`);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : null; };
  const fmt = (n, d = 1) => (n == null ? '—' : (Math.round(n * 10 ** d) / 10 ** d).toString());

  /* ---------- data ---------- */
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
    return raw.map((f) => {
      const fruit = { ...f };
      ['kcal', 'sugar', 'fiber', 'protein', 'vitc', 'potassium', 'water', 'gi'].forEach((k) => { fruit[k] = num(f[k]); });
      fruit.months = Array.isArray(f.months) ? f.months : [];
      fruit.inSeason = fruit.months.includes(nowMonth);
      // Cheapest buyable option + price per 100 g where the pack weight is stated.
      let buy = null;
      let ppg = null;
      (f.products || []).forEach((p) => {
        (p.variants || []).forEach((v) => {
          if (!v.available || !p.available) return;
          const grams = gramsOf(v.title);
          const per100 = grams ? (v.price / grams) * 100 : null;
          if (!buy || v.price < buy.variant.price) buy = { product: p, variant: v };
          if (per100 != null && (ppg == null || per100 < ppg)) ppg = per100;
        });
      });
      fruit.buy = buy;
      fruit.ppg = ppg;
      fruit.url = buy ? buy.product.url : ((f.products || [])[0] || {}).url || null;
      fruit.hasNutrition = fruit.kcal != null;
      return fruit;
    });
  };

  const giBand = (gi) => (gi == null ? null : gi <= 55 ? t('giLow', 'Low') : gi <= 69 ? t('giMedium', 'Medium') : t('giHigh', 'High'));

  const addForm = (fruit, cls = 'btn btn--primary') => {
    if (!fruit.buy) {
      return fruit.url
        ? `<a class="btn btn--outline" href="${esc(fruit.url)}">${esc(t('view', 'View'))}</a>`
        : `<span class="t-body-sm c-muted">${esc(t('unavailable', 'Currently unavailable'))}</span>`;
    }
    const { variant } = fruit.buy;
    const label = variant.title && variant.title !== 'Default Title' ? ` · ${variant.title}` : '';
    return `<form method="post" action="${esc((theme.routes && theme.routes.cartAdd) || '/cart/add')}" data-product-form class="ft-add">
      <input type="hidden" name="id" value="${variant.id}"><input type="hidden" name="quantity" value="1">
      <button type="submit" name="add" class="${cls}"><span class="icon icon--18" aria-hidden="true">add</span><span data-label>${esc(price(variant.price))}${esc(label)}</span></button>
    </form>`;
  };

  const thumb = (fruit, size = 64) => (fruit.img
    ? `<img src="${esc(fruit.img)}" alt="" width="${size}" height="${size}" loading="lazy">`
    : `<span class="icon" aria-hidden="true">nutrition</span>`);

  /* ---------- Compare ---------- */
  const METRICS = [
    { key: 'kcal', label: () => t('mKcal', 'Calories'), unit: 'kcal', better: 'low', d: 0 },
    { key: 'sugar', label: () => t('mSugar', 'Natural sugar'), unit: 'g', better: 'low' },
    { key: 'fiber', label: () => t('mFiber', 'Fibre'), unit: 'g', better: 'high' },
    { key: 'vitc', label: () => t('mVitc', 'Vitamin C'), unit: 'mg', better: 'high', d: 0 },
    { key: 'potassium', label: () => t('mPotassium', 'Potassium'), unit: 'mg', better: 'high', d: 0 },
    { key: 'protein', label: () => t('mProtein', 'Protein'), unit: 'g', better: 'high' },
    { key: 'water', label: () => t('mWater', 'Water'), unit: '%', better: 'high', d: 0 },
    { key: 'gi', label: () => t('mGi', 'Glycemic index'), unit: '', better: 'low', d: 0 },
    { key: 'ppg', label: () => t('mPrice', 'Price per 100 g'), unit: '', better: 'low', money: true },
  ];

  // A difference only "wins" if it is meaningful (≥ 10% and above a small floor).
  const winner = (m, a, b) => {
    const va = a[m.key]; const vb = b[m.key];
    if (va == null || vb == null) return null;
    const floor = { kcal: 5, sugar: 1, fiber: 0.5, vitc: 3, potassium: 20, protein: 0.5, water: 2, gi: 5, ppg: 100 }[m.key] || 0;
    const diff = Math.abs(va - vb);
    if (diff < floor || diff / Math.max(va, vb) < 0.1) return 'tie';
    const aBetter = m.better === 'high' ? va > vb : va < vb;
    return aBetter ? 'a' : 'b';
  };

  const reason = (key, w, l) => {
    const r = (x, y) => (y > 0 ? x / y : null);
    switch (key) {
      case 'kcal': return t('rKcal', 'Fewer calories ({a} vs {b} kcal)', { a: fmt(w.kcal, 0), b: fmt(l.kcal, 0) });
      case 'sugar': return t('rSugar', 'Less natural sugar ({a} g vs {b} g)', { a: fmt(w.sugar), b: fmt(l.sugar) });
      case 'fiber': return t('rFiber', 'More fibre — keeps you fuller ({a} g vs {b} g)', { a: fmt(w.fiber), b: fmt(l.fiber) });
      case 'vitc': {
        const x = r(w.vitc, l.vitc);
        return x && x >= 2
          ? t('rVitcX', '{x}× more vitamin C', { x: x >= 10 ? Math.round(x) : fmt(x, 1) })
          : t('rVitc', 'More vitamin C ({a} vs {b} mg)', { a: fmt(w.vitc, 0), b: fmt(l.vitc, 0) });
      }
      case 'potassium': return t('rPotassium', 'More potassium ({a} vs {b} mg)', { a: fmt(w.potassium, 0), b: fmt(l.potassium, 0) });
      case 'protein': return t('rProtein', 'A little more protein');
      case 'water': return t('rWater', 'More hydrating ({a}% water)', { a: fmt(w.water, 0) });
      case 'gi': return t('rGi', 'Lower glycemic index — slower sugar rise');
      case 'ppg': return t('rPrice', 'Better value per 100 g ({a})', { a: price(Math.round(w.ppg)) });
      default: return '';
    }
  };

  const initCompare = (root, fruits) => {
    const list = fruits.filter((f) => f.hasNutrition).sort((x, y) => x.name.localeCompare(y.name));
    if (list.length < 2) {
      root.querySelector('[data-cmp-result]').innerHTML = `<p class="t-body c-muted">${esc(t('noData', 'Fruit data is being added — please check back soon.'))}</p>`;
      return;
    }
    const byHandle = Object.fromEntries(list.map((f) => [f.handle, f]));
    const selA = root.querySelector('[data-cmp-select="a"]');
    const selB = root.querySelector('[data-cmp-select="b"]');
    const result = root.querySelector('[data-cmp-result]');
    const options = list.map((f) => `<option value="${esc(f.handle)}">${esc(f.name)}</option>`).join('');
    selA.innerHTML = options;
    selB.innerHTML = options;

    const params = new URLSearchParams(window.location.search);
    let a = params.get('a'); let b = params.get('b');
    if (!byHandle[a]) a = byHandle[root.dataset.defaultA] ? root.dataset.defaultA : list[0].handle;
    if (!byHandle[b] || b === a) {
      b = byHandle[root.dataset.defaultB] && root.dataset.defaultB !== a ? root.dataset.defaultB : list.find((f) => f.handle !== a).handle;
    }

    // Popular pairs (only those we actually have data for).
    const popular = [['apple', 'banana'], ['guava', 'apple'], ['orange', 'sweet-lime'], ['watermelon', 'muskmelon'], ['kiwi', 'orange'], ['papaya', 'pineapple']]
      .filter(([x, y]) => byHandle[x] && byHandle[y]);
    const popWrap = root.querySelector('[data-cmp-popular]');
    if (popular.length && popWrap) {
      popWrap.hidden = false;
      popWrap.querySelector('[data-cmp-popular-list]').innerHTML = popular
        .map(([x, y]) => `<li><button type="button" class="quick-pill quick-pill--neutral" data-pair="${x},${y}">${esc(byHandle[x].name)} vs ${esc(byHandle[y].name)}</button></li>`).join('');
    }

    const render = () => {
      selA.value = a; selB.value = b;
      // The same fruit can't be chosen on both sides.
      [...selA.options].forEach((o) => { o.disabled = o.value === b; });
      [...selB.options].forEach((o) => { o.disabled = o.value === a; });
      const A = byHandle[a]; const B = byHandle[b];
      const url = new URL(window.location.href);
      url.searchParams.set('a', a); url.searchParams.set('b', b);
      window.history.replaceState(window.history.state, '', url);

      const wins = { a: [], b: [] };
      const rows = METRICS.map((m) => {
        const va = A[m.key]; const vb = B[m.key];
        if (va == null && vb == null) return '';
        const w = winner(m, A, B);
        if (w === 'a') wins.a.push(reason(m.key, A, B));
        if (w === 'b') wins.b.push(reason(m.key, B, A));
        const max = Math.max(va || 0, vb || 0) || 1;
        const winIcon = `<span class="icon icon--16" role="img" aria-label="${esc(t('better', 'better'))}">check_circle</span>`;
        const show = (v) => {
          if (v == null) return '—';
          if (m.money) return price(Math.round(v));
          if (m.key === 'gi') return `${fmt(v, 0)} <small>${esc(giBand(v))}</small>`;
          return `${fmt(v, m.d == null ? 1 : m.d)}<small> ${m.unit}</small>`;
        };
        const cell = (v, side) => `<div class="cmp-cell cmp-cell--${side}${w === side ? ' is-win' : ''}">
            <span class="cmp-val">${w === side && side === 'a' ? `${winIcon} ` : ''}<span>${show(v)}</span>${w === side && side === 'b' ? ` ${winIcon}` : ''}</span>
            <span class="cmp-bar" aria-hidden="true"><span style="width:${v == null ? 0 : Math.max(4, (v / max) * 100)}%"></span></span>
          </div>`;
        const hint = m.better === 'low' ? t('lowerBetter', 'lower is lighter') : t('higherBetter', 'higher is better');
        return `<div class="cmp-row" role="row">
          ${cell(va, 'a')}
          <div class="cmp-label" role="rowheader"><span class="t-label">${esc(m.label())}</span><span class="t-body-sm c-muted">${esc(m.key === 'ppg' ? t('cheaperBetter', 'lower is cheaper') : hint)}</span></div>
          ${cell(vb, 'b')}
        </div>`;
      }).join('');

      const head = (F) => `<div class="cmp-fruit">
          <span class="cmp-fruit__img">${thumb(F, 96)}</span>
          <h2 class="t-headline c-primary">${esc(F.name)}</h2>
          ${F.taste ? `<p class="t-body-sm c-muted">${esc(F.taste)}</p>` : ''}
          ${F.inSeason ? `<span class="badge badge--mint">${esc(t('inSeason', 'In season now'))}</span>` : ''}
          ${addForm(F, 'btn btn--primary btn--block')}
          ${F.url ? `<a class="cmp-fruit__link t-label" href="${esc(F.url)}">${esc(t('details', 'Details'))}</a>` : ''}
        </div>`;

      const verdict = (F, list2) => `<div class="cmp-verdict__col">
          <p class="t-label-lg c-primary">${esc(t('pickFor', 'Pick {name} for', { name: F.name }))}</p>
          ${list2.length
            ? `<ul role="list">${list2.map((x) => `<li><span class="icon icon--16" aria-hidden="true">check</span>${esc(x)}</li>`).join('')}</ul>`
            : `<p class="t-body-sm c-muted">${esc(t('noWins', 'Taste and texture — the numbers are close.'))}</p>`}
        </div>`;

      const text = (label, x, y) => (x || y ? `<div class="cmp-row cmp-row--text" role="row">
          <div class="cmp-cell cmp-cell--a"><span class="t-body">${esc(x || '—')}</span></div>
          <div class="cmp-label" role="rowheader"><span class="t-label">${esc(label)}</span></div>
          <div class="cmp-cell cmp-cell--b"><span class="t-body">${esc(y || '—')}</span></div>
        </div>` : '');
      const season = (F) => (F.months.length ? F.months.join(', ') : (F.season || t('yearRound', 'Most of the year')));

      const giNote = (A.gi != null || B.gi != null)
        ? `<p class="t-body-sm c-muted">${esc(t('giNote', 'Glycemic index (GI) shows how fast a food’s carbs raise blood sugar: 55 or less is low, 70+ is high. A high-GI fruit can still have little sugar per serving.'))}</p>` : '';
      const sources = [A, B].filter((F) => F.source).map((F) => `${esc(F.name)}: ${esc(F.source)}`).join(' · ');

      result.innerHTML = `
        <div class="cmp-heads">${head(A)}<span class="cmp-vs t-label-sm" aria-hidden="true">VS</span>${head(B)}</div>
        <div class="panel cmp-verdict">
          <h2 class="t-title-lg c-primary"><span class="icon icon--20" aria-hidden="true">emoji_events</span> ${esc(t('verdict', 'Quick verdict'))}</h2>
          <div class="cmp-verdict__grid">${verdict(A, wins.a)}${verdict(B, wins.b)}</div>
        </div>
        <div class="panel cmp-table" role="table" aria-label="${esc(t('tableLabel', 'Nutrition per 100 g'))}">
          <p class="t-label-sm c-muted cmp-table__per">${esc(t('per100', 'Per 100 g edible portion'))}</p>
          ${rows}
          ${text(t('taste', 'Taste'), A.taste, B.taste)}
          ${text(t('texture', 'Texture'), A.texture, B.texture)}
          ${text(t('bestMonths', 'Best months'), season(A), season(B))}
          ${text(t('store', 'How to store'), A.store, B.store)}
        </div>
        ${giNote}
        ${sources ? `<p class="t-body-sm c-muted">${esc(t('source', 'Source'))}: ${sources}. ${esc(t('giSource', 'GI: International GI Tables 2008.'))}</p>` : ''}`;
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

  /* ---------- Fruit card (guide / season / finder) ---------- */
  const card = (F, extra = '') => {
    const stats = F.hasNutrition ? `<dl class="ft-card__stats">
        <div><dt>${esc(t('mKcal', 'Calories'))}</dt><dd>${fmt(F.kcal, 0)}</dd></div>
        <div><dt>${esc(t('mFiber', 'Fibre'))}</dt><dd>${fmt(F.fiber)} g</dd></div>
        <div><dt>${esc(t('mVitc', 'Vitamin C'))}</dt><dd>${fmt(F.vitc, 0)} mg</dd></div>
      </dl>` : '';
    const tips = (F.select || F.store) ? `<details class="ft-details ft-details--flat">
        <summary class="ft-details__summary"><span class="t-label">${esc(t('tips', 'How to choose & store'))}</span><span class="icon icon--18" aria-hidden="true">expand_more</span></summary>
        <div class="ft-details__body">
          ${F.select ? `<p class="t-body-sm"><strong>${esc(t('choose', 'Choose'))}:</strong> ${esc(F.select)}</p>` : ''}
          ${F.store ? `<p class="t-body-sm"><strong>${esc(t('store', 'How to store'))}:</strong> ${esc(F.store)}</p>` : ''}
        </div>
      </details>` : '';
    const compareUrl = (theme.routes && theme.routes.comparePage) ? `${theme.routes.comparePage}?a=${encodeURIComponent(F.handle)}` : null;
    return `<article class="ft-card panel">
      <div class="ft-card__top">
        <span class="ft-card__img">${thumb(F)}</span>
        <div class="ft-card__id">
          <h3 class="t-title c-primary">${F.url ? `<a href="${esc(F.url)}">${esc(F.name)}</a>` : esc(F.name)}</h3>
          ${F.taste ? `<p class="t-body-sm c-muted">${esc(F.taste)}</p>` : ''}
          ${F.inSeason ? `<span class="badge badge--mint">${esc(t('inSeason', 'In season now'))}</span>` : ''}
        </div>
      </div>
      ${extra}
      ${stats}
      ${F.hasNutrition ? `<p class="t-label-sm c-muted">${esc(t('per100short', 'per 100 g'))}</p>` : ''}
      ${tips}
      <div class="ft-card__actions">
        ${addForm(F, 'btn btn--primary')}
        ${compareUrl && F.hasNutrition ? `<a class="btn btn--outline" href="${esc(compareUrl)}"><span class="icon icon--18" aria-hidden="true">compare_arrows</span>${esc(t('compare', 'Compare'))}</a>` : ''}
      </div>
    </article>`;
  };

  /* ---------- Guide ---------- */
  const FILTERS = {
    all: () => true,
    season: (F) => F.inSeason,
    vitc: (F) => F.vitc != null && F.vitc >= 30,
    fiber: (F) => F.fiber != null && F.fiber >= 3,
    water: (F) => F.water != null && F.water >= 86,
    light: (F) => F.kcal != null && F.kcal <= 50,
  };
  const initGuide = (root, fruits) => {
    const listEl = root.querySelector('[data-guide-list]');
    const countEl = root.querySelector('[data-guide-count]');
    const input = root.querySelector('[data-guide-search]');
    let filter = 'all';
    const sorted = [...fruits].sort((x, y) => x.name.localeCompare(y.name));
    const render = () => {
      const q = (input.value || '').trim().toLowerCase();
      const shown = sorted.filter((F) => FILTERS[filter](F) && (!q || `${F.name} ${F.taste || ''}`.toLowerCase().includes(q)));
      listEl.innerHTML = shown.map((F) => `<li>${card(F)}</li>`).join('')
        || `<li class="t-body c-muted">${esc(t('noMatch', 'No fruit matches — try another word.'))}</li>`;
      countEl.textContent = t('count', '{n} fruits', { n: shown.length });
    };
    input.addEventListener('input', render);
    root.querySelector('[data-guide-filters]').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      filter = btn.dataset.filter;
      root.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      render();
    });
    render();
  };

  /* ---------- Season calendar ---------- */
  const initSeason = (root, fruits) => {
    const monthsEl = root.querySelector('[data-season-months]');
    const listEl = root.querySelector('[data-season-list]');
    const titleEl = root.querySelector('[data-season-title]');
    const allEl = root.querySelector('[data-season-all]');
    let month = nowMonth;
    monthsEl.innerHTML = MONTHS.map((m) => `<button type="button" class="quick-pill quick-pill--neutral" data-month="${m}" aria-pressed="${m === month}">${m}${m === nowMonth ? ` · ${esc(t('now', 'now'))}` : ''}</button>`).join('');
    const render = () => {
      monthsEl.querySelectorAll('[data-month]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.month === month)));
      const shown = fruits.filter((F) => F.months.includes(month));
      titleEl.textContent = t('seasonTitle', 'Best in {m}', { m: month });
      listEl.innerHTML = shown.map((F) => `<li>${card(F)}</li>`).join('')
        || `<li class="t-body c-muted">${esc(t('seasonEmpty', 'No short-season fruit peaks this month — our year-round fruits below are all fresh.'))}</li>`;
    };
    allEl.innerHTML = fruits.filter((F) => !F.months.length).sort((x, y) => x.name.localeCompare(y.name))
      .map((F) => `<li><a class="ft-mini" href="${esc(F.url || '#')}"><span class="ft-mini__img">${thumb(F, 40)}</span><span class="t-label-lg">${esc(F.name)}</span></a></li>`).join('');
    monthsEl.addEventListener('click', (e) => {
      const b = e.target.closest('[data-month]');
      if (b) { month = b.dataset.month; render(); }
    });
    render();
    const current = monthsEl.querySelector(`[data-month="${month}"]`);
    if (current) current.scrollIntoView({ block: 'nearest', inline: 'center' });
  };

  /* ---------- Fruit finder ---------- */
  const GOALS = {
    vitc: { score: (F) => F.vitc, why: (F) => t('whyVitc', '{v} mg vitamin C', { v: fmt(F.vitc, 0) }) },
    fiber: { score: (F) => F.fiber, why: (F) => t('whyFiber', '{v} g fibre', { v: fmt(F.fiber) }) },
    water: { score: (F) => F.water, why: (F) => t('whyWater', '{v}% water', { v: fmt(F.water, 0) }) },
    light: { score: (F) => (F.kcal == null ? null : -F.kcal), why: (F) => t('whyKcal', 'only {v} kcal', { v: fmt(F.kcal, 0) }) },
    lowsugar: { score: (F) => (F.sugar == null ? null : -F.sugar), why: (F) => t('whySugar', '{v} g natural sugar', { v: fmt(F.sugar) }) },
    energy: { score: (F) => F.kcal, why: (F) => t('whyEnergy', '{v} kcal of natural energy', { v: fmt(F.kcal, 0) }) },
  };
  const TASTES = {
    any: () => true,
    sweet: (F) => /sweet|honey|caramel|rich/i.test(F.taste || '') && !/tart|sour|tang/i.test(F.taste || ''),
    tangy: (F) => /tang|tart|sour|citrus|sweet-tart/i.test(F.taste || ''),
    creamy: (F) => /cream|butter|custard|smooth/i.test(`${F.taste || ''} ${F.texture || ''}`),
  };
  const initFinder = (root, fruits) => {
    const form = root.querySelector('[data-finder-form]');
    const listEl = root.querySelector('[data-finder-list]');
    const titleEl = root.querySelector('[data-finder-title]');
    const render = () => {
      const data = new FormData(form);
      const goal = GOALS[data.get('goal')] || GOALS.vitc;
      const taste = TASTES[data.get('taste')] || TASTES.any;
      const seasonOnly = data.get('season') === '1';
      let pool = fruits.filter((F) => F.hasNutrition && goal.score(F) != null && (F.buy || F.url));
      if (seasonOnly) pool = pool.filter((F) => F.inSeason || !F.months.length);
      let picks = pool.filter(taste);
      const relaxed = picks.length === 0;
      if (relaxed) picks = pool;
      picks = picks.sort((x, y) => goal.score(y) - goal.score(x)).slice(0, 3);
      titleEl.textContent = relaxed
        ? t('finderRelaxed', 'No exact taste match — here are the best for your goal')
        : t('finderTitle', 'Your top picks');
      listEl.innerHTML = picks.map((F, i) => `<li>${card(F, `<p class="ft-why"><span class="badge badge--amber">#${i + 1}</span> ${esc(goal.why(F))}${F.bestUse ? ` · ${esc(F.bestUse)}` : ''}</p>`)}</li>`).join('')
        || `<li class="t-body c-muted">${esc(t('noMatch', 'No fruit matches — try another option.'))}</li>`;
    };
    form.addEventListener('change', render);
    form.addEventListener('submit', (e) => e.preventDefault());
    render();
  };

  /* ---------- Share (compare page) ---------- */
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-share]');
    if (!btn) return;
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: document.title, url });
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        const label = btn.querySelector('[data-share-label]');
        const prev = label.textContent;
        label.textContent = t('copied', 'Link copied');
        window.setTimeout(() => { label.textContent = prev; }, 1600);
      }
    } catch (err) { /* user cancelled */ }
  });

  const init = () => {
    const fruits = load();
    document.querySelectorAll('[data-fruit-compare]:not([data-ready])').forEach((root) => { root.dataset.ready = ''; initCompare(root, fruits); });
    document.querySelectorAll('[data-fruit-guide]:not([data-ready])').forEach((root) => { root.dataset.ready = ''; initGuide(root, fruits); });
    document.querySelectorAll('[data-fruit-season]:not([data-ready])').forEach((root) => { root.dataset.ready = ''; initSeason(root, fruits); });
    document.querySelectorAll('[data-fruit-finder]:not([data-ready])').forEach((root) => { root.dataset.ready = ''; initFinder(root, fruits); });
    document.querySelectorAll('[data-share][hidden]').forEach((b) => { if (navigator.share || navigator.clipboard) b.hidden = false; });
  };
  init();
  document.addEventListener('shopify:section:load', init);
})();
