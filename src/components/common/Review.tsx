import React from "react";
import { ReviewInterface } from "../../interfaces/Interfaces";
import { getImage, transformDate } from "../../lib/api";

interface Props {
  review: ReviewInterface;
}
const Review: React.FC<Props> = ({ review }) => {
  const imagePath: string = review.author_details?.avatar_path?.slice(1) || '';
  const avatar: any = <div className="avatarImage" style={{backgroundImage:`url(${imagePath.includes('https') ? imagePath : getImage(imagePath, 'face')})`}}/>
  return <div className="reviewContainer">
    <div className="reviewHeader">
      <div className="avatar">
        { imagePath ? avatar : <div className="avatarImage empty">{review.author?.slice(0,1)}</div>}
      </div>
      <p className="author">Written by {review.author} on {transformDate(review.updated_at as string)}</p>
      <div className="ratingContainer">
        <span className="icons icon-star"></span>
        <span className="rating">{review.author_details?.rating}.0</span>
      </div>
    </div>
    <div className="reviewInfos">
      <p className="content">{review.content}</p>
    </div>
  </div>

}

export default Review;