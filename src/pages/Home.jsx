import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Body from "../components/Body";
import LiveChat from "../components/LiveChat";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Body />
      <LiveChat />
    </>
  );
}

export default Home;
