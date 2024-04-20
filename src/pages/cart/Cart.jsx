import { useSelector } from "react-redux";
import { Header } from "../../components/Header";
import { CartItem } from "../../components/CartItem";

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const totalItemCount = cart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.quantity * currentValue.product.price,
    0
  );

  return (
    <div>
      <Header />
      <div className="cart">
        <div className="products">
          <div className="title">SHOPPING CART</div>
          <div className="cart-infomation">
            <div className="list">
              {cart.map((e, index, array) => {
                return (
                  <div>
                    <CartItem item={e} key={`cart-item-${e.product.id}`} />
                    {index !== array.length - 1 && <hr></hr>}
                  </div>
                );
              })}
            </div>
            <div className="total">
              <div className="count">{`SUBTOTAL ${totalItemCount} ITEMS`}</div>
              <div className="price">{`$${totalPrice}`}</div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
