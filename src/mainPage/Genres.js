import React from 'react'
import styles from "./Genres.css";

function Genres() {
    return (
        <div className="wrapper">
            <Box img={require('./images/jazz.jpg')}
                    title="Jazz">
            </Box>

            <Box img={require('./images/classical.jpg')}
                    title="Classical">
            </Box>

            <Box img={require('./images/indie-pop.jpg')}
                    title="Indie-pop">
            </Box>

            <Box img={require('./images/hip-hop.jpg')}
                    title="Hip-hop">
            </Box>
        </div>
    )
}

function Box(props){
    return (
        <div className = "box">
            <img className="cardImg" src={props.img}></img>
            <h2 className="title">{props.title}</h2>
            <button className="boxButton">test button</button>
        </div>

    )
}
export default Genres
