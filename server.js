import express from "express"; //framwork for creaing webservie applications
import fetch from "node-fetch";
//https://github.com/alnacle/spotify-api-workshop.git

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))

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

app.post("/makePlaylist", async (req, res) => {
  //console.log(req.body.altrock)
  //const playlist = await getData("/recommendations?limit=10&market=ES&seed_genres=hip-hop" + req.body.altrock);
  
  const altrock = req.body.altrock;
  const acoustic = req.body.acoustic;
  const blues = req.body.blues;
  const chill = req.body.chill;
  const country = req.body.country;
  const dance = req.body.dance;
  const disco = req.body.disco;
  const dubstep = req.body.dubstep;
  const emo = req.body.emo;
  const funk = req.body.funk;
  const gospel = req.body.gospel;
  const hipHop = req.body.hipHop;
  const jazz = req.body.jazz;
  const metal = req.body.metal;
  const opera = req.body.opera;
  const party = req.body.party;
  const piano = req.body.piano;
  const pop = req.body.pop;
  const punk = req.body.punk;
  const rnb = req.body.rnb;
  const reggae = req.body.reggae;
  const rock = req.body.rock;
  const romance = req.body.romance;
  const sad = req.body.sad;
  const salsa = req.body.salsa;
  const sleep = req.body.sleep;
  const soul = req.body.soul;
  const study = req.body.study;
  const workOut = req.body.workOut;

  
  const genre_seeds = [];
  let seed_count = 0;
  if(altrock && seed_count < 5){
    genre_seeds[seed_count] = altrock;
    seed_count++;
  }
  if(acoustic && seed_count < 5) {
    genre_seeds[seed_count] = acoustic;
    seed_count++;
  }
  if(blues && seed_count < 5) {
    genre_seeds[seed_count] = blues;
    seed_count++;
  }
  if(chill && seed_count < 5) {
    genre_seeds[seed_count] = chill;
    seed_count++;
  }
  if(country && seed_count < 5) {
    genre_seeds[seed_count] = country;
    seed_count++;
  }
  if(dance && seed_count < 5) {
    genre_seeds[seed_count] = dance;
    seed_count++;
  }
  if(disco && seed_count < 5) {
    genre_seeds[seed_count] = disco;
    seed_count++;
  }
  if(dubstep && seed_count < 5) {
    genre_seeds[seed_count] = dubstep;
    seed_count++;
  }
  if(emo && seed_count < 5) {
    genre_seeds[seed_count] = emo;
    seed_count++;
  }
  if(funk && seed_count < 5) {
    genre_seeds[seed_count] = funk;
    seed_count++;
  }
  if(gospel && seed_count < 5) {
    genre_seeds[seed_count] = gospel;
    seed_count++;
  }
  if(hipHop && seed_count < 5) {
    genre_seeds[seed_count] = hipHop;
    seed_count++;
  }
  if(jazz && seed_count < 5) {
    genre_seeds[seed_count] = jazz;
    seed_count++;
  }
  if(metal && seed_count < 5) {
    genre_seeds[seed_count] = metal;
    seed_count++;
  }
  if(opera && seed_count < 5) {
    genre_seeds[seed_count] = opera;
    seed_count++;
  }
  if(party && seed_count < 5) {
    genre_seeds[seed_count] = party;
    seed_count++;
  }
  if(piano && seed_count < 5) {
    genre_seeds[seed_count] = piano;
    seed_count++;
  }
  if(pop && seed_count < 5) {
    genre_seeds[seed_count] = pop;
    seed_count++;
  }
  if(punk && seed_count < 5) {
    genre_seeds[seed_count] = punk;
    seed_count++;
  }
  if(rnb && seed_count < 5) {
    genre_seeds[seed_count] = rnb;
    seed_count++;
  }
  if(reggae && seed_count < 5) {
    genre_seeds[seed_count] = reggae;
    seed_count++;
  }
  if(rock && seed_count < 5) {
    genre_seeds[seed_count] = rock;
    seed_count++;
  }
  if(romance && seed_count < 5) {
    genre_seeds[seed_count] = romance;
    seed_count++;
  }
  if(sad && seed_count < 5) {
    genre_seeds[seed_count] = sad;
    seed_count++;
  }
  if(salsa && seed_count < 5) {
    genre_seeds[seed_count] = salsa;
    seed_count++;
  }
  if(sleep && seed_count < 5) {
    genre_seeds[seed_count] = sleep;
    seed_count++;
  }
  if(soul && seed_count < 5) {
    genre_seeds[seed_count] = soul;
    seed_count++;
  }
  if(study && seed_count < 5) {
    genre_seeds[seed_count] = study;
    seed_count++;
  }
  if(workOut && seed_count < 5) {
    genre_seeds[seed_count] = workOut;
    seed_count++;
  }

  console.log(genre_seeds);
  console.log(req.body.danceability);
  console.log(req.body.loudness);
  console.log(req.body.popularity);
  
  const params = new URLSearchParams({
    // seed_artist: "4NHQUGzhtTLFvgF5SZesLK",
    seed_genres: genre_seeds,
    target_danceability: req.body.danceability,
    target_loudness: req.body.loudness,
    target_popularity: req.body.popularity,

  });
  
  const playlist = await getData("/recommendations?" + params); //FIXME: Still not working, i DONT know why it work on spotify site maybe change this line
  //console.log(playlist);
  res.render("playlist", { songs: playlist.tracks});
});

app.get("/playlist", async (req, res) => {
  playlist = await getData("/recommendations?limit=10&market=ES&seed_genres=hip-hop");


  res.render("playlist", { songs: playlist.tracks});
  //how do i get the submit button to move to the next screen.
})

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


