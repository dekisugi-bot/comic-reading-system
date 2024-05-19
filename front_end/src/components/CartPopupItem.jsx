export const CartPopupItem = ({ item }) => {
  return (
    <div>
      <div className="cart-popup-item">
        <div className="image">
          <img src={item.product.images[0].url} alt="" />
        </div>
        <div className="info">
          <div className="name">{`${item.product.name} (${item.quantity })`}</div>
          <div className="price">{`$${
            item.product.price * item.quantity
          }`}</div>
        </div>
      </div>
    </div>
  );
};
