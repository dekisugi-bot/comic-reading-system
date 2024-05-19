export const SearchPopup = ({ items, visible }) => {
  return (
    <div className={`search-popup ${visible ? "" : "hide"}`}>
      <div className="content">
        <div className="title">Search product</div>
        {items.map((e, index) => {
          return (
            <div
              className="item fade-go-up"
              style={{ animationDelay: 50 * index + "ms" }}
              key={`search-popup-${e.id}`}
            >
              {e.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
