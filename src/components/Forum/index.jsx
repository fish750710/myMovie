import React, { useRef, useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import style from "./styled";

import { moviesSVC, guestSVC, accountSVC } from "@/api";

import useFetch from "@/hooks/useFetch";
import useMessage from "@/hooks/useMessage";

import Message from "@/components/Card/Message";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Rating from "@mui/material/Rating";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// 優化不重複渲染
const arePropsEqual = (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
};
// 收藏觸發避免重複渲染 memo
const index = memo(({ id, category }) => {
  const { sessionID, isLogin, userData } = useSelector((state) => state.user);
  const { sendRequest, isLoading, error } = useFetch();
  const [message, setMessage] = useMessage("");

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const ratingHandler = async (event, newValue) => {
    setRating(newValue);
    try {
      let rateMovieParams = null;
      let res = null;
      if (isLogin) {
        rateMovieParams = moviesSVC.rateMovie(
          id,
          sessionID,
          {
            value: newValue,
          },
          category
        );
        console.log("評分", res);
      } else {
        rateMovieParams = moviesSVC.rateMovieGuest(
          id,
          sessionID,
          {
            value: newValue,
          },
          category
        );
        console.log("評分 guest", res);
        setIsOpen(true);
      }
      res = await sendRequest(rateMovieParams.url, rateMovieParams.options);
      setMessage(res.status_message);
    } catch (error) {
      console.log(error);
      setIsOpen(true);
      setMessage(error);
    }
  };

  const getRatedMovies = async () => {
    // 有些電影獲取評分有問題！
    let ratedMoviesParams = null;
    let res = null;
    if (isLogin) {
      ratedMoviesParams = accountSVC.getRatedMovies(sessionID, userData.id);
    } else {
      ratedMoviesParams = guestSVC.getGuestRatedMovies(sessionID);
    }
    res = await sendRequest(ratedMoviesParams.url, ratedMoviesParams.options);
    if (res.success === false) return;
    if (res.results.length > 0) {
      const data = res.results.find((item) => item.id === Number(id));
      data && setRating(data.rating);
    }
  };

  useEffect(() => {
    if (sessionID) {
      getRatedMovies();
    }
  }, [sessionID]);

  useEffect(() => {
    const sortDate = (arr) => {
      const newArr = arr.map((item) => {
        item.time = new Date(item.updated_at).toLocaleString();
        item.t = new Date(item.updated_at).getTime();
        return item;
      });
      return newArr.sort((a, b) => b.t - a.t);
    };
    const getReviews = async (id, category) => {
      try {
        const reviewsParams = moviesSVC.getReviews(id, category);
        const res = await sendRequest(reviewsParams.url, reviewsParams.options);
        if (!res.success) return;
        setReviews(sortDate(res.results));
      } catch (error) {
        console.log("reviews:", error);
      }
    };
    getReviews(id, category);
  }, [id]);

  return (
    <style.CardBox>
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={() => setIsOpen(false)}
      >
        <Alert
          onClose={() => setIsOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <style.Card>
        <div className="flex items-end justify-end">
          <div className="label">
            評分
            <Rating
              className="ml-5"
              name="size-large"
              value={rating}
              size="large"
              onChange={ratingHandler}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "red",
                },
                "& .MuiRating-iconFocus": {
                  color: "red",
                },
                "& .MuiRating-iconEmpty": {
                  color: "white",
                },
                "& .MuiRating-iconHover": {
                  color: "red",
                },
              }}
            />
          </div>
        </div>

        {reviews &&
          reviews.map((item) => <Message item={item} key={item.id} />)}
      </style.Card>
    </style.CardBox>
  );
}, arePropsEqual);

export default index;
