# Baroda Fresh — Shopify theme

Online Store 2.0 theme recreating the Baroda Fresh mobile prototype, wired to the store's live products, collections and menus.

## Structure
- `layout/theme.liquid` — design tokens (colours from Theme settings), Google Fonts (Noto Serif + Plus Jakarta Sans), subset Material Symbols icons.
- `assets/base.css` — the whole design system; `assets/theme.js` — progressive enhancement (AJAX add-to-cart, variant pills, voice search). All forms work without JS.
- Home page sections (`templates/index.json`): search & quick pills → harvest hero → browse collections → product grid → product carousel (bowls) → product spotlight → product carousel (exotics) → promise list.
- Header group: header. Footer group: footer, mobile tab bar. Basket drawer (`sections/cart-drawer.liquid`) is rendered from the layout and re-rendered via the Section Rendering API after every add/change; the header bag and any tab linking to `/cart` open it.
- Inner pages: product, collection (filters + sort), collections list, cart, search, page, blog, article, 404, password.

## Product data used by cards
| Card element | Source |
|---|---|
| Eyebrow | metafield `custom.origin`, else product type |
| Unit line | selected variant title, or metafield `custom.unit` |
| Image chip (e.g. "14° Brix Sweet") | metafield `custom.highlight` (hidden when empty) |
| Corner badge | tag rules in Theme settings → Product cards, else "Save %" when compare-at > price |
| Strike-through price | variant compare-at price (only when set) |

## Develop
```sh
shopify theme dev --store <your-store>
shopify theme check
```
