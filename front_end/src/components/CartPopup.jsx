import { useSelector } from "react-redux";
import { CartPopupItem } from "./CartPopupItem";

export const CartPopup = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="cart-popup">
      {cart.map((e) => {
        return <CartPopupItem item={e} />;
      })}
    </div>
  );
};
