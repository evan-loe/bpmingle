const express = require("express");
const router = express.Router();
const { generateRandomString } = require("./utils/utils");
const querystring = require("query-string");
const axios = require("axios");

const redirect_uri =
  process.env.NODE_ENV === "production"
    ? "https://bpmingle.herokuapp.com/api/callback"
    : "http://localhost:3001/api/callback";
const client_id = "81aba320a1ad4c94b67b09675dec5622";
const client_secret = process.env.SPOTIFY_SECRET;

const formUrlEncoded = (x) =>
  Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, "");

router.get("/login", (req, res) => {
  const state = generateRandomString(16);
  const scope = "streaming";

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
  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: formUrlEncoded({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    }),
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    json: true,
  })
    .then((response) => {
      console.log(
        process.env.NODE_ENV === "production"
          ? "https://bpmingle.herokuapp.com/chatroom/#"
          : "http://localhost:3000/chatroom/#"
      );
      res.redirect(
        (process.env.NODE_ENV === "production"
          ? "https://bpmingle.herokuapp.com/chatroom/#"
          : "http://localhost:3000/chatroom/#") +
          querystring.stringify({
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
          })
      );
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "error" });
    });

  // if (state === null) {
  //   res.redirect(
  //     "/#" +
  //       querystring.stringify({
  //         error: "state_mismatch",
  //       })
  //   );
  // } else {
  //   res.json({ code, state });
  // }
});

// router.get("/exchangeCode", (req, res) => {
//   const code = req.query.code || null;
//   if (!code) {
//     res.json({ status: "error" });
//   }
// });

router.get("/refresh_token", (req, res) => {
  let refresh_token = req.query.refresh_token;
  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: formUrlEncoded({
      refresh_token: refresh_token,
      grant_type: "refresh_token",
    }),
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    json: true,
  })
    .then((response) => {
      res.send({
        access_token: response.data.access_token,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
