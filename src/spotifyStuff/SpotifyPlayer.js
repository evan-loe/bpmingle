import React, { Component } from "react";
import spotifyAPI from "./spotifyAPI";
import styles from "./assets/SpotifyPlayer.module.css";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import querystring from "query-string";

const client_id = "81aba320a1ad4c94b67b09675dec5622";
// const client_secret = process.env.SPOTIFY_SECRET;

class SpotifyPlayer extends Component {
  state = {
    access_token: null,
    player: null,
    device_id: null,
    status: "NOT_LOADED",
    api: null,
    volume: 50,
    sdkLoaded: false,
    currentSong: {},
  };

  // pass in genre prop
  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
    this.volumeSlider = this.volumeSlider.bind(this);
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

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  async componentDidMount() {
    const params = this.getHashParams();
    console.log(params);
    if (!params.access_token || !params.refresh_token) return;
    else if (!window.onSpotifyWebPlaybackSDKReady) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        this.setState({ sdkLoaded: true });
        if (params.access_token && params.refresh_token) {
          this.setState({ refresh_token: params.refresh_token });
          this.initializePlayer(params.access_token);
        }
      };
    }
    await this.loadSpotifySDK();
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log("Component Updating", this.state);
  }

  async componentWillUnmount() {
    console.log("disconnecting spotify");
    this.state.player.disconnect();
  }

  async authenticate() {
    const redirect_uri = "http://localhost:3001/api/callback";
    let url = "https://accounts.spotify.com/authorize?";
    url += "client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=streaming user-modify-playback-state";
    window.location.href = url; // redirect user
  }

  initializePlayer = async (access_token) => {
    console.log("intializing player");
    this.setState({ status: "INITIALIZING" });
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

    player.addListener(
      "player_state_changed",
      ({ paused, track_window: { current_track, next_tracks } }) => {
        if (paused) this.setState({ currentSong: {} });
        else {
          this.setState({
            currentSong: {
              name: current_track.name,
              album: current_track.album.name,
              albumArt: current_track.album.images[0].url,
              artists: current_track.artists.map((artist) => {
                return artist.name;
              }),
            },
          });
        }
      }
    );
  };

  async togglePlay() {
    this.state.player.activateElement();
    if (this.state.status !== "READY") {
      console.log("Spotify not done loading yet!");
      return;
    }
    const songs = await this.state.api.getGenreSongs(this.props.genre);
    console.log(songs);
    this.state.api.play(songs).catch((err) => {
      console.log(err);
    });
    // request songs
  }

  volumeSlider(event) {
    this.setState({ volume: event.target.value });
    this.state.player.setVolume(event.target.value / 100).then(() => {
      console.log(`Volume set to ${event.target.value}`);
    });
  }

  render() {
    return (
      <div>
        <div className={styles.spotifyContainer}>
          <div className={styles.inputContainer}>
            <button
              id="togglePlay"
              onClick={this.togglePlay}
              disabled={this.state.status !== "READY"}
            >
              Toggle Play
            </button>
            <button id="loginSpotify" onClick={this.authenticate}>
              Login to Spotify
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={this.state.volume}
              className={styles.slider}
              onChange={this.volumeSlider}
              list="volumeLabel"
            />
          </div>

          <div className={styles.songDetails}>
            <img
              src={
                this.state.currentSong.albumArt ??
                require("./assets/eigthnotes.jpg")
              }
              alt="album cover art"
              width={window.innerWidth * 0.2}
              height={window.innerWidth * 0.2}
            ></img>
            <div className={styles.songTitle}>
              {this.state.currentSong.name ?? "No song currently playing"}
            </div>
            <div className={styles.songAlbum}>
              {this.state.currentSong.album ?? "no album"}
            </div>
            <div className={styles.songArtists}>
              {(this.state.currentSong.artists ?? ["no artist"]).join(", ")}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpotifyPlayer;
