import "./App.css";
import loader from "./assets/oval.svg";
import clearButton from "./assets/close.svg";

function App() {
  return (
    <div className="main-page">
      <div className="top">
        <h1 className="title">Jiffy</h1>
        <a href="/" className="search-clear">
          <img src={clearButton} alt="close button" />
        </a>
      </div>

      <div className="middle">
        <input className="search-input" placeholder="Type something" />
        <div className="videos"></div>
      </div>

      <div className="indicators">
        <img className="spinner" src={loader} alt="loading spinner" />
        <span className="search-hint">Hit enter to search</span>
      </div>
    </div>
  );
}

export default App;
