// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

const okta = require("@okta/okta-sdk-nodejs");

const client = new okta.Client({
  orgUrl: "https://tkirk.oktapreview.com/",
  token: "00k7Tt19er38xp3Nndv4Byxvdpy3x4itwNBrsRyfSv" // Obtained from Developer Dashboard
});

// our default array of dreams

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
// app.get("/", (request, response) => {
//   response.sendFile(__dirname + "/views/index.html");
// });

// send the default array of dreams to the webpage
app.get("/", (request, response) => {
  // express helps us take JS objects and send them as JSON
  const orgUsersCollection = client.listUsers();
  const userArray = [];
  orgUsersCollection
    .each(user => {
      const groupsArr = [];
      const groups = user
        .listGroups()
        .each(group => {
          groupsArr.push(group.id);
        })
        .then(() => {
          const userJ = {};
          // console.log(user)
          userJ.id = user.id;
          userJ.login = user.profile.login;
          userJ.groups = groupsArr;
          console.log(userJ);
          userArray.push(userJ)
        });
    })
    .then(() => console.log("All users have been listed"));
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
