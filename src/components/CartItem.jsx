import { InputNumber } from "antd";
import { useDispatch } from "react-redux";
import { changeQuantity, removeItemInCart } from "../app/redux/cartSlice";
import { CloseOutlined } from "@ant-design/icons";

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <div className="image">
        <img src={item.product.images[0].url} alt="" />
      </div>
      <div className="info">
        <div className="name">{item.product.name}</div>
        <div className="price">{`$${item.product.price * item.quantity}`}</div>
      </div>
      <div className="quantity">
        <InputNumber
          min={1}
          max={1000}
          defaultValue={item.quantity}
          onChange={(value) => {
            dispatch(
              changeQuantity({ id: item?.product?.id, quantity: value })
            );
          }}
        />
      </div>
      <div className="remove">
        <CloseOutlined
          onClick={() => {
            dispatch(removeItemInCart({ id: item?.product?.id }));
          }}
        />
      </div>
    </div>
  );
};
