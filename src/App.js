import React, { useState, useEffect } from "react";
import "./App.css";
import loader from "./assets/oval.svg";
import clearButton from "./assets/close.svg";

function App() {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [hintText, setHintText] = useState("");
  const [gifs, setGifs] = useState([]);

  function randomChoice(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  useEffect(() => {
    async function fetchGifs() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${searchText}&limit=50&offset=0&rating=PG-13&lang=en`
        ).then((r) => r.json());
        console.log("RESPONSE", response);
        if (!response.data.length) {
          setHintText(`Nothing found for ${searchText}`);
          throw new Error(`Nothing found for ${searchText}`);
        }
        const oneGif = randomChoice(response.data);
        setGifs((gifs) => [...gifs, oneGif]);
        setHintText(`Hit enter to see more ${searchText}`);
      } catch (error) {
        setHintText(`Nothing found for ${searchText}`);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    function listener(event) {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        fetchGifs();
      }
    }
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [searchText]);

  function handleChange(event) {
    const { value } = event.target;
    setSearchText(value);
    setHintText(value.length > 2 ? `Hit enter to search ${value}` : "");
  }

  return (
    <div className="main-page">
      <div className="top">
        <h1 className="title">Jiffy</h1>
        <a href="/" className="search-clear">
          <img src={clearButton} alt="close button" />
        </a>
      </div>

      <div className="middle">
        <input
          className="search-input"
          placeholder="Type something"
          value={searchText}
          onChange={handleChange}
        />
        <div className="videos"></div>
      </div>

      <div className="indicators">
        {loading ? (
          <img className="spinner" src={loader} alt="loading spinner" />
        ) : (
          hintText
        )}
      </div>
    </div>
  );
}

export default App;
