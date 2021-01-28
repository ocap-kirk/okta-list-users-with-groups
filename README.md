# okta-list-users-with-groups

A server that serves json representing all Okta users in an org with their associated groups.


## How to Use

Download or clone this repo
- modify orgUrl and token values in `server.js`

- ```npm install```
- ```npm start```
- Use the browser or API client to make a call to retrieve the users.

## About
This example uses the Okta okta-sdk-nodejs library to fetch all the users and then iterate through each user and fetch all the groups. It logs and returns the value as JSON.

This is example code and has not been tested with very many users, use at your own risk.




( ᵔ ᴥ ᵔ )