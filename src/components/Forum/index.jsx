import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./styled";

import { moviesSVC, guestSVC, accountSVC } from "@/api";
// import base from "@/api/base";

import Message from "@/components/Card/Message";

// import Skeleton from "@mui/material/Skeleton";
// import Stack from '@mui/material/Stack';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Rating from "@mui/material/Rating";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function index({ id, category }) {
  const renderRef = useRef(true);
  const [reviews, setReviews] = useState();
  const [rating, setRating] = useState(0);
  const { sessionID, isLogin, userData } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const ratingHandler = async (event, newValue) => {
    console.log("setRating", newValue);
    setRating(newValue);
    try {
      if (isLogin) {
        const res = await moviesSVC.rateMovie(
          id,
          sessionID,
          {
            value: newValue,
          },
          category
        );
        console.log("評分", res);
      } else {
        const res = await moviesSVC.rateMovieGuest(
          id,
          sessionID,
          {
            value: newValue,
          },
          category
        );
        console.log("評分 guest", res);
        setOpen(true);
        setMessage(res.status_message);
      }
    } catch (error) {
      console.log(error);
      setOpen(true);
      setMessage(error);
    }
  };

  const getRatedMovies = async () => {
    // 有些電影獲取評分有問題！
    let res = null;
    if (isLogin) {
      res = await accountSVC.getRatedMovies(sessionID, userData.id);
    } else {
      res = await guestSVC.getGuestRatedMovies(sessionID);
    }
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
    if (renderRef.current) {
      renderRef.current = false;
      return;
    }
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
        const res = await moviesSVC.getReviews(id, category);
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
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
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

        {reviews?.map((item) => (
          <Message item={item} key={item.id} />
        ))}
      </style.Card>
    </style.CardBox>
  );
}

export default index;
