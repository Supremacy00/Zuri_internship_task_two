
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

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

  return (
    <div>
      <section className="container mx-auto font-robotom mt-[70px] px-8 sm:max-w-[1200px] md:mt-24 xl:px-0 lg:max-w-[1285px]">
        {!isLoading && <div className="flex justify-between items-center sm:max-w-[1200px] md:mt-16 md:px-0 lg:max-w-[1285px]">
          <h1 className="text-[20px] font-semibold md:text-[25px]">
            Featured Movies
          </h1>
          <button
            className="text-red-600 text-[16px] md:text-[16px]"
          >
            See More <ChevronRightIcon />
          </button>
        </div>}
        <section className="mx-auto grid gap-12 mt-8 sm:grid-cols-2 md:mt-8 md:gap-x-10  xl:gap-x-28 md:px-0 md:grid-cols-3 lg:grid-cols-4">
          {movieList.map((movie) => (
            <div key={movie.id} className="mx-auto mt-6">
              <div className="relative">
                <Link to={`moviedetails/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt=""
                    className="object-fill w-[1500px] h-[400px] md:h-[350px] hover:-translate-y-2 hover:transition-all hover:ease-in hover:delay-150 cursor-pointer"
                  />
                </Link>
                <div className="absolute top-4 right-4 text-white text-xs bg-gray-100 bg-opacity-70 rounded-full">
                  <FavoriteIcon className="text-3xl" />
                </div>
              </div>
              <div>
                <div className="mt-3 text-xs text-gray-400">
                  <h3>{movie.release_date}</h3>
                </div>
                <div>
                  <h1 className="mt-3 text-[18px] font-medium">
                    {movie.title}
                  </h1>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1.5 items-center mt-3">
                      <img
                        src="/src/assets/imdb.png"
                        alt=""
                        className="w-8 h-4"
                      />
                      <p className="text-[12px]">{movie.data}</p>
                    </div>
                    <div className="flex gap-1.5 items-center mt-3">
                      <img
                        src="/src/assets/rtimg.png"
                        alt=""
                        className="w-4 h-4"
                      />
                      <p className="text-[12px]">
                        {movie.popularity}
                      </p>
                    </div>
                  </div>
                  <h4 className="mt-3 text-xs text-gray-400">
                  </h4>
                </div>
              </div>
            </div>
          ))}
          {!isLoading && filteredSearchResults.length === 0 && slicedData.length === 0 && (
            <div className="text-center text-red-500 mt-4">
              No movies found. Please try a different search.
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

Card.propTypes = {
  searchResults: PropTypes.array.isRequired,
};

export default Card;
