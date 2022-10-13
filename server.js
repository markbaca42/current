import express from "express"; //framwork for creaing webservie applications
import fetch from "node-fetch";
//https://github.com/alnacle/spotify-api-workshop.git

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

const redirect_uri = "http://localhost:3000/callback";
const client_id = "b5b53e673bf34a2aa429b48736055bae";
const client_secret = "c851b40319a142408dd5a29140aadc12";

global.access_token;

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/authorize", (req, res) => {
  var auth_query_parameters = new URLSearchParams({ //send request to get keys for endpoint
    response_type: "code",
    client_id: client_id,
    scope: "user-library-read user-top-read",
    redirect_uri: redirect_uri,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize?" + auth_query_parameters.toString()
  );
});

app.get("/callback", async (req, res) => { //spotify sends message back with code
  const code = req.query.code;

  var body = new URLSearchParams({
    code: code,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "post", //post request
    body: body,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
  });

  const data = await response.json();
  global.access_token = data.access_token;

  res.redirect("/makePlaylist");
});

async function getData(endpoint) {
  const response = await fetch("https://api.spotify.com/v1" + endpoint, {
    method: "get",
    headers: {
      Authorization: "Bearer " + global.access_token,
    },
  });

  const data = await response.json();
  return data;
}

app.get("/makePlaylist", async (req, res) => {
  const userInfo = await getData("/me");
  //const tracks = await getData("/me/tracks?limit=10");
  const topArtist = await getData("/me/top/artists?time_range=long_term&limit=15");

  //res.render("dashboard", { user: userInfo, tracks: tracks.items });
  res.render("makePlaylist", { user: userInfo, artists: topArtist.items});
});

// app.get("/recommendations", async (req, res) => {
//   const artist_id = req.query.artist;
//   const track_id = req.query.track;

//   const params = new URLSearchParams({
//     seed_artist: artist_id,
//     seed_genres: "rock",
//     seed_tracks: track_id,
//   });

//   const data = await getData("/recommendations?" + params);
//   res.render("recommendation", { tracks: data.tracks });
// });


app.get("/top/artists", async (req, res) => {
  // const artist_id = req.query.artist;
  // const track_id = req.query.track;

  const params = new URLSearchParams({
    type: "artists",
    time_range: "long_term",
  });

  const data = await getData("/recommendations?" + params);
  res.render("recommendation", { tracks: data.tracks });
});



let listener = app.listen(3000, function () {
  console.log(
    "Your app is listening on http://localhost:" + listener.address().port
  );
});


