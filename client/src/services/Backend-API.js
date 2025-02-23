const ip = process.env.REACT_APP_USE_LOCAL === "true" ? process.env.REACT_APP_DEFAULT_LH : process.env.REACT_APP_LOCAL_IP

const downloadMusic = async (title, artist) => {
    if(!title) return alert("No music to download");

    const response = await fetch(`http://${ip}:5000/download`, {

        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ title, artist, playlistTitle : null}),
    })

    if(!response.ok) {
        const data = await response.json();
        return data.message || "Failed to start download music";
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${title} - ${artist}.mp3`; // File name for download
    document.body.appendChild(a);
    a.click();
    a.remove(); 
}

const downloadPlaylist = async (playlistTitle, musicTracks) => {
    if(!playlistTitle || !musicTracks) return alert("No playlist to download");

    const response = await fetch(`http://${ip}:5000/download`, {

        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ playlistTitle, musicTracks })
    })

    if(!response.ok) {
        const data = await response.json();
        return data.message || "Failed to start download playlist"
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${playlistTitle}.zip`; // File name for download
    document.body.appendChild(a);
    a.click();
    a.remove(); 
}

export { downloadPlaylist, downloadMusic };