import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { toast } from "react-hot-toast";

// Define the shape of the CartContext
type CartContextType = {
  cartTotalQty: number;
  cartProducts: CartProductType[];
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (id: number) => void;
};

// Create the CartContext
export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedCartItems = localStorage.getItem('eShopCartItems');
        const parsedCartItems: CartProductType[] = storedCartItems ? JSON.parse(storedCartItems) : [];
        setCartProducts(parsedCartItems);
        const totalQty = parsedCartItems.reduce((acc, item) => acc + item.quantity, 0);
        setCartTotalQty(totalQty);
      } catch (error) {
        console.error("Error loading cart from localStorage", error);
      }
    }
  }, []);

  // Function to handle adding products to the cart
  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prevProducts) => {
      let updatedCart: CartProductType[];

      const existingProduct = prevProducts.find(item => item.id === product.id);
      if (existingProduct) {
        updatedCart = prevProducts.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      } else {
        updatedCart = [...prevProducts, product];
      }

      try {
        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
      } catch (error) {
        console.error("Error saving cart to localStorage", error);
      }
      
      const totalQty = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
      setCartTotalQty(totalQty);
      toast.success("Product added to cart");
      return updatedCart;
    });
  }, []);

  // Function to handle removing products from the cart
  const handleRemoveProductFromCart = useCallback((id: number) => {
    setCartProducts((prevProducts) => {
      const updatedCart = prevProducts.filter(item => item.id !== id);
      try {
        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
      } catch (error) {
        console.error("Error saving updated cart to localStorage", error);
      }

      const totalQty = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
      setCartTotalQty(totalQty);
      toast.success("Product removed from cart");
      return updatedCart;
    });
  }, []);

  // CartContext value that will be passed down to components
  const value: CartContextType = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook to access the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
