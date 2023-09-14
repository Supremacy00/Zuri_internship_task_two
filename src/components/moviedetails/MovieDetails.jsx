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
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=da9f55641078b533ef66073064c85666`

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
 
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-red-700">
        <FadeLoader color="#FF0000"/>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>The data you are requesting is not available....</div>;
  }

  return (
    <div>
      <section>
        <div className="relative md:flex md:justify-between font-roboto ">
          <nav className="md:fixed top-0 right-0 left-0 rounded-b-[40px] w-full min-h-24 border-b-2  pb-6 md:w-[250px] md:h-screen md:rounded-r-[40px] md:border-r-2">
            <div className="flex justify-start items-center gap-3 md:gap-7 mt-4 mx-6 md:mt-12 md:ml-8">
              <img
                src="/src/assets/tv.png"
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

          <section className="my-8 px-6 md:container md:mx-auto md:ml-[250px] lg:px-20">
            <div className="max-w-full h-[300px] md:h-[350px] rounded-2xl">
              <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={data.title}
                className="w-full h-full rounded-2xl"
              />
            </div>
            <div className="mx-auto max-w-[1000px] mt-4 md:mt-6">
              <ul className="list-disc flex justify-start items-center gap-6 text-[17px] md:text-[19px]">
                <li className="list-none">{data.title}</li>
                <li>{data.release_date}</li>
                <li>{data.vote_count}</li>
              </ul>
              <div className="mt-4 md:mt-6 md:text-lg">
                <p>{data.overview}</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;
