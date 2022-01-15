import React, { useEffect } from "react";

function SpotifyPlayer() {
  window.onSpotifyWebPlaybackSDKReady = () => {
    // this access token expires in an hour, will implemenmt o auth later
    // TODO: implement oauth

    const token =
      "BQCGi4L11D9m0FnGL6kp9TZn83yuBPMtV4n5JrKfqjLKoxz8MPt_SsBOpKQiHrFA10G1OlDGsJ7-HqnlfacKdcKda5mR34aypdy6iM678h6UewMw2874UswhRCyQcGPT8XF8IGpgv_4gnkS6phahg39ny6-EgRPtj6BHjdilCXACm_PCPgmCwME";
    const player = new window.Spotify.Player({
      name: "Web Playback SDK Quick Start Player",
      getOAuthToken: (cb) => {
        cb(token);
      },
      volume: 0.5,
    });

    player.addListener("initialization_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("authentication_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("account_error", ({ message }) => {
      console.error(message);
    });

    player.connect();

    document.getElementById("togglePlay").onclick = function () {
      player.togglePlay();
    };
  };
  return (
    <div>
      <div>spotify playback will be here</div>
      <button id="togglePlay">Toggle Play</button>
    </div>
  );
}

export default SpotifyPlayer;
