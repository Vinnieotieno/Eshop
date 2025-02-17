"use client";

import { CartProductType, selectedImgType } from "@/app/product/[productId]/ProductDetails";

interface SetColorProps {
  images: selectedImgType[];
  cartProduct: CartProductType; // Corrected case here
  handleColorSelect: (value: selectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct, // Corrected case here
  handleColorSelect,
}) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">COLOR:</span>
        <div className="flex gap-1">
          {images.map((image) => (
            <div 
              key={image.color} // Add a unique key for each item in the map
              className={`
                h-7
                w-7
                rounded-full
                border-teal-300
                flex
                items-center
                justify-center
                ${
                  cartProduct.selectedImg.color === image.color // Corrected case here
                    ? 'border-[1.5px]'
                    : 'border-none'
                }
              `}
              onClick={() => handleColorSelect(image)}
            >
              <div
                style={{ background: image.colorCode }}
                className="
                  h-5
                  w-5
                  rounded-full
                  border-[1.2px]
                  border-slate-300
                  cursor-pointer
                "
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
