import { useEffect, useState, useRef } from "react";
import "../../App.css";
import "../../utils/icons";
import { PlayButtonOne, MoreInfo } from "../../utils/icons";
import DetailCard from "../list/DetailCard";
import axios from "axios";

function Hero() {
  const [bannerInfo, setBannerInfo] = useState({
    bannerPosterLink: "",
    bannerMovieName: "Movie name",
    bannerMovieOverview: "",
    bannerMovieGenres: [],
  });
  useEffect(() => {
    async function testin() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
        {
          headers: {
            accept: "application/json",
            Authorization:
            `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      );
      const bannerData = res.data.results[Math.floor(Math.random() * 20)];

      const overview =
        bannerData.overview.length <= 260
          ? bannerData.overview
          : bannerData.overview.slice(0, 260) + "...";
      setBannerInfo({
        bannerPosterLink:
          "https://image.tmdb.org/t/p/original/" + bannerData.backdrop_path,
        bannerMovieName: bannerData.original_title,
        bannerMovieOverview: overview,
        bannerMovieOverviewUncut: bannerData.overview,
        bannerMovieGenres: [bannerData.genre_ids[0], bannerData.genre_ids[1]],
      });
    }
    testin();
  }, []);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const detailBoxRef = useRef();
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
    <div className="h-[43vw]">
      <div>
      <div className="image-container">
  <img
    className="w-[100%]"
    src={bannerInfo.bannerPosterLink}
    alt="movie-poster"
  />
  <div className="image-overlay"></div>
</div>
        <div className="text-white absolute top-[13vw] p-[4%]">
          <h2 className="text-[4vw] text-shadow-sm shadow-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {bannerInfo.bannerMovieName}
          </h2>
          <p className="w-[32vw] text-[1.2vw] text-shadow-sm shadow-black">
            {bannerInfo.bannerMovieOverview}
          </p>
          <div className="flex space-x-[0.8vw] pt-[1.2vw]">
            <button className="hover:bg-opacity-80 w-[8.33vw] h-[3.06vw] bg-white text-black rounded-sm sm:rounded-md flex items-center justify-center space-x-[0.8vw] font-bold text-[1.3vw]">
              <PlayButtonOne />
              <p>Play</p>
            </button>
            <button
              onClick={() => setDetailsVisible(true)}
              className="hover:bg-opacity-50 w-[11.25vw] h-[3.06vw] bg-[#6D6D6D] bg-opacity-75 rounded-sm sm:rounded-md flex items-center justify-center space-x-[0.8vw] font-bold text-[1.3vw]"
            >
              <MoreInfo />
              <p>More Info</p>
            </button>
          </div>
        </div>
        <div className="absolute top-[30vw] -right-0 flex justify-center items-center w-[5.7vw] h-[2.4vw] bg-black opacity-60 border-l-4">
          <p className="text-white text-[1vw]">PG-13</p>
        </div>
      </div>
      <DetailCard
        movieName={bannerInfo.bannerMovieName}
        moviePoster={bannerInfo.bannerPosterLink}
        movieDescription={bannerInfo.bannerMovieOverviewUncut}
        genreIDs={bannerInfo.bannerMovieGenres}
        ref={detailBoxRef}
        open={detailsVisible}
        onClose={handleDetailsClose}
      />
    </div>
  );
}

export default Hero;
