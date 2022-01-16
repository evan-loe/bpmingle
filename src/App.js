import Main from "./mainPage/Main";
import SpotifyPlayer from "./spotifyStuff/SpotifyPlayer";
import chatBox from "./chatBox/chatBox";

function App() {
  return (
    <div className="App">
      <div>
        Hi hi! we'll insert components here (like mini widgets) in this app.js
        file to add elements on this page
      </div>
      {/* TODO: remove this header thing and add our main page component here. We also probably need to decide what states needs to be lifted up to this level*/}
      <SpotifyPlayer></SpotifyPlayer>
      <div className="mainPage">
        <Main></Main>
      </div>
      <div className="chatBox">{chatBox()}</div>
    </div>
  );
}

export default App;
