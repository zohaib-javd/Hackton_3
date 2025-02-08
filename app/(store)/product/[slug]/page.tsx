import React from "react";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { PortableText } from "next-sanity";
import AddToBasketButton from "@/components/AddToBasketButton";


export const dynamic = "force-static";
export const revalidate = 60; // revalidate this page every 60 seconds

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

console.log(
  crypto.randomUUID().slice(0, 5) + 
  `>>> Rerendered the product page cache for ${slug}`
);



  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}
        >
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product Image"}
              fill
              className="object-cover transition-transform duration-300 transform hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-xl font-bold">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-xl font-semibold mb-4">
              ${product.price?.toFixed(2)}
            </div>
            <div className="prose max-w-none mb-6">
              <blockquote className="border-none">
                {Array.isArray(product.description) && (
                  <PortableText value={product.description} />
                )}
              </blockquote>
            </div>
          </div>
          <div className="mt-6">
            <AddToBasketButton product={product} disable={isOutOfStock} />
            {/* <Button>Add to Basket</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
