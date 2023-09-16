import MovieDetails from "./components/moviedetails/MovieDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import useFetch from "./components/hooks/UseFetch";

function App() {
  const { isLoading } = useFetch;
  const [pageIsLoaded, setPageIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPageIsLoaded(true);
    }, 1500);
  }, []);

  return (
    <BrowserRouter>
      <div>
        {isLoading || !pageIsLoaded ? (
          <div className="flex justify-center items-center h-screen text-red-700">
            <FadeLoader color="#FF0000" />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="moviedetails/:id" element={<MovieDetails />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
