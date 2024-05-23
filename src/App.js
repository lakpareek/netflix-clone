import logo from "./logo.svg";
import "./App.css";
import "./components/header/Navbar.jsx";
import Navbar from "./components/header/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
import List from "./components/list/List.jsx";

import axios from "axios";
import { useEffect } from "react";

function App() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <div className="flex flex-col space-y-[50px]">
        <List listgenre = "" listname = "Trending Now"/> 
        <List listgenre = "35" listname = "Comedy"/>
        <List listgenre = "878" listname = "Sci-Fi"/>
        <List listgenre = "16" listname = "Animations"/>
        <List listgenre = "80" listname = "Crime"/>
        <List listgenre = "37" listname = "Certified Hood Classics"/>
      </div>
    </div>
  );
}

export default App;
