# Spotify-to-MP3

Spotify-to-Mp3 as it name suggest, it is a project of mine i created so i can turn my spotify playlist to mp3 and listen to it offline. In the initial page of this website, you will have to sign in with your spotify account so that we could fetch your playlist in your account. Unfortunately there's no feature yet that you could download a music track or playlist through links, will add that one later in the future.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

## Installation
Step-by-step instructions on how to set up the project.
1. Clone the repository
   ```
   https://github.com/Lester-ozu/Spotify-to-MP3.git
   ```
3. Navigate to the project directory
   ```
   cd Spotify-to-MP3
   ```
5. Navigate to client directory and install dependencies for the frontend
   ```
   cd client
   npm install
   ```
6. Next move back to the root directory and navigate to server directory and install dependencies for the backend
   ```
   cd ..
   cd server
   npm install
   ```
7. Make a .env file where you would put your port number 
   ```
   PORT=YOUR_PORT_NUMBER
   ```
   or just edit the server.js file directly and set the port number there
   ```javascript
   app.listen(YOUR_PORT_NUMBER, () => {
    console.log(`Server is running on http://localhost:YOUR_PORT_NUMBER`);
   });
   ```
8. Navigate back to client directory set up an .env file again for the frontend
   ```
   REACT_APP_DEFAULT_LH=localhost
   REACT_APP_LOCAL_IP={specific ip if you are trying to locally deploy it}
   REACT_APP_USE_LOCAL="true"
   ```
   or set the ip directly into each file that needs modification
   ```javascript
   // Backend-API.js
   const ip = process.env.REACT_APP_USE_LOCAL === "true" ? process.env.REACT_APP_DEFAULT_LH : process.env.REACT_APP_LOCAL_IP // Delete this line

    const response = await fetch(`http://${ip}:5000/download`, { // Edit every fetch url replace "${ip}" with "localhost" or an IPv4 if you want to run it locally

        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ title, artist, playlistTitle : null}),
    })
   ```
   ```javascript
   //Login.jsx
   const REDIRECT_URL = `http://${ip}:5000/callback`; // replace "${ip}" with "localhost" or an IPv4 if you want to run it locally
   ```

9. To run the whole program, go to client directory and then build the frontend by:
   ```
   cd client
   npm run build
   ```
   After that, go to server directory, run the server, and access the web program
   ```
   cd server
   node server.js
   ```

## Usage
Login with Spotify and click the download button.
