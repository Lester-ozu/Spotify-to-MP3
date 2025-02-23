const ip = process.env.REACT_APP_USE_LOCAL === "true" ? process.env.REACT_APP_DEFAULT_LH : process.env.REACT_APP_LOCAL_IP
const CLIENT_ID = '146328aec7a14b2a8a6a845d2a9f4ea2';
const REDIRECT_URL = `http://${ip}:5000/callback`;
const SCOPES = ['playlist-read-private', 'playlist-read-collaborative'];
const AUTH_URL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}&scope=${encodeURIComponent(SCOPES.join(' '))}`;

function Login() {

    return(

        <div>
            <h1 className="title">Spotify to MP3</h1>
            <div className="login-container">
                <a className="login" href={AUTH_URL}>
                    <button> 
                        <i className="fa-brands fa-spotify"></i>
                        &nbsp;&nbsp;Login w/ Spotify
                    </button>
                </a>
            </div>
        </div>
    );
}

export default Login;