import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProductLanding } from "@/components/ProductLanding";
import { findProduct, products } from "@/data/products";

export const Route = createFileRoute("/produit/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.shortName} — ${loaderData.product.price} DH | Go Fitness` },
          { name: "description", content: `${loaderData.product.tagline}. ${loaderData.product.mainBenefit}. Livraison gratuite au Maroc, paiement à la livraison.` },
          { property: "og:title", content: `${loaderData.product.shortName} — Go Fitness` },
          { property: "og:description", content: loaderData.product.tagline },
          { property: "og:image", content: loaderData.product.image },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:image", content: loaderData.product.image },
        ]
      : [{ title: "Produit — Go Fitness" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-zinc-950 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-black">Produit introuvable</h1>
        <a href="/boutique" className="mt-4 inline-block text-orange-400 hover:underline">Retour à la boutique</a>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center bg-zinc-950 text-white">
      <div className="text-center">
        <h1 className="text-2xl font-black">Erreur</h1>
        <p className="mt-2 text-zinc-400">{error.message}</p>
      </div>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  return <ProductLanding product={product} />;
}

export { products };
