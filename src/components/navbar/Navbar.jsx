import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import PropTypes from "prop-types";

const Navbar = ({ setSearchResults }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  const handleMenu = () => {
    setIsOpen((isOpen) => !isOpen);

    if (window.innerWidth > 768) {
      setIsOpen(isOpen);
    }
  };

  const searchMovie = useCallback(() => {
    const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=da9f55641078b533ef66073064c85666`;

    setIsLoading(true);

    fetch(movieUrl)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could Not Fetch The Data");
        }
        return res.json();
      })
      .then((data) => {
        setSearchResults(data.results.slice(0, 10));
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [search, setSearchResults]);

  useEffect(() => {
    if (search !== "") {
      searchMovie();
    }
  }, [search, searchMovie]);

  const handleSearchMovie = (event) => {
    if (event.key === "Enter") {
      searchMovie();
      setSearch("");
    }
  };

  if (error) {
    return <div className="flex justify-center mt-24">{error}</div>;
  }

  return (
    <>
      <div>
        <nav
          className={`${
            !isOpen
              ? "container mx-auto flex justify-between mt-4 px-8 sm:max-w-[1200px] lg:max-w-[1285px] xl:px-0"
              : "mt-4 px-8"
          } fixed md:absolute right-0 left-0 top-0 z-50 ${isScrolled && !isOpen && "bg-black bg-opacity-80 py-2 -mt-0 "} `}
        >
          <Link to="/">
            <div className="flex justify-start items-center gap-3 md:gap-5 ">
              <img
                src="/images/tv.png"
                alt=""
                className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] z-50"
              />
              <h1 className="text-[18px] z-50 md:font-semibold md:text-[25px] text-white">
                MovieBox
              </h1>
            </div>
          </Link>
          <div
            className={`${
              !isOpen
                ? "fixed md:relative hidden md:flex md:items-center "
                : isOpen
                ? "fixed md:relative top-0 left-0 right-0 bg-black w-full h-[350px]"
                : "hidden"
            }`}
          >
            <input
              type="search"
              name=""
              id=""
              className={`${
                isOpen
                  ? "rounded-md absolute top-28 right-8 left-8 md:right-20 md:left-20 h-10 md:h-8"
                  : "border w-[400px] h-10 rounded-md"
              } pl-3 pr-8 text-black md:text-white  md:bg-transparent `}
              placeholder="What do you want to watch?"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={handleSearchMovie}
            />
            <span
              className={`${
                isOpen ? "absolute top-[120px] right-[45px]" : "relative right-8"
              } `}
            >
              {isLoading ? (
                <FadeLoader fontSize="inherit" color="#ffffff"/>
              ) : (
                <SearchIcon className="text-xs text-black md:text-white" />
              )}
            </span>
          </div>
          <div className="flex justify-center gap-3 items-center ">
            <h1
              className={`${
                !isOpen
                  ? "hidden md:block"
                  : "absolute top-[185px] text-white text-md"
              }`}
            >
              <button
                className={`${
                  isOpen ? "bg-red-600 px-8 py-1 rounded-md" : ""
                } text-white`}
              >
                Sign in
              </button>
            </h1>
            <div
              className={`${
                isOpen ? "absolute top-[6.5px] right-8" : "relative "
              } cursor-pointer md:cursor-default`}
              onClick={handleMenu}
            >
              <img src="/images/Ellipse 1.png" alt="" className="w-8 h-8" />
              <span className="absolute top-1 left-1">
                <img src="/images/Menu alt 4.png" alt="" />
              </span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

Navbar.propTypes = {
  setSearchResults: PropTypes.func.isRequired,
};

export default Navbar;
