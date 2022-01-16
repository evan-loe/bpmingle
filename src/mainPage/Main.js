import React from "react";
import myVideo from "./Videos/vid.mp4";
import styles from "./Main.css";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

function Main() {
  useEffect(() => {
    menuToggle.current.addEventListener("click", clicked);
  }, []);

  const menuToggle = useRef(null);
  const show = useRef(null);

  // lol evan was here

  // const menuToggle = document.getElementById("hi")
  // const show = document.getElementById("bye")

  function clicked() {
    console.log("works great");
    menuToggle.current.classList.toggle("active");
    show.current.classList.toggle("active");
  }

  function onClick() {
    
  }

  return (
    <div>
      <div className="show" ref={show}>
        <header>
          <h2 className="logo">BPMingle</h2>
          <div className="toggle" ref={menuToggle}></div>
        </header>

        <video muted autoplay loop>
          <source src={myVideo} type="video/mp4" ></source>
        </video>

        <div className="overlay"></div>

        <div className="text">
          <h2>Music:</h2>
          <h3>A Universal Language.</h3>
          <p>asdfjkla;sdfjaklsd;faj;sdklfjadl;skfja;sdlkfj</p>

          <Link to="/genres">
            <button>Start button</button>
          </Link>
        </div>
      </div>

      <div className="menu">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">News</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">asdf</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Main;
