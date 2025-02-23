import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPlaylists, fetchPlaylistTracks } from "../services/SpotifyAPI.js";

import RowContainer from "../components/RowContainer.jsx"
import Container from "../components/Container.jsx"
import PlaylistContainer from "../components/PlaylistContainer.jsx"
import Playlist from "../components/Playlist.jsx"
import MusicContainer from "../components/MusicContainer.jsx"
import MusicTrack from "../components/MusicTrack.jsx"

function Homepage() {

    const navigate = useNavigate();

    const [playlists, setPlaylists] = useState([]);
    const [playlistData, setPlaylistsData] = useState([]);
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const accessToken = localStorage.getItem("SpotifyAccessToken");
        if(!accessToken) {
            console.log("Walay access token, balik ug login page");
            navigate("/login")
        } else {

            console.log("nakit an na ang access token: ", accessToken);
            setAccessToken(accessToken);
        }
    }, [navigate]);

    useEffect(() => {

        if(!accessToken) return;

        const loadPlaylists = async () => {

            try{
                const playlists = await fetchPlaylists(accessToken);
                setPlaylists(playlists);
            } catch (error) {
                console.error("Error fetching playlists: ", error)
                navigate("/login");
            }
        };

        loadPlaylists();
    }, [accessToken, navigate]);

    useEffect(() => {

        if (!accessToken || playlists.length === 0) return;

        const fetchAllPlaylistData = async () => {
            const getPlaylistList = await Promise.all(
                playlists.map(async (element) => {
                    let playlistTimeDuration = 0;
                    let musicTracks;

                    const { images: [{ url }], name: title, owner: { display_name }, tracks: { total }, id } = element;

                    try {
                        musicTracks = await fetchPlaylistTracks(id, accessToken);
                        playlistTimeDuration = musicTracks.reduce((sum, track) => sum + track.duration, 0);
                        console.log(`${musicTracks.length} Fetched tracks for playlist "${title}":`, musicTracks);
                    } catch (error) {
                        console.error("Error fetching music tracks:", error);
                    }

                    return { url, title, display_name, total, playlistTimeDuration, musicTracks };
                })
            );
            setPlaylistsData(getPlaylistList);
        };

        fetchAllPlaylistData();
    }, [playlists, accessToken])

    const formatDuration = (duration) =>{

        const totalSeconds = Math.floor(duration / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
    
        return hours > 0 ? `${hours} hrs ${minutes} mins ${seconds} secs` : `${minutes} mins ${seconds} secs`;
    }

    return(

        <>      
            <Container>
                {playlistData.map(({ url, title, display_name, total, playlistTimeDuration, musicTracks }, index) => (
                    <RowContainer key={index}>
                        <PlaylistContainer>
                            <Playlist 
                                image={url} 
                                title={title} 
                                owner={display_name} 
                                tracks_number={total} 
                                duration={formatDuration(playlistTimeDuration)} 
                                musicTracks={musicTracks}
                            />
                        </PlaylistContainer>

                        <MusicContainer>
                            {musicTracks.map((track) => (
                                <MusicTrack
                                    key={track.id}
                                    title={track.title}
                                    artist={track.artist}
                                    album={track.album}
                                    duration={formatDuration(track.duration)}
                                    image={track.image}
                                />
                            ))}
                        </MusicContainer>
                    </RowContainer>
                        
                ))}
            </Container>
        </>
    )
}

export default Homepage;