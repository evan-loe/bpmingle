class spotifyAPI {
  constructor({ device_id, access_token }) {
    this.spotifyBaseURL = "https://api.spotify.com/v1/me";
    this.device_id = device_id;
    this.access_token = access_token;
  }

  async addToQueue(uri) {
    fetch(`${this.spotifyBaseURL}/queue`, {
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
    return this;
  }

  play(uris = []) {
    return new Promise((resolve, reject) => {
      console.log("Put request to play ", uris);
      fetch(
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
      )
        .then((response) => {
          console.log(response);
          resolve();
        })
        .catch((err) => {
          reject(new Error(`Oops, couldn't start playing track ${err}`));
        });
    });
  }
}

export default spotifyAPI;
