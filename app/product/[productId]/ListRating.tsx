"use client";

import moment from "moment";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import Avatar from "@/app/components/Avatar";

interface ListRatingProps {
  product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  return (
    <div>
      <Heading title="Product Review" />
      <div className="text-sm mt-2">
        {product.reviews &&
          product.reviews.map((review: any) => (
            <div key={review.id} className="max-w-[300px]">
              <div className="flex gap-2 items-center">
                {/* Ensure Avatar component handles undefined src */}
                <Avatar src={review?.user?.image} />
                <div className="font-semibold">{review?.user?.name}</div>
                {/* Show the actual date and time */}
                <div className="font-light">
                  {moment(review.createdDate).format("MMMM D, YYYY [at] h:mm A")}
                </div>
              </div>

              <div className="mt-2">
                <Rating value={review.rating} readOnly />
                <div className="ml-2">{review.comment}</div>
                <hr className="mt-4 mb-4" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListRating;
