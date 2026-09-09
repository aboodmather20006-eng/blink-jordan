# BLINK Jordan storefront

Customer-facing React/TypeScript/Tailwind frontend using the Sites Vinext starter (Next.js App Router-compatible). No database, authentication, payment integration, order API, or server-side order processing.

## Development

Use Node 22.13 or later and pnpm. Run `pnpm install`, `pnpm dev`, `pnpm lint`, `pnpm typecheck`, and `pnpm build`.

In the managed Windows runtime, pnpm's automatic dependency verification may request a different store than the initializer used. The already-installed commands can also be invoked directly: `node node_modules/vinext/dist/cli.js dev`, `node node_modules/typescript/bin/tsc --noEmit`, `node node_modules/oxlint/bin/oxlint`, and `node node_modules/vinext/dist/cli.js build`.

## Data and integration boundaries

- `data/products.ts`, `categories.ts`, `site.ts`, `size-guide.ts`: centralized demo content, variants, stock, delivery fee and business details.
- `data/images.ts`: stock image references. The generated campaign image is `public/images/hero.webp`.
- `lib/catalog.ts`: catalog access and validation of saved cart lines. Replace the catalog source here when adding a backend.
- `lib/checkout.ts`: typed form validation and isolated mock submission. It sends and stores no customer data.
- `components/store`: shared layout, catalog, product, cart, checkout, and accessible controls composed from bundled UI primitives.
- Cart uses `blink-cart-v1` in localStorage; only product/variant IDs and quantities are saved. Different sizes and colors remain distinct. Invalid or stale entries are discarded and quantities are stock-limited.
- Feature-detected WebMCP tools expose catalog, cart readback, and adding available variants to the same local cart. They never place orders.

## Official logo — required asset

All brand images reference **`/blink-logo.png`** through the shared Logo component. Place the official original file at `public/blink-logo.png`. It is displayed with `object-fit: contain`, without recoloring, stretching, cropping, or image processing. Do not create a text substitute.

The supplied `Downloads/Blink` folder contained only `LOGO.jpg`; the requested PNG was not present when this version was authored. Use of that alternative artwork is awaiting user clarification. Publishing must wait for the official asset.

## Content before a real store launch

Replace stock/demo product photography, verify variant stock and composition, replace sample size charts, supply official contact/location details and shipping/returns policy, confirm delivery fees, then connect a real checkout service. The demo fee is 3 JOD and is clearly labeled. All customer-facing content is English.

Stock references were selected from Unsplash: John-Paul Henry (tee), Navid Sohrabi (shirt), Omid Bonyadian (denim), Samuel Lopes (street), Pedram Normohamadian (black outfit), Jayson Hinrichsen (stripe), Mojtaba Mosayebzadeh and Kyle Austin (shoes). Pants and cap images were found through Unsplash collections. These are placeholder assets and do not represent actual BLINK inventory.

Lint excludes unchanged vendor primitives in `components/ui` and the starter's `hooks/use-mobile.ts`; custom storefront code is checked with strict TypeScript and accessibility rules.
