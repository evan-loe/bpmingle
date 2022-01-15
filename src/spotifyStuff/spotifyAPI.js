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
      });
    };
  }

  async authenticate() {
    // TODO: do some auth crap
    return "BQCGi4L11D9m0FnGL6kp9TZn83yuBPMtV4n5JrKfqjLKoxz8MPt_SsBOpKQiHrFA10G1OlDGsJ7-HqnlfacKdcKda5mR34aypdy6iM678h6UewMw2874UswhRCyQcGPT8XF8IGpgv_4gnkS6phahg39ny6-EgRPtj6BHjdilCXACm_PCPgmCwME";
  }

  async addToQueue() {}
}
