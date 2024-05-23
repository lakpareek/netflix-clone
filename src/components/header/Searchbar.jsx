import { useRef } from "react";
import { SearchGlass } from "../../utils/icons";
import "../../App.css";
import React, { useState, useEffect } from "react";

export default function Searchbar() {
  const [searchBoxOpen, setsearchBoxOpen] = useState(false);
  const selectSearchBox = useRef(null);
  function changeSearchboxState() {
    if (searchBoxOpen) {
      setsearchBoxOpen(false);
    } else {
      setsearchBoxOpen(true);
    }
  }
  useEffect(() => {
    if (searchBoxOpen) {
      selectSearchBox.current.focus();
    }
  }, [searchBoxOpen]);
  const searchBoxRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setsearchBoxOpen(false);
      }
    };

    if (searchBoxOpen) {
      document.addEventListener("mousedown", handler);
    } else {
      document.removeEventListener("mousedown", handler);
    }

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [searchBoxOpen]);
  return (
    <div
      ref={searchBoxRef}
      className={`flex justify-center items-center space-x-2 ${
        searchBoxOpen
          ? "pl-2 pr-6 pt-4 pb-4 h-[30px] bg-black border-white border-[1px] hover:transform hover:duration-200"
          : ""
      } `}
    >
      <SearchGlass onclick={changeSearchboxState} />
      <textarea
        ref={selectSearchBox}
        id="searchTextBox"
        style={{ resize: "none", color: "#fff", outline: "none" }}
        className={`h-[24px] bg-black items-center ${
          searchBoxOpen ? "flex" : "hidden"
        }`}
        placeholder="Titles, peoples, genres"
        name=""
        cols="20"
        rows="1.5"
      ></textarea>
    </div>
  );
}
