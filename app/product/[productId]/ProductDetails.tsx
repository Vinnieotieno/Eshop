"use client";

import { useRouter } from "next/navigation";
import { MdCheckCircle } from "react-icons/md";
import { Rating } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCart } from "@/hooks/useCart";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";

interface Review {
  rating: number;
}

interface ProductImageType {
  color: string;
  colorCode: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  images: ProductImageType[];
  reviews: Review[];
  price: number;
  inStock: boolean;
}

interface ProductDetailsProps {
  product: Product;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: ProductImageType;
  quantity: number;
  price: number;
};

const Horizontal = () => <hr className="w-[30%] my-2" />;

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();  // Correct hook usage
  const router = useRouter();

  const initialCartProduct = useMemo<CartProductType>(() => ({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: product.images[0],  // Default to first image
    quantity: 1,
    price: product.price,
  }), [product]);

  const [cartProduct, setCartProduct] = useState<CartProductType>(initialCartProduct);

  const productRating = useMemo(() => {
    return product.reviews.length > 0
      ? product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
      : 0;
  }, [product.reviews]);

  const isProductInCart = useMemo(() => {
    return cartProducts?.some((item) => item.id === product.id) ?? false;
  }, [cartProducts, product.id]);

  const handleColorSelect = useCallback((value: ProductImageType) => {
    setCartProduct((prev) => ({ ...prev, selectedImg: value }));
  }, []);

  const handleQuantityIncrease = useCallback(() => {
    setCartProduct((prev) => ({
      ...prev,
      quantity: Math.min(prev.quantity + 1, 99),
    }));
  }, []);

  const handleQuantityDecrease = useCallback(() => {
    setCartProduct((prev) => ({
      ...prev,
      quantity: Math.max(prev.quantity - 1, 1),
    }));
  }, []);

  // Check and ensure product is correctly added to cart
  const handleAddProductToCartWrapper = useCallback(() => {
    if (!isProductInCart) {
      handleAddProductToCart(cartProduct);  // Correct function call
    }
  }, [handleAddProductToCart, cartProduct, isProductInCart]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect} />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div>
          <Rating value={productRating} readOnly aria-label={`Product rated ${productRating.toFixed(1)} out of 5`} />
          <div className="flex items-center gap-2">{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <strong>CATEGORY:</strong> {product.category}
        </div>
        <div>
          <strong>BRAND:</strong> {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"} aria-live="polite">
          {product.inStock ? "In stock" : "Out of stock"}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20} aria-hidden="true" />
              <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button label="View Cart" outline onClick={() => router.push("/cart")} />
            </div>
          </>
        ) : (
          <>
            <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect} />
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQuantityIncrease={handleQuantityIncrease}
              handleQuantityDecrease={handleQuantityDecrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                label="Add To Cart"
                onClick={handleAddProductToCartWrapper}
                disabled={!product.inStock}
                aria-label={product.inStock ? "Add to cart" : "Product out of stock"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
