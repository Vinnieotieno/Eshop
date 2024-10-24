'use client'

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Image from 'next/image';  // Import Image component for optimized images
import { useCart } from '@/hooks/useCart';  // Import the useCart hook for cart management

export default function CartClient() {
  const { cartProducts, setCartProducts, handleAddProductToCart } = useCart();  // Get cart items and cart management functions
  const [selectedItems, setSelectedItems] = useState<number[]>([]);  // State for selected items

  // Function to handle changes in product quantity
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (!cartProducts) return;

    const updatedProducts = cartProducts.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartProducts(updatedProducts);
  };

  // Function to handle the deletion of a product
  const handleDeleteItem = (id: number) => {
    if (!cartProducts) return;

    const updatedProducts = cartProducts.filter(item => item.id !== id);
    setCartProducts(updatedProducts);
    setSelectedItems(selectedItems.filter(itemId => itemId !== id));
  };

  // Function to handle selecting/unselecting an individual item
  const handleSelectItem = (id: number) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(itemId => itemId !== id)
        : [...prevSelected, id]
    );
  };

  // Function to handle selecting/unselecting all items
  const handleSelectAll = () => {
    if (!cartProducts) return;

    setSelectedItems(
      selectedItems.length === cartProducts.length
        ? []
        : cartProducts.map(item => item.id)
    );
  };

  // Function to handle deleting all selected items
  const handleDeleteSelected = () => {
    if (!cartProducts) return;

    const updatedProducts = cartProducts.filter(item => !selectedItems.includes(item.id));
    setCartProducts(updatedProducts);
    setSelectedItems([]);
  };

  // Calculate the subtotal of the cart
  const subtotal = cartProducts?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  return (
    <div className="container mx-auto p-4">
      
      <p className="mb-4">{cartProducts?.length || 0} items in your cart.</p>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <Checkbox
                id="select-all"
                checked={selectedItems.length === cartProducts?.length}
                onChange={handleSelectAll}  // Change to proper handler
              />
              <Button variant="destructive" onClick={handleDeleteSelected} disabled={selectedItems.length === 0}>
                Delete Selected
              </Button>
            </div>

            {cartProducts?.map(item => (
              <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                <Checkbox
                  id={`item-${item.id}`}
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}  // Use `onChange`
                />
                <Image
                  src={item.image}
                  alt={item.name}
                  width={item.width || 500}   // Use dynamic width if available
                  height={item.height || 500} // Use dynamic height if available
                  layout="responsive"         // Makes the image responsive
                  sizes="(max-width: 768px) 100vw, 
                         (max-width: 1200px) 50vw, 
                         25vw"                // Responsive behavior across screen sizes
                  className="object-cover"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">Color: {item.color}</p>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Select
                      value={item.quantity.toString()}
                      onValueChange={(value) => handleQuantityChange(item.id, parseInt(value))}
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num.toString()}>{num}</option>
                      ))}
                    </Select>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="font-semibold">KES{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow mb-4">
            <h2 className="text-xl font-semibold mb-4">Calculated Shipping</h2>
            <Select>
              <option value="">Select Country</option>
              {/* Add more country options here */}
            </Select>
            <div className="flex gap-2 mt-2">
              <Input placeholder="State / City" />
              <Input placeholder="ZIP Code" />
            </div>
            <Button className="w-full mt-4">Update</Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow mb-4">
            <h2 className="text-xl font-semibold mb-4">Coupon Code</h2>
            <Input placeholder="Enter coupon code" />
            <Button className="w-full mt-4">Apply</Button>
          </div>

          <div className="bg-blue-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
            <div className="flex justify-between mb-2">
              <span>Cart Subtotal</span>
              <span>KES{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Total</span>
              <span>KES{subtotal.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4">Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
