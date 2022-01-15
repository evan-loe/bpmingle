import React from 'react'

function Main() {
    return (
        <div>
            <body>
                <section className = "show">
                    <header>
                        <h2 className = "name">name of our app</h2>
                        <div className = "toggle"></div>
                    </header>

                    <video src={require('./video.mp4')} muted loop autoplay></video>

                    <div className = "overText"></div>

                    <div className = "text">
                        <h2>Music:</h2>
                        <h3>A Universal Language.</h3>
                        <p>asdfjkla;sdfjaklsd;faj;sdklfjadl;skfja;sdlkfj</p> 
                        <a href = "#">Start Mingling!</a>
                    </div>
                </section>

                <div className = "menuBear">
                    <ul>
                        <li><a href= "#">Home</a></li>
                        <li><a href= "#">News</a></li>
                        <li><a href= "#">About</a></li>
                        <li><a href= "#">asdf</a></li>
                    </ul>
                </div>
            </body>
        </div>
    )
}

export default Main
