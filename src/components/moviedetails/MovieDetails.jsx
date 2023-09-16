import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import VideoCameraBackOutlinedIcon from "@mui/icons-material/VideoCameraBackOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import FadeLoader from "react-spinners/FadeLoader";

import { useParams } from "react-router";
import { useState, useEffect } from "react";

const MovieDetails = () => {
  const sideBar = [
    { title: "Home", icons: <HomeOutlinedIcon />, id: 1 },
    {
      title: "Movies",
      icons: <SmartDisplayOutlinedIcon />,
      id: 2,
      isActive: true,
    },
    { title: "Tv Series", icons: <VideoCameraBackOutlinedIcon />, id: 3 },
    { title: "Upcoming", icons: <CalendarMonthOutlinedIcon />, id: 4 },
    {
      mquiz: "Play movie quizzes and earn free tickets",
      quiz: true,
      quizpara: "50k people are playing now",
      qpara: true,
      btn: "Start playing",
      isBtn: true,
      id: 5,
      border: true,
    },
    { auth: "Log out", aIcons: <LogoutOutlinedIcon />, id: 6 },
  ];

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=da9f55641078b533ef66073064c85666&append_to_response=videos`;

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Could Not Fetch The Data");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
    }, 1000);
  }, [url]);

  const runtimeInMinutes = data.runtime;

  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;
  const movieFormatedTime = `${hours}h ${minutes}m`;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-red-700">
        <FadeLoader color="#FF0000" />
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center mt-24">{error}</div>;
  }

  if (!data) {
    return <div>The data you are requesting is not available....</div>;
  }

  const filteredVideo = data.videos.results;

  const officialTrailer = filteredVideo.find((item) => item.official === true);

  return (
    <div>
      <section>
        <div className="relative md:flex md:justify-between font-roboto ">
          <nav className="md:fixed top-0 right-0 left-0 rounded-b-[40px] w-full min-h-24 border-b-2  pb-6 md:w-[250px] md:h-screen md:rounded-r-[40px] md:border-r-2">
            <div className="flex justify-start items-center gap-3 md:gap-7 mt-4 mx-6 md:mt-12 md:ml-8">
              <img
                src="/images/tv.png"
                alt=""
                className="w-[45px] h-[45px] md:w-[55px] md:h-[55px]"
              />
              <h1 className="md:font-medium text-[18px] md:text-[22px]">
                MovieBox
              </h1>
            </div>
            <div>
              {sideBar.map((items) => {
                return (
                  <article
                    key={items.id}
                    className={`${
                      items.isActive &&
                      "bg-red-200 w-full h-12 md:h-[65px] my-0"
                    } my-4 md:my-[50px] text-gray-600`}
                  >
                    <div className="flex justify-start items-center gap-2 text-lg ml-6 md:text-[20px] md:ml-[60px] cursor-pointer">
                      <div className="">{items.icons}</div>
                      <div
                        className={`${
                          items.isActive &&
                          " border-r-[6px] text-red-700 border-red-700 w-full h-12 md:h-[65px] flex items-center "
                        } `}
                      >
                        {items.title}
                      </div>
                    </div>

                    <div
                      className={`${
                        items.border &&
                        "border border-red-600 rounded-3xl px-4 h-[220px] mx-7 py-11 "
                      } hidden md:block cursor-default bg-red-50`}
                    >
                      <h1
                        className={`${
                          items.quiz && "text-[17px] mb-3  font-medium"
                        }`}
                      >
                        {items.mquiz}
                      </h1>
                      <p className={`${items.qpara && "text-[15px]"}`}>
                        {items.quizpara}
                      </p>
                      <div
                        className={`${
                          items.isBtn &&
                          "text-center font-medium text-sm mt-2 bg-red-200 mx-4 py-[10px] rounded-full"
                        }`}
                      >
                        {items.btn}
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2 text-lg ml-6 md:ml-[60px] cursor-pointer ">
                      <div>{items.aIcons}</div>
                      <div>{items.auth}</div>
                    </div>
                  </article>
                );
              })}
            </div>
          </nav>

          <section className="my-8 px-6 md:container md:mx-auto md:ml-[250px] lg:px-16">
            <div className="max-w-full h-[500px] md:h-[450px] rounded-2xl">
              {officialTrailer && (
                <iframe
                  key={officialTrailer.id}
                  width="500"
                  height="315"
                  src={`https://www.youtube.com/embed/${officialTrailer.key}`}
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full rounded-2xl "
                ></iframe>
              )}
            </div>
            <div className="mx-auto max-w-[1120px] mt-6 ">
              <div className="lg:flex lg:items-center gap-3">
                <ul className="sm:flex sm:justify-start sm:items-center gap-5 sm:list-disc sm:gap-8">
                  <li
                    className="list-none text-[16px] sm:text-[17px]"
                    data-testid="movie-title"
                  >
                    {data.title}
                  </li>
                  <div className="flex justify-start items-center text-[16px] gap-5 mt-2 sm:mt-0 sm:gap-8 sm:text-[17px] ">
                    <li data-testid="movie-release-date">
                      {data.release_date}
                    </li>
                    <li data-testid="movie-runtime">{movieFormatedTime}</li>
                  </div>
                </ul>
                <div>
                  <ul className="flex items-center gap-2 mt-4 lg:mt-0">
                    {data.genres.map((item) => {
                      return (
                        <li
                          key={item.id}
                          className="text-red-600 border border-red-50 px-3 py-[2px] rounded-full text-[13px] "
                        >
                          {item.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="mt-6 text-[15px] sm:text-[16px]">
                <p data-testid="movie-overview">{data.overview}</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;
