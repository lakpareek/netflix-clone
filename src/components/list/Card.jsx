import { useState, useEffect, useRef } from "react";
import "../../App.css"; // Assuming you have a CSS file for additional styling
import DetailCard from "./DetailCard";
import { PlayButtonTwo, MovieDetails, AddToQ } from "../../utils/icons";

function Card(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const detailBoxRef = useRef();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDetailsClose = () => {
    setDetailsVisible(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (detailBoxRef.current && !detailBoxRef.current.contains(e.target)) {
        setDetailsVisible(false);
      }
    };

    if (detailsVisible) {
      document.addEventListener("mousedown", handler);
    } else {
      document.removeEventListener("mousedown", handler);
    }

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [detailsVisible]);

  return (
    <div>
      <div
        className="bg-green-300 relative transition-transform z-10 w-[13.75vw] h-[7.70vw] hover:scale-x-[1.3] rounded-sm hover:scale-y-[1.3] hover:z-30 md:rounded-md hover:bg-slate-500"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="md:rounded-md rounded-sm"
          src={props.moviePoster}
          alt=""
        />
        <div className={isHovered ? "absolute bottom-0 p-[2%]" : "hidden"}>
          <p className="text-white text-[1vw] font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {props.movieTitle}
          </p>
          <div className="flex gap-[2%]">
            <button>
              <PlayButtonTwo />
            </button>
            <button onClick={() => setDetailsVisible(true)}>
              <MovieDetails />
            </button>
            <button>
              <AddToQ />
            </button>
          </div>
        </div>
      </div>
      <DetailCard
        movieName={props.movieTitle}
        moviePoster={props.moviePoster}
        movieDescription={props.movieDescription}
        genreIDs={props.genre}
        ref={detailBoxRef}
        open={detailsVisible}
        onClose={handleDetailsClose}
      />
    </div>
  );
}

export default Card;
