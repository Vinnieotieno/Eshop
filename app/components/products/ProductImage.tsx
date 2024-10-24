"use client";

import { CartProductType, selectedImgType } from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: { images: selectedImgType[] }; // Refined type for product
  handleColorSelect: (value: selectedImgType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="
      grid
      grid-cols-6
      gap-2
      h-full
      max-h-[500px]
      min-h-[300px]
      sm:min-h-[400px]"
    >
      {/* Thumbnail Image List */}
      <div className="
        flex
        flex-col
        items-center
        justify-center
        gap-4
        cursor-pointer
        border
        h-full
        max-h-[500px]
        min-h-[300px]
        sm:min-h-[400px]"
      >
        {/* Ensure "key" prop is unique using image color or another unique field */}
        {product.images && product.images.map((image: selectedImgType, index: number) => (
          <div
            key={`${image.color}-${index}`} // Unique key using color and index
            onClick={() => handleColorSelect(image)}
            className={`relative w-[80%] aspect-square rounded 
              ${cartProduct.selectedImg.color === image.color ? 'border-[1.5px] border-teal-300' : 'border-none'}`}
          >
            {/* Display product image */}
            <Image
              src={image.image}
              alt={image.color}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 80vw, (min-width: 641px) 400px"
            />
          </div>
        ))}
      </div>

      {/* Main Image Display */}
      <div className="col-span-5 relative aspect-square">
        <Image
          fill
          src={cartProduct.selectedImg.image} // Display selected image
          alt={cartProduct.name}
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
          sizes="(max-width: 640px) 80vw, (min-width: 641px) 500px"
        />
      </div>
    </div>
  );
};

export default ProductImage;
