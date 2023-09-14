import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Hero from "../hero/Hero";
import Card from "../card/Card";
import Footer from "../footer/Footer";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]); // Define state for search results

  return (
    <div>
      <Navbar setSearchResults={setSearchResults} /> {/* Pass search results as prop */}
      <Hero />
      <Card searchResults={searchResults} />
      <Footer />
    </div>
  );
};

export default Home;
