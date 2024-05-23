import React, { forwardRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { PlayButtonOne, Like, dislike, Cross } from "../../utils/icons";
import "../../App.css";
import genres from "../../utils/Genres";

const DetailCard = forwardRef(
  (
    { open, onClose, genreIDs, movieDescription, moviePoster, movieName },
    ref
  ) => {
    if (!open) return null;
    const movieGenres = [];
    genreIDs.forEach((genreId) => {
      const mygenre = genres.find((genre) => genre.id === genreId);
      if (mygenre) {
        movieGenres.push(mygenre.name);
      }
    });

    return ReactDOM.createPortal(
      <div
        style={{ zIndex: 10000 }}
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
      >
        <div ref={ref} className="bg-black w-[45vw] h-[100%] shadow-lg">
          <div className="relative">
            <img style={{ width: "45vw" }} src={moviePoster} alt="" />
            <button className=" absolute top-1 left-2" onClick={onClose}>
              <Cross />
            </button>
            <div className="text-white w-[30vw] absolute top-[10vw] left-2">
              <h2 className="md:text-3xl text-xs text-shadow-sm shadow-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-left font-semibold">
                {movieName}
              </h2>
              <div className="pt-[1vw]">
                <button className="hover:bg-opacity-80 w-[8.33vw] h-[3.06vw] bg-white text-black rounded-sm sm:rounded-md flex items-center justify-center space-x-[0.8vw] font-bold text-[1.3vw]">
                  <PlayButtonOne />
                  <p>Play</p>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-[5vw] justify-center p-[2%] text-white">
              <div className="w-[25vw]">
                <p className="text-left">{movieDescription}</p>
              </div>

              <div className="flex justify-center items-center">
                <p>Genres: {movieGenres.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("portal")
    );
  }
);

export default DetailCard;
