import { Rate } from "antd";

export const ReviewItem = ({ review }) => {
  return (
    <div className="review-item">
      <div className="user">{review?.userReview?.username}</div>
      <div className="rating">
        <Rate disabled defaultValue={review?.rating} />
      </div>
      <div className="review">{review.content}</div>
    </div>
  );
};
