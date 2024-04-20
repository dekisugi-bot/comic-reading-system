import { Button, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { productRepository } from "../../repository/productRepository";

export const ComicDetails = () => {
  const [params] = useSearchParams();
  const [chapters, setChapters] = useState([]);

  const title = params.get("title");

  useEffect(() => {
    const fetchData = async () => {
      const data = await productRepository.getChaptersByName(title);
      console.log(data);
      setChapters(data);
    };

    fetchData();
  }, [title]);

  return (
    <div>
      <Header />
      <div className="details-content">
        <Link className="back" to="/">
          GO BACK
        </Link>
        <div className="information">
          <div className="name">{title}</div>
        </div>
        {chapters.map((chapter) => (
          <Link
            to={`/reading?id=${chapter.chapter_id}`}
            className="link chapter"
          >
            {chapter.name}
          </Link>
        ))}
        <div className="review">
          <div className="review-title">Reviews</div>
          <hr />
          <div className="write-review">WRITE A CUSTOMER REVIEW</div>
          <div className="rating">Rating</div>
          <Rate className="rate" allowClear={false} defaultValue={5} />
          <div className="comment">Comment</div>
          <TextArea className="input" rows={2} />
          <Button className="btn">Submit</Button>
        </div>
      </div>
    </div>
  );
};
