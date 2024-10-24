import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { toast } from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartProducts: CartProductType[];
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (id: number) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);

  // Load cart items from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadCartFromStorage = () => {
        try {
          const storedCartItems = localStorage.getItem('eShopCartItems');
          const parsedCartItems: CartProductType[] = storedCartItems ? JSON.parse(storedCartItems) : [];
          setCartProducts(parsedCartItems);
          const totalQty = parsedCartItems.reduce((acc, item) => acc + item.quantity, 0);
          setCartTotalQty(totalQty);
        } catch (error) {
          console.error("Error loading cart from localStorage", error);
        }
      };
      
      loadCartFromStorage();
      
      // Listen to localStorage changes (e.g., different tab)
      window.addEventListener('storage', loadCartFromStorage);
      
      return () => {
        window.removeEventListener('storage', loadCartFromStorage);
      };
    }
  }, []);

  // Save cart to localStorage and recalculate total quantity
  const saveCartToStorage = (updatedCart: CartProductType[]) => {
    try {
      localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error saving cart to localStorage", error);
    }
  };

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

      saveCartToStorage(updatedCart);
      
      const totalQty = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
      setCartTotalQty(totalQty);
      toast.success("Product added to cart");
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback((id: number) => {
    setCartProducts((prevProducts) => {
      const updatedCart = prevProducts.filter(item => item.id !== id);
      
      saveCartToStorage(updatedCart);

      const totalQty = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
      setCartTotalQty(totalQty);

      if (updatedCart.length === 0) {
        toast.success("Cart is now empty");
      } else {
        toast.success("Product removed from cart");
      }

      return updatedCart;
    });
  }, []);

  const value: CartContextType = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
