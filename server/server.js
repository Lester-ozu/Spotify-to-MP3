const express = require("express");
const path = require("path");
const cors = require("cors");
const ytSearch = require("yt-search");
const { exec } = require("child_process")
const fs = require("fs");
const os = require("os");
const archiver = require("archiver");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve the React app (after build)
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.post("/download", async (req, res) => {

    const dlPath = path.join(__dirname, "downloads");
    if(!fs.existsSync(dlPath)) {
        fs.mkdirSync(dlPath, {recursive : true});
    }

    const { playlistTitle } = req.body;
    
    if(!playlistTitle) {
        const { title, artist } = req.body;

        const results = await ytSearch(`${title} ${artist}`);

        if(results) {
            const videoLink = results.videos[0].url;
            const outputFile = path.join(dlPath, `${title} - ${artist}.%(ext)s`);

            const command = `yt-dlp -f bestaudio --extract-audio --audio-format mp3 --audio-quality 192K -o "${outputFile}" "${videoLink}"`;

            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error downloading video: ${stderr}`);
                    return res.status(500).json({ message: `Failed to download video: ${title}` });
                }
                console.log(`Download successful: ${stdout}`);

                res.setHeader("Content-Disposition", `attachment; filename="${title} - ${artist}.mp3"`);
                res.setHeader("Content-Type", "audio/mpeg");
                res.download(path.join(dlPath, `${title} - ${artist}.mp3`));

                res.on("close", () => {
                    fs.unlink(path.join(dlPath, `${title} - ${artist}.mp3`), (err) => {
                        if(err) console.error('Error deleting the file: ', err);
                        else console.log(`File deleted Successfully: ${title} - ${artist}.mp3`)
                    })
                })
            });
        } else {
            console.error('Error searching in Youtube: ', title);
            res.status(500).json({message: "Failed to fetch video"});    
        }
    } else {
        let successfulDL = 0;

        const { musicTracks } = req.body;
        
        const plPath = path.join(dlPath, playlistTitle);
        if(!fs.existsSync(plPath)) {    
            fs.mkdirSync(plPath, {recursive : true});
        }

        const downloadTasks = musicTracks.map(async (track) => {
            const results = await ytSearch(`${track.title} ${track.artist}`);

            if(results) {
                const videoLink = results.videos[0].url;
                const outputFile = path.join(plPath, `${track.title} - ${track.artist}.%(ext)s`);

                const command = `yt-dlp -f bestaudio --extract-audio --audio-format mp3 --audio-quality 192K -o "${outputFile}" "${videoLink}"`;

                return new Promise((resolve, reject) => {
                    exec(command, (error, stdout, stderr) => {
                        if(error) {
                            console.error(`Error downloading ${track.title}: ${stderr}`);
                            return reject(error);
                        }
                        console.log(`Download Successful: ${stdout}`);
                        successfulDL++;
                        resolve();
                    })
                })
            }
        });

        await Promise.all(downloadTasks);

        res.setHeader("Content-Disposition", `attachment; filename=Playlist.zip`);
        res.setHeader("Content-Type", "application/zip");

        const archive = archiver("zip", { zlib: { level : 9 } });
        archive.pipe(res);

        archive.directory(plPath, `${playlistTitle}`);
        archive.finalize();

        res.on("close", () => {
            fs.rm(plPath, { recursive: true, force: true }, (err) => {
                if(err) console.error('Error deleting the folder: ', err);
                else console.log(`File deleted Successfully folder: istTitle`)
            })
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});