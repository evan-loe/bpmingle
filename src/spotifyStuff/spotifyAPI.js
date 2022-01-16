const axios = require("axios");

class spotifyAPI {
  constructor({ device_id, access_token }) {
    this.spotifyBaseURL = "https://api.spotify.com/v1";
    this.device_id = device_id;
    this.access_token = access_token;
  }

  async getGenreSongs(genre) {
    console.log(this.access_token, genre);
    return await axios
      .get(`${this.spotifyBaseURL}/recommendations`, {
        params: {
          seed_genres: genre ?? "r-n-b",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.access_token}`,
        },
      })
      .then((response) => {
        const songs = [];
        console.log(response);
        console.log(response.data.tracks.length);
        for (const track of response.data.tracks) {
          songs.push(track.uri);
        }
        return songs;
      });
  }

  // async addToQueue(uri) {
  //   console.log(uri);
  //   axios.post(`${this.spotifyBaseURL}/me/player/queue`);

  //   axios
  //     .post(
  //       `${this.spotifyBaseURL}/me/player/queue`,
  //       {
  //         uri: uri,
  //         device_id: this.device_id,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${"BQBJZr9xnwo8TbIQU1d7y-Ic1LCMse6x8Ze0xrF__8mHh8k08dMRSHtM3Xg9z5obauuW49gRBFxI7Nl8eT-L54Pm7KlrrQeh38kUBcWBCPmuoZ53Kq425RVpQ5lTLRbooJQH22UPyCD1NF1Ta2nD6FGcn6pCM1Ga8eM72kI"}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.code);
  //     });

  //   return this;
  // }

  play(uris = []) {
    return new Promise((resolve, reject) => {
      console.log("Put request to play ", uris);
      fetch(
        `${this.spotifyBaseURL}/me/player/play?device_id=${this.device_id}`,
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
