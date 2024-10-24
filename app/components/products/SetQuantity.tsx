"use client";

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { Button } from "@mui/material";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

const SetQuantity: React.FC<SetQuantityProps> = ({
  cartCounter,
  cartProduct,
  handleQuantityIncrease,
  handleQuantityDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {/* Show QUANTITY label if it's not a cart counter */}
      {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}

      <div className="flex gap-4 items-center text-base">
        <Button
          onClick={handleQuantityDecrease}
          sx={{
            border: '1.2px solid #CBD5E1',
            padding: '8px 16px',
            borderRadius: '4px',
            color: '#334155',
            '&:hover': { backgroundColor: '#F1F5F9' },
            '&:focus': { outline: 'none', borderColor: '#2DD4BF' },
          }}
        >
          -
        </Button>
        <div>{cartProduct.quantity}</div>
        <Button
          onClick={handleQuantityIncrease}
          sx={{
            border: '1.2px solid #CBD5E1',
            padding: '8px 16px',
            borderRadius: '4px',
            color: '#334155',
            '&:hover': { backgroundColor: '#F1F5F9' },
            '&:focus': { outline: 'none', borderColor: '#2DD4BF' },
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default SetQuantity;
