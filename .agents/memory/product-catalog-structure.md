---
name: Product Catalog Structure
description: How products.ts is organized — packs vs individual products, variants system, category taxonomy.
---

## Rule
`src/data/products.ts` exports `Product[]` with:
- `brand`: "Superior 14" | "Tesla Nutrition" | "RedRex" | "Yava Labs" | "Army 1" | "Go Fitness"
- `category`: "pack" | "proteine" | "gainer" | "creatine" | "acides-amines" | "vitamines" | "pre-workout" | "seche"
- `variants?: { size: string; price: number; format?: string }[]` — when product has multiple sizes
- `price` — always the client final price from the PDF (never the reseller price)
- `items: PackItem[]` — for packs: the individual supplement components; for individual products: key features/ingredients shown in the radial animation

**Why:** Packs show their constituent products in PackBreakdown. Individual products use `items` to show key features. Both work with the same PackBreakdown component.

**How to apply:** When adding new products, use `variants` for size/price options. Show only `Prix client final` from the PDF, never `Prix Revendeur`. Product images reuse pack CDN images since individual product images aren't available at the CDN.
