import "./App.css";
import loader from "./assets/oval.svg";
import clearButton from "./assets/close.svg";

function App() {
  return (
    <div className="main-page">
      <div class="top">
        <h1 class="title">Jiffy</h1>
        <a href="/" class="search-clear">
          <img src={clearButton} alt="close button" />
        </a>
      </div>

      <div class="middle">
        <input class="search-input" placeholder="Type something" />
        <div class="videos"></div>
      </div>

      <div class="indicators">
        <img class="spinner" src={loader} alt="loading spinner" />
        <span class="search-hint">Hit enter to search</span>
      </div>
    </div>
  );
}

export default App;
