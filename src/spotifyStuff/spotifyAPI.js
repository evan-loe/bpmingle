const spotifyBaseURL = "https://api.spotify.com/v1/me/";

class spotifyAPI {
  constructor() {
    this.access_token = null;
    this.device_id = null;
  }

  async initialize() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.authenticate().then((access_token) => {
        this.access_token = access_token;
        this.player = new window.Spotify.Player({
          name: "BPMingle",
          getOAuthToken: (callback) => {
            callback(access_token);
          },
        });
        this.player.connect().then((success) => {
          if (success) {
            console.log("The web playback SDK is workiunnnn");
          }
        });
      });
      this.player.addListener("ready", ({ device_id }) => {
        this.device_id = device_id;
      });
    };
  }

  async authenticate() {
    // TODO: do some auth crap
    return "BQCGi4L11D9m0FnGL6kp9TZn83yuBPMtV4n5JrKfqjLKoxz8MPt_SsBOpKQiHrFA10G1OlDGsJ7-HqnlfacKdcKda5mR34aypdy6iM678h6UewMw2874UswhRCyQcGPT8XF8IGpgv_4gnkS6phahg39ny6-EgRPtj6BHjdilCXACm_PCPgmCwME";
  }

  async addToQueue(uri) {
    fetch(`${spotifyBaseURL}/queue`, {
      method: "POST",
      body: JSON.stringify({
        uri: [uri],
        device_id: this.device_id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
    });
  }

  async play(uris = []) {
    await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${this.device_id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          uris: uris,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.access_token}`,
        },
      }
    );
  }
}

export default spotifyAPI;
