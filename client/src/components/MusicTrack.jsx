import PropTypes from 'prop-types'
import { downloadMusic } from '../services/Backend-API.js';

function MusicTrack(props) {

    const downloadTrack = async () => {

        let results;

        try{
            results = await downloadMusic(props.title, props.artist);
        } catch (error) {
            return alert(`Encountered an error while downloading ${props.title}: ${error}`);
        }

        alert(`Successful download: ${props.title}✅`);
    }

    return(
        <>
            <article className="musicTrack">
                <img className="musicImg" src={props.image}></img>
                <p className="musicTitle">{props.title.length > 9 ? String(props.title).substring(0, 10) + "..." : props.title}</p>
                <p className="artist">{props.artist.length > 9 ? String(props.artist).substring(0, 10) + "..." : props.artist}</p>
                <p className='album'>{props.album.length > 9 ? String(props.album).substring(0, 10) + "..." : props.album}</p>
                <p className="musicTimeDuration">{props.duration}</p>
                <button onClick={() => downloadTrack()} className="musicDownloadBtn">↓</button>
            </article>
        </>
    )
}

MusicTrack.propTypes = {

    title: PropTypes.string,
    artist: PropTypes.string,
    album: PropTypes.string,
    duration: PropTypes.string,
    image: PropTypes.string,
}

MusicTrack.defaulProps = {

    title: "Error",
    artist: "None",
    album: "None",
    duration: "0",
    image: "Error",
}

export default MusicTrack;