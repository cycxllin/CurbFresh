import React from "react";
import "./searchbar.styles.css";
const SearchBar = ({ placeholder, handleInput }) => (
  
  <div class="container" id="SEARCH">
    <div class="search-container" tabindex="1">
        <input id="input"
          className="search"
          type="text"
          placeholder={placeholder}
          onChange={handleInput}
        /><a class='button'>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
    </svg>
      </a>
    </div>
  </div>
);

export default SearchBar;