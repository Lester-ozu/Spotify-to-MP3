import PropTypes from 'prop-types';
import { downloadPlaylist } from '../services/Backend-API.js';

function Playlist(props) {

    const handleDBClick = (event) => {

        const currentElement = event.target;

        const parentContainer = currentElement.closest(".rowContainer");
        const musicContainer = parentContainer.querySelector(".musicContainer");

        currentElement.classList.toggle("rotate");
        musicContainer.classList.toggle("slideDown");

        if(musicContainer.style.display === "flex") {

            musicContainer.style.display = "none";
        }

        else{

            musicContainer.style.display = "flex";
        }
    }

    const downloadPL = async () => {
        let dlInfo;

        try {
            dlInfo = await downloadPlaylist(props.title, props.musicTracks);
        } catch (error) {
            alert(`There was an error downloading ${props.title}: ${error}`);
        }

        return alert(`Playlists ${props.title} has been downloaded successfully!`);
    }

    return(

        <>
            <section className="playlist">
                <button className="dropDown" onClick={(event) => handleDBClick(event)}>&#10095;</button>
                <img className="playlistImg" src={props.image}></img>
                <p className="playlistTitle">{props.title.length > 9 ? String(props.title).substring(0, 10) + "..." : props.title}</p>
                <p className="author">{props.owner.length > 9 ? String(props.owner).substring(0, 10) + "..." : props.owner}</p>
                <p className="musicNumber">{props.tracks_number} songs</p>
                <p className="timeDuration">{props.duration}</p>
                <button onClick={() => downloadPL()} className="downloadButton">↓</button>
            </section>
        </>
    );  
}

Playlist.propTypes = {

    image: PropTypes.string,
    title: PropTypes.string,
    owner: PropTypes.string,
    tracks_number: PropTypes.number,
    duration: PropTypes.string,
    musicTracks: PropTypes.array,
}

Playlist.defaultProps = {

    image: "!!!",
    title: "Error",
    owner: "Unknown",
    tracks_number: 0,
    duration: "Unknown",
    musicTracks: [],
}

export default Playlist;