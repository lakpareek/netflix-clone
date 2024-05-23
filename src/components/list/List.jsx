import "../../App.css";
import Card from "./Card.jsx";
import { SlideArrowLeft, SlideArrowRight } from "../../utils/icons";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

function List(props) {

  const [scrollCount, setScrollCount] = useState(0);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    async function getListItems() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?certification=IN&include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=` +
          props.listgenre,
        {
          headers: {
            accept: "application/json",
            Authorization:
            `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      );


      setListData(res.data.results);

    }
    getListItems();
  }, []);

  const myRef = useRef(null);
  const propname = props.listtype;
  const executeForwardScroll = () => {
    const vwPixelValue = window.innerWidth / 100;
    const scrollLeftValue = 100 * (scrollCount + 1) * vwPixelValue;

    myRef.current.scroll({
      top: 0,
      left: scrollLeftValue,
      behavior: "smooth",
    });
    setScrollCount((prevCount) => prevCount + 1);

  };

  function executeBackwardScroll() {
    const vwPixelValue = window.innerWidth / 100;
    const scrollLeftValue = 100 * (scrollCount - 1) * vwPixelValue;

    myRef.current.scroll({
      top: 0,
      left: scrollLeftValue,
      behavior: "smooth",
    });

    setScrollCount((prevCount) => prevCount - 1);

  }
  return (
    <div className="relative">
      <h2 className="text-white  pl-[4%] text-[1.5vw] font-bold">
        {props.listname}
      </h2>
      <div
        ref={myRef}
        className="pt-[1.2vw] h-[11vw] flex gap-[0.4%] pl-[4%] no-scrollbar overflow-y-visible overflow-x-hidden"
      >
        {listData.map((listItem) => {
          return (
            <Card
              key = {listItem.id}
              movieDescription={listItem.overview}
              genre={[listItem.genre_ids[0], listItem.genre_ids[1]]}
              movieTitle={listItem.original_title}
              moviePoster={
                "https://image.tmdb.org/t/p/w500/" + listItem.backdrop_path
              }
            />
          );
        })}
        <button
          className="bg-black bg-opacity-50 absolute w-[4vw] h-[7.75vw] right-0 top-[3.425vw] z-20"
          onClick={executeForwardScroll}
        >
          <div className="float-right">
            <SlideArrowRight />
          </div>
        </button>
        <button
          className={
            scrollCount > 0
              ? "bg-black bg-opacity-50 absolute w-[4vw] h-[7.75vw] left-0 top-[3.425vw] z-20"
              : "hidden"
          }
          onClick={executeBackwardScroll}
        >
          <SlideArrowLeft />
        </button>
      </div>
    </div>
  );
}

export default List;
