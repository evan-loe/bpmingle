import React, { Component } from "react";
import spotifyAPI from "./spotifyAPI";
import styles from "./assets/SpotifyPlayer.module.css";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
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
    playing: false,
    songDuration: 0,
  };

  // pass in genre prop
  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
    this.volumeSlider = this.volumeSlider.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.prevSong = this.prevSong.bind(this);
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
              // songDuration:
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
    this.setState({ playing: !this.state.playing });
    // request songs
  }

  nextSong() {
    if (this.state.status !== "READY") {
      console.log("Spotify not done loading yet!");
      return;
    }
    this.state.player.nextTrack().then(() => {
      console.log("Skipped to next song!");
    });
  }

  prevSong() {
    if (this.state.status !== "READY") {
      console.log("Spotify not done loading yet!");
      return;
    }
    this.state.player.nextTrack().then(() => {
      console.log("Skipped to next song!");
    });
  }

  volumeSlider(event) {
    this.setState({ volume: event.target.value });
    this.state.player.setVolume(event.target.value / 100).then(() => {
      console.log(`Volume set to ${event.target.value}`);
    });
  }

  formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 60) / 60);
    return (
      (hours ? `${hours}` : "") +
      `${minutes}:${Math.floor(seconds - hours * 60 - minutes * 60)}`
    );
  }

  render() {
    return (
      <div>
        <div className={styles.spotifyContainer}>
          <div className={styles.songDetailsContainer}>
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
          <div className={styles.inputContainer}>
            <button
              id="prevSong"
              className={styles.playButton}
              onClick={this.prevSong}
              disabled={this.state.status !== "READY"}
            >
              <FontAwesomeIcon icon={faStepBackward}></FontAwesomeIcon>
            </button>
            <button
              id="togglePlay"
              className={styles.playButton}
              onClick={this.togglePlay}
              disabled={this.state.status !== "READY"}
            >
              {this.state.playing ? (
                <FontAwesomeIcon icon={faPause}></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
              )}
            </button>
            <button
              id="nextSong"
              className={styles.playButton}
              onClick={this.nextSong}
              disabled={this.state.status !== "READY"}
            >
              <FontAwesomeIcon icon={faStepForward}></FontAwesomeIcon>
            </button>
            <div className={styles.slideContainer}>
              <input
                type="range"
                min="0"
                max="100"
                value={this.state.volume}
                className={styles.seeker}
                onChange={this.volumeSlider}
              />
              <div className={styles.labelContainer}>
                <div>0:00</div>
                <div>{this.formatDuration(this.state.songDuration)}</div>
              </div>
            </div>
            <button
              id="loginSpotify"
              className={styles.loginSpotifyBtn}
              onClick={this.authenticate}
            >
              <FontAwesomeIcon
                icon={faSpotify}
                className={styles.icon}
              ></FontAwesomeIcon>
              Login to Spotify
            </button>

            <div className={styles.slideContainer}>
              <input
                type="range"
                min="0"
                max="100"
                value={this.state.volume}
                className={styles.slider}
                onChange={this.volumeSlider}
              />
              <div className={styles.labelContainer}>
                <div>0%</div>
                <div>volume</div>
                <div>100%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpotifyPlayer;
