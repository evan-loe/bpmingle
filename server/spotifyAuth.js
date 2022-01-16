const express = require("express");
const router = express.Router();
const { generateRandomString } = require("./utils/utils");
const querystring = require("query-string");
const path = require("path");
const config = require("dotenv").config(path.join(__dirname, "/.env"));
console.log("loading dotenv", config);

const client_id = "81aba320a1ad4c94b67b09675dec5622";
const client_secret = process.env.SPOTIFY_SECRET;

router.get("/login", (req, res) => {
  const state = generateRandomString(16);
  const scope = "streaming";

  const redirect_uri = req.baseUrl + "/api/callback";
  console.log(redirect_uri);

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

router.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  const redirect_uri = req.baseUrl + "/api/callback";
  console.log(redirect_uri);

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };
  }
});
