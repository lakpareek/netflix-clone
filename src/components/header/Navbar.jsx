import {
  NetflixLogo,
  DownArrow,
  NotificationBell,
  DropdownArrow,
} from "../../utils/icons";
import "../../App.css";
import Searchbar from "./Searchbar";
import userProfilePic from "../static/userProfilePic.jpeg";
import React, { useState } from "react";

const browseList = [
  "Home",
  "TV Shows",
  "Movies",
  "New & Popular",
  "My List",
  "Browse by Languages",
];
function Navbar() {
  const [opacity, setOpacity] = useState("bg-opacity-0");
  const changeNavbarColor = () => {
    if (window.scrollY >= 1) {
      setOpacity("bg-opacity-100");
    } else {
      setOpacity("bg-opacity-0");
    }
  };
  window.addEventListener("scroll", changeNavbarColor);
  return (
    <div
      style={{ zIndex: 1000 }}
      className={`bg-black flex items-center h-[41px] lg:h-[70px] justify-between pl-[4%] pr-[4%] ${opacity} shadow-inner fixed top-0 left-0 right-0`}
    >
      <div className="flex items-center space-x-[24px]">
        <NetflixLogo />
        <BrowseMenu />
        <NavMenu />
      </div>
      <div className="flex items-center justify-center space-x-[18px]">
        <Searchbar />
        <NotificationBell />
        <div className="flex items-center space-x-[12px]">
          <img
            className="rounded"
            height="32"
            width="32"
            src={userProfilePic}
            alt="userImage"
          />
          <DownArrow />
        </div>
      </div>
    </div>
  );
}

function NavMenu() {
  return (
    <div className="flex justify-between space-x-5 max-[1024px]:hidden">
      {browseList.map((item, index) => (
        <a key={index} className="text-white text-sm font-thin" href="#">
          {item}
        </a>
      ))}
    </div>
  );
}
function BrowseMenu() {
  const [hidden, setHidden] = useState(true);
  function handleMenuClick() {
    setHidden(!hidden);
  }

  return (
    <a href="#">
      <div className="flex flex-row items-center justify-between space-x-1 z-50">
        <div className="flex items-center justify-center space-x-1 relative lg:hidden">
          <div
            className="flex items-center justify-center space-x-1"
            onClick={handleMenuClick}
          >
            <p className="text-[7px] md:text-[9px] font-semibold text-white">
              Browse
            </p>
            <DropdownArrow />
          </div>

          <div
            className={`dropdownMenu h-[300px] w-[250px] z-50 bg-black opacity-80 absolute border-t-2 top-8 ${
              hidden ? "hidden" : ""
            }`}
          >
            <ul className="flex flex-col justify-center items-center w-[250px]">
              {browseList.map((item, index) => (
                <Dropdown key={index} name={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </a>
  );
}
function Dropdown(props) {
  return (
    <div className="hover:bg-slate-500 w-[250px] flex flex-col justify-center items-center">
      <li className="text-white">

        {props.name}
      </li>
      <br />
    </div>
  );
}

export default Navbar;
