import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useFetch from "../hooks/UseFetch";
import { Link } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { IoEllipse } from "react-icons/io5";
import PropTypes from "prop-types";
import { useState } from "react";

const Card = ({ searchResults }) => {
  const { data, isLoading } = useFetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=da9f55641078b533ef66073064c85666"
  );

  const slicedData = data.slice(0, 10);
  const initialMovieIds = slicedData.map((movie) => movie.id);

  const filteredSearchResults = searchResults.filter((movie) =>
    initialMovieIds.includes(movie.id)
  );

  const movieList =
    filteredSearchResults.length > 0 ? filteredSearchResults : slicedData;

  const [isLike, setIsLike] = useState({});

  const handleLike = (id) => {
    setIsLike((previsLike) => ({
      ...previsLike,
      [id]: !previsLike[id],
    }));
  };

  return (
    <div>
      <section className="container mx-auto font-robotom mt-[70px] px-8 sm:max-w-[1200px] md:mt-24 xl:px-0 lg:max-w-[1285px]">
        {!isLoading && (
          <div className="flex justify-between items-center sm:max-w-[1200px] md:mt-16 md:px-0 lg:max-w-[1285px]">
            <h1 className="text-[20px] font-semibold md:text-[25px]">
              Featured Movies
            </h1>
            <button className="text-red-600 text-[16px] md:text-[16px]">
              See More <ChevronRightIcon />
            </button>
          </div>
        )}
        <section className="mx-auto grid gap-20 mt-8 sm:grid-cols-2 md:mt-8 md:gap-x-10  xl:gap-x-28 md:px-0 md:grid-cols-3 lg:grid-cols-4">
          {movieList.map((movie) => (
            <div
              key={movie.id}
              className="mx-auto mt-6"
              data-testid="movie-card"
            >
              <div className="relative group hover:-translate-y-2 hover:transition-all hover:delay-150">
                <Link to={`moviedetails/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt=""
                    className="object-fill w-[1500px] h-[500px] md:h-[350px]  cursor-pointer"
                    data-testid="movie-poster"
                  />
                </Link>
                <div
                  className="top-6 right-8 absolute cursor-pointer md:cursor-default"
                  onClick={() => handleLike(movie.id)}
                >
                  <IoEllipse className="text-white w-9 h-9 opacity-60 " />
                  <span className="absolute top-2 left-2 ">
                    <MdOutlineFavorite
                      className={`${
                        isLike[movie.id]
                          ? "text-red-700 w-5 h-5"
                          : "w-5 h-5 text-white opacity-80"
                      }`}
                    />
                  </span>
                </div>
              </div>
              <div>
                <div className="mt-3 text-[14px] text-gray-600">
                  <h3 data-testid="movie-release-date">{movie.release_date}</h3>
                </div>
                <div>
                  <h1
                    className="mt-3 text-[18px] font-medium"
                    data-testid="movie-title"
                  >
                    {movie.title}
                  </h1>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1.5 items-center mt-3">
                      <img src="/images/imdb.png" alt="" className="w-8 h-4" />
                      <p className="text-[13px]">{movie.popularity}</p>
                    </div>
                    <div className="flex gap-1.5 items-center mt-3">
                      <img src="/images/rtimg.png" alt="" className="w-4 h-4" />
                      <p className="text-[13px]">{movie.vote_count}</p>
                    </div>
                  </div>
                  <h4 className="mt-3 text-xs text-gray-400"></h4>
                </div>
              </div>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
};

Card.propTypes = {
  searchResults: PropTypes.array.isRequired,
};

export default Card;
