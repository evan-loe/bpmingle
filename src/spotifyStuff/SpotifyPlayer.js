import React, { Component } from "react";
import spotifyAPI from "./spotifyAPI";
import styles from "./assets/SpotifyPlayer.module.css";

class SpotifyPlayer extends Component {
  state = {
    access_token: null,
    player: null,
    device_id: null,
    status: "NOT_LOADED",
    api: null,
    volume: 50,
  };

  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
  }

  loadSpotifySDK() {
    console.log("loading spotify sdk now");
    return new Promise((resolve, reject) => {
      const script = document.getElementById("spotifyPlayer");
      if (!script) {
        const newScript = document.createElement("script");

        newScript.id = "spotifyPlayer";
        newScript.tabIndex = "text/javascript";
        newScript.src = "https://sdk.scdn.co/spotify-player.js";
        newScript.onload = () => resolve();
        newScript.onerror = (error) =>
          reject(new Error(`Couldn't load Spotify script ${error}`));
        document.head.appendChild(newScript);
      } else {
        resolve();
      }
    });
  }

  async componentDidMount() {
    if (!window.onSpotifyWebPlaybackSDKReady) {
      window.onSpotifyWebPlaybackSDKReady = this.initializePlayer;
    } else {
      this.initializePlayer();
    }
    await this.loadSpotifySDK();
  }

  async componentDidUpdate() {
    console.log("Component Updating", this.state);
  }

  async componentWillUnmount() {
    console.log("disconnecting spotify");
    this.state.player.disconnect();
  }

  async authenticate() {
    return "BQDEk2nULAGkfInAfE9xlQzS_btJd8RWe20edhjic3HJ_XxeRHvcL67TQjCtWnEaLM02IVp8h0IhgQkhIQmjjKSVK7yUSiZjn5JJjU4RV-WTTyWYTljhq8c6dQ_lD69_PhF58J_ZteAxG6FfhBTGwtL4WiSzFZAJ1oUvxST1ylEWdHfJhe4YdBo";
  }

  initializePlayer = async () => {
    console.log("intializing player");
    this.setState({ status: "INITIALIZING" });
    await this.authenticate().then((access_token) => {
      console.log("done auth, creating player");
      const player = new window.Spotify.Player({
        name: "BPMingle",
        getOAuthToken: (callback) => {
          callback(access_token);
        },
      });

      player.connect().then((success) => {
        if (success) {
          console.log("The web playback SDK is workiunnnn");
        }
      });

      player.addListener("ready", ({ device_id }) => {
        console.log(device_id);
        const api = new spotifyAPI({ device_id, access_token });

        this.setState({
          access_token: access_token,
          player: player,
          device_id: device_id,
          status: "READY",
          api: api,
        });
      });
    });
  };

  togglePlay() {
    if (this.state.status !== "READY") {
      console.log("Spotify not done loading yet!");
      return;
    }
    this.state.api
      .play(["spotify:track:1aRgsJJJMIAaZgiOtGRMl0"])
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div>spotify playback will be here</div>
        <button
          id="togglePlay"
          onClick={this.togglePlay}
          disabled={this.state.status !== "READY"}
        >
          Toggle Play
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={this.state.volume}
          className={styles.slider}
        ></input>
      </div>
    );
  }
}

export default SpotifyPlayer;
