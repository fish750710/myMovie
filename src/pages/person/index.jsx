import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

import useFetch from "@/hooks/useFetch";

import BaseList from "@/components/MovieList/BaseList";

import { personSVC } from "@/api";

import style from "./styled";

export default function () {
  // const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTVList] = useState([]);
  const [personName, setPersonName] = useState("");
  const { sendRequest, isLoading, error } = useFetch();

  const getPersonMovies = async (personId) => {
    try {
      const personMoviesParams = personSVC.getPersonMovies(personId);
      const { cast, crew } = await sendRequest(
        personMoviesParams.url,
        personMoviesParams.options
      );
      setMovieList(cast); //電影
      setTVList(crew); // tv
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      getPersonMovies(params.personId);
      setPersonName(searchParams.get("name"));
    } catch (error) {
      console.log(error);
    }
  }, [params.personId]);

  return (
    <style.Content>
      <style.Section>
        <div className="main">
          <div className="label">{personName} 的其他作品</div>
        </div>
      </style.Section>
      <style.Section>
        <BaseList
          isLoading={isLoading}
          itemList={movieList}
          title="電影"
          category="movie"
        />
      </style.Section>
      <style.Section>
        <BaseList
          isLoading={isLoading}
          itemList={tvList}
          title="電視節目"
          category="tv"
        />
      </style.Section>
    </style.Content>
  );
}
