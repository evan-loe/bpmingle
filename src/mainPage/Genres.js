import React from 'react'
import styles from "./Genres.css";

function Genres() {
    return (
        <div className="wrapper">
            <Box img={require('./images/jazz.jpg')}
                    title="Jazz"
                        button="Join!">
            </Box>

            <Box img={require('./images/classical.jpg')}
                    title="Classical"
                        button="Join!">
            </Box>

            <Box img={require('./images/indie-pop.jpg')}
                    title="Indie-pop"
                        button="Join!">
            </Box>

            <Box img={require('./images/hip-hop.jpg')}
                    title="Hip-hop"
                        button="Join!">
            </Box>
        </div>
    )
}

function Box(props){
    return (
        <div className = "box">
            <img className="cardImg" src={props.img}></img>
            <h2 className="title">{props.title}</h2>
            <button className="boxButton">{props.button}</button>
        </div>

    )
}
export default Genres
