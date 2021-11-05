import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import loader from "./assets/oval.svg";
import clearButton from "./assets/close.svg";
import Gif from "./components/Gif";

function App() {
  const [loading, setLoading] = useState(false);
  const [gifLoading, setGifLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [hintText, setHintText] = useState("");
  const [gifs, setGifs] = useState([]);
  const textInput = useRef(null);

  function randomChoice(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  async function fetchGifs() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${searchText}&limit=50&offset=0&rating=PG-13&lang=en`
      ).then((r) => r.json());
      if (!response.data.length) {
        setHintText(`Nothing found for ${searchText}`);
        throw new Error(`Nothing found for ${searchText}`);
      }
      const randomGif = randomChoice(response.data);
      setHintText(`Hit enter to see more ${searchText}`);
      setGifs((gifs) => [...gifs, randomGif]);
      setGifLoading(true);
    } catch (error) {
      setHintText(`Nothing found for ${searchText}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function listener(event) {
    if (
      searchText.length > 1 &&
      !gifLoading &&
      !loading &&
      (event.code === "Enter" || event.code === "NumpadEnter")
    ) {
      event.preventDefault();
      fetchGifs();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  function handleChange(event) {
    const { value } = event.target;
    setSearchText(value);
    setHintText(value.length > 1 ? `Hit enter to search ${value}` : "");
  }

  function clearSearch(event) {
    event.preventDefault();
    setSearchText("");
    setHintText("");
    setGifs([]);
    textInput.current.focus();
  }

  return (
    <div className="main-page">
      <div className="top">
        {gifs.length > 0 && !loading && !gifLoading ? (
          <img
            className="clear-button"
            src={clearButton}
            onClick={clearSearch}
            alt="Clear Search Buttom"
          />
        ) : (
          <h1 className="title">Jiffy</h1>
        )}
      </div>

      <div className="middle grid">
        <input
          className="search-input"
          placeholder="Type something"
          value={searchText}
          onChange={handleChange}
          type="text"
          ref={textInput}
        />
        {!gifLoading
          ? gifs.map((gif, index) => {
              return <Gif {...gif} key={index} />;
            })
          : gifs.map((gif, index) => {
              if (index === gifs.length - 1) {
                return (
                  <Gif
                    {...gif}
                    key={index}
                    gifLoaded={() => {
                      setGifLoading(false);
                    }}
                  />
                );
              }
              return <Gif {...gif} key={index} />;
            })}
      </div>

      <div className="indicators">
        {loading || gifLoading ? (
          <img className="spinner mx-auto" src={loader} alt="loading spinner" />
        ) : (
          hintText
        )}
      </div>
    </div>
  );
}

export default App;
