import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { ComicItem } from "../../components/ComicItem";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { productRepository } from "../../repository/productRepository";

export const Home = () => {
  const [comics, setComics] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const comics = await productRepository.getAllComics();
      setComics(comics);
    };

    fetchData();
  }, [currentPage]);

  return (
    <div>
      <Header />
      <div className="home-content">
        <div className="advertisement">
          <div
            className="ad one fade-go-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="text">Action</div>
          </div>
          <div
            className="ad two fade-go-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="text">Adventure</div>
          </div>
          <div
            className="ad three fade-go-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="text">Comedy</div>
          </div>
          <div
            className="ad four fade-go-up"
            style={{ animationDelay: "400ms" }}
          >
            <div className="text">Horror</div>
          </div>
        </div>
        <div className="title">Lastest comics</div>
        <div className="product-list">
          {comics.map((e, index) => {
            return (
              <ComicItem
                comic={e}
                key={`product-item-${e.id}`}
                delay={index * 100}
              />
            );
          })}
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Pagination
            defaultCurrent={currentPage}
            total={50}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
