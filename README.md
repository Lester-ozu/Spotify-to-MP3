# Spotify-to-MP3

Spotify-to-Mp3 as it name suggest, it is a project of mine i created so i can turn my spotify playlist to mp3 and listen to it offline. In the initial page of this website, you will have to sign in with your spotify account so that we could fetch your playlist in your account. Unfortunately there's no feature yet that you could download a music track or playlist through links, will add that one later in the future.

## Installation
Step-by-step instructions on how to set up the project.
1. Clone the repository
   ```https://github.com/Lester-ozu/Spotify-to-MP3.git```
2. Navigate to the project directory
   ```cd Spotify-to-MP3```
3. Navigate to client directory and install dependencies for the frontend
   ```
   cd client
   npm install
   ```
4. Next move back to the root directory and navigate to server directory and install dependencies for the backend
   ```
   cd ..
   cd server
   npm install
   ```
5. Make a .env file where you would put your port number 
   ```PORT=YOUR_PORT_NUMBER```
   or just edit the server.js file directly and set the port number there
   ```
   app.listen(YOUR_PORT_NUMBER, () => {
    console.log(`Server is running on http://localhost:YOUR_PORT_NUMBER`);
    });
   ```
7. Navigate back to client directory set up an .env file again for the frontend or set the ip directly into each file that needs modification
   ```
   REACT_APP_DEFAULT_LH=localhost
   REACT_APP_LOCAL_IP={specific ip if you are trying to locally deploy it}
   REACT_APP_USE_LOCAL="true"
   ```
   ```javascript
   
   ```
