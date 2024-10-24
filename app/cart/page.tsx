'use client'

import CartClient from '@/app/cart/CartClient'
import { useCart } from '@/hooks/useCart'  // Import the useCart hook to check cart state

export default function CartPage() {
  const { cartProducts } = useCart();  // Access cartProducts to check if the cart is empty

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

      {cartProducts && cartProducts.length > 0 ? (
        <CartClient />  
        /* Render CartClient if there are products in the cart */
      ) : (
        <div className="text-center mt-8">
          <p className="text-xl font-semibold">Your cart is currently empty.</p>
          <p className="text-sm mt-2">Browse products and add them to your cart.</p>
        </div>
      )}
    </div>
  );
}
