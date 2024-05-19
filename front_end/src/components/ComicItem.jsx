import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const ComicItem = ({ comic, delay }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="product-item fade-go-up"
      style={{ animationDelay: delay + "ms" }}
    >
      <div className="product-content">
        <Link to={`/details?title=${comic.title}`} className="link">
          <div className="product-image">
            <img src={comic.image_link} alt="" />
          </div>
          <div className="product-info">
            <div className="product-name">{comic.title}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};
