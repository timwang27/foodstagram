import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import "./../App.css";

function SearchPage() {
  return (
    <div style={{ backgrondColor: "#FFFCF3" }}>
      <NavBar searchbar={false} />
      <div
        style={{
          display: "block",
          position: "absolute",
          left: "50%",
          right: "50%",
          bottom: "50%",
        }}
      >
        <h1
          id="Logo"
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          Foodstagram
        </h1>
        <Link to="/result" style={{ textDecoration: "None" }}>
          <SearchBar focus={false} />
        </Link>
      </div>
    </div>
  );
}

export default SearchPage;
