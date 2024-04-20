import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { productRepository } from "../../repository/productRepository";

export const ComicReading = () => {
  const [params] = useSearchParams();
  const [comic, setComic] = useState({});

  const id = params.get("id");

  useEffect(() => {
    const fetchData = async () => {
      const data = await productRepository.getComicImages(id);
      console.log(data[0].image_urls);
      setComic(data[0]);
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Header />
      <div className="details-content">
        <Link className="back" to="/">
          GO BACK
        </Link>
        <div className="information">
          <div className="name" style={{ fontSize: "32px", fontWeight: "600" }}>
            {comic.comic_name}
          </div>
        </div>
        <div className="comic-image">
          {comic.image_urls?.map((url) => (
            <img referrerPolicy="no-referrer" src={url} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
};
