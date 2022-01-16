import React from 'react'
import myVideo from "./vid.mp4"
import styles from "./Main.css"

function Main() {
    return (
        <div>
            <div className = "show">
                <header>
                    <h2 className = "logo">BPMingle</h2>
                    <div className = "toggle"></div>
                </header>

                <video muted loop autoplay>
                    <source src = {myVideo} type = "video/mp4"/>
                </video> 

                <div className = "overlay"></div>

                <div className = "text">
                    <h2>Music:</h2>
                    <h3>A Universal Language.</h3>
                    <p>asdfjkla;sdfjaklsd;faj;sdklfjadl;skfja;sdlkfj</p> 
                    <a href = "#">Start Mingling!</a>
                </div>
            </div>

            <div className = "menu">
                <ul>
                    <li><a href= "#">Home</a></li>
                    <li><a href= "#">News</a></li>
                    <li><a href= "#">About</a></li>
                    <li><a href= "#">asdf</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Main
