
class SpotifyAPIUtil {
// Function to extract token from URL fragment
  static getTokenFromUrl = () => {

    const hash = window.location.hash.substring(1); 
    return Object.fromEntries(new URLSearchParams(hash));
  };

  static async refreshSpotifyToken(refreshToken, clientId, clientSecret) {
    const url = "https://accounts.spotify.com/api/token";
  
    // Encode client ID and secret for Basic Auth
    const authHeader = btoa(`${clientId}:${clientSecret}`);
  
    // Request body
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });
  
    try {
    
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authHeader}`,
        },
        body: body.toString(),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to refresh token: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("New Access Token:", data.access_token);
  
      // Return the new token and other details
      return {
        accessToken: data.access_token,
        expiresIn: data.expires_in,
      };
    } catch (error) {
      console.error("Error refreshing Spotify token:", error);
    }
  }

  // Fetch playlists from Spotify
  static fetchPlaylists = async (accessToken) => {
    try {

      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {

        throw new Error(`API Error: ${response.status}`);
      }

      return (await response.json()).items;
    } 
    
    catch (error) {

      console.error('Failed to fetch playlists:', error);
    }
  };

  // Fetch tracks from a playlist
  static fetchPlaylistTracks = async (playlistId, accessToken) => {
    try {

      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {

        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      return data.items.map(item => ({

        title: item.track.name,
        artist: item.track.artists.map(artist => artist.name).join(', '),
        album: item.track.album.name,
        duration: item.track.duration_ms,
        image: item.track.album.images.length > 0 ? item.track.album.images[0].url : null,
      }));
    } 
    
    catch (error) {
      
      console.error('Failed to fetch playlist tracks:', error);
    }
  }
}


module.exports = SpotifyAPIUtil;