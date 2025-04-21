import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import { IoStar } from "react-icons/io5";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/Product";

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
          <div>
            <h3 className="text-lg">
              <a href={`/products/${product.id}`} className="font-semibold text-primary">
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </a>
            </h3>
            {product.ratingCount > 0 ? (
              <p className="text-sm text-muted-foreground flex items-center">
                {product.avgRating} <IoStar className="inline-block text-yellow-500" />
                {` - ${product.ratingCount} ratings`}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground italic">No ratings yet</p>
            )}
          </div>
          <p className="text-lg font-semibold">{product.price}</p>
        </div>
      </CardContent>
    </Card>
  );
}
