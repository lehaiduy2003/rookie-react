interface ProductImageProps {
  imageUrl: string | null;
  name: string;
}

const ProductImage = ({ imageUrl, name }: ProductImageProps) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white mb-4">
      <img
        src={imageUrl || "https://placehold.co/600x600?text=No+Image"}
        alt={name}
        className="w-full aspect-square object-contain"
      />
    </div>
  );
};

export default ProductImage;
