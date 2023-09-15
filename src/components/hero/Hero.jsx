
import useFetch from "../hooks/UseFetch";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const Hero = () => {
  const { data } = useFetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=da9f55641078b533ef66073064c85666"
  );

  const heroData = data?.slice(0, 5) || [];

  const renderSlides = heroData.map((item) => (
    <div
      key={item.id}
      className="text-white relative"
    >
      <div className="max-w-full ma-h-[630px] md:h-[630px]">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt=""
          className="max-w-full object-center"
        />
      </div>
      <div className="max-w-[450px] text-left  mx-8 absolute top-[150px] md:top-[180px] xl:mx-28">
        <div>
          <h1 className="text-[24px] w-[280px] sm:text-[40px] md:w-[500px] sm:font-medium">{item.title}</h1>
          <div>
          <div className="flex items-center mt-2 gap-[50px]">
                    <div className="flex gap-1.5 items-center mt-3">
                      <img
                        src="/images/imdb.png"
                        alt=""
                        className="w-8 h-4"
                      />
                      <p className="text-[13px]">{item.popularity}</p>
                    </div>
                    <div className="flex gap-1.5 items-center mt-3">
                      <img
                        src="/images/rtimg.png"
                        alt=""
                        className="w-4 h-4"
                      />
                      <p className="text-[13px]">
                        {item.vote_count}
                      </p>
                    </div>
                  </div>
          </div>
          <p className="mt-4 leading-7 sm:text-[18px] sm:mt-6">{item.overview}</p>
        </div>
        <button className="flex items-center mt-[45px] bg-red-700 rounded-lg p-[10px] px-4 text-[14px] uppercase sm:text-[15px] sm:px-4">
          <PlayCircleOutlineIcon />
          <span className="ml-2">Watch Trailer</span>
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      <Carousel
        showArrows={false}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        interval={6000}
        showStatus={false}
        transitionTime={1000}
      >
        {renderSlides}
      </Carousel>
    </div>
  );
};

export default Hero;
