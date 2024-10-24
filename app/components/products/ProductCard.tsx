"use client"; // Enable client-side rendering

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Define a more strict type for data to avoid `any`
interface Product {
  id: string;
  name: string;
  price: number;
  images?: { image: string }[];
  reviews: { rating: number }[];
}

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  // Safe check for reviews array length
  const productRating =
    data.reviews && data.reviews.length > 0
      ? data.reviews.reduce((acc: number, item) => item.rating + acc, 0) /
        data.reviews.length
      : 0;

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition-transform hover:scale-105 text-center text-sm"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          {data.images && data.images.length > 0 ? (
            <Image
              fill
              src={data.images[0].image}
              alt={data.name}
              className="w-full h-full object-contain"
              sizes="(max-width: 640px) 100vw, 640px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span>No image available</span>
            </div>
          )}
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
