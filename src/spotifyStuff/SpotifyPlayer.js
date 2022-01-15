import React, { Component } from "react";

const access_token =
  "BQCGi4L11D9m0FnGL6kp9TZn83yuBPMtV4n5JrKfqjLKoxz8MPt_SsBOpKQiHrFA10G1OlDGsJ7-HqnlfacKdcKda5mR34aypdy6iM678h6UewMw2874UswhRCyQcGPT8XF8IGpgv_4gnkS6phahg39ny6-EgRPtj6BHjdilCXACm_PCPgmCwME";

class SpotifyPlayer extends Component {
  state = {
    player: null,
  };

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      // this access token expires in an hour, will implemenmt o auth later
      // TODO: implement oauth

      const player = new window.Spotify.Player({
        name: "Test lol playing a song",
        getOAuthToken: (callback) => {
          callback(access_token);
        },
      });

      player.connect().then((success) => {
        if (success) {
          console.log("The web playback SDk is workiunnnn");
        }
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("ready to play music");
        console.log("Device ID", device_id);
        fetch(
          `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              uris: ["spotify:track:2JzZzZUQj3Qff7wapcbKjc"],
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
      });
    };
  }

  toggleMusic() {}

  render() {
    return (
      <div>
        <div>spotify playback will be here</div>
        <button id="togglePlay" onClick={this.toggleMusic}>
          Toggle Play
        </button>
      </div>
    );
  }
}

export default SpotifyPlayer;
