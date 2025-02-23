import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromUrl } from "../services/SpotifyAPI.js";

function Callback() {

    const navigate = useNavigate();

    useEffect(() => {

        const tokenData = getTokenFromUrl();
        const accessToken = tokenData.access_token;
        console.log(tokenData.access_token);

        if(accessToken) {
            localStorage.setItem("SpotifyAccessToken", accessToken);
            setTimeout(() => navigate("/homepage"), 100)
        } else {
            setTimeout(() => navigate("/login"), 100)
        }
    }, [navigate])

    return(
        <>
            <h1 className="title">Spotify to MP3</h1>
            <h2 className="second-title">Authenticating...</h2>
            <div className="loading-icon">
                <img src="/loading.svg" alt="Loading Icon" />
            </div>

        </>
    );
}

export default Callback;