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
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/getUsersWithGroups", (request, response) => {
  // express helps us take JS objects and send them as JSON
  const orgUsersCollection = client.listUsers();
  const users= [];
  orgUsersCollection
    .each(user => {
      var groups = user.listGroups();
      var groupsArray = "";
      const groupsArr = [];
      groups.each(group => {
        
        groupsArr.push(group.id);
        const user = { "id" :user.id, "groups": groupsArr};
        console.log(user);
        users.push(user);
      });
    })
    .then(() => console.log("All users have been listed"));
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
