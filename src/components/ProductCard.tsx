import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/Product";
import Rating from "./Rating";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-[300px] group relative overflow-hidden py-0">
      <figure className="group-hover:opacity-90">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black"
        >
          <HeartIcon className="size-4" />
        </Button>
        <img
          className="aspect-square object-cover"
          src={product.imageUrl ?? ""}
          alt={product.name}
        />
      </figure>
      <CardContent className="px-4 pb-4">
        <div className="flex justify-between">
          {/* Add width constraint for truncate the text */}
          <div className="w-[65%]">
            <h3 className="text-lg">
              <a
                href={`/products/${product.id}`}
                className="font-semibold text-primary truncate block overflow-hidden whitespace-nowrap"
                title={product.name} /* Show full name on hover */
              >
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </a>
            </h3>
            <Rating avgRating={product.avgRating} ratingCount={product.ratingCount} />
          </div>
          <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
