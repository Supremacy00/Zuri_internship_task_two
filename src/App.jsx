import MovieDetails from "./components/moviedetails/MovieDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import { useEffect, useState } from "react"; 
import FadeLoader from "react-spinners/FadeLoader";


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); 
    }, 1500); 
    
  }, []);

  return (
    <BrowserRouter>
      <div>
        {isLoading ? ( 
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
