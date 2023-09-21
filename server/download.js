import ytdl from 'ytdl-core'
import fs from 'fs'

export const download = (videoId) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("Realizando o download do vídeo:", videoId)
  
  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
  .on("info", (info) => {
    const seconds = info.formats[0].approxDurationMs / 1000
    
    if (seconds > 60) {
      throw new Error("This video is not a Shorts.")
    }
  }
  ).on("end", () => {
    console.log("Download finished.")
  })
  .on("error", (error) => {
    console.log("Was not possible to download this video")
  }).pipe(fs.createWriteStream("./temp/audio.mp4"))
}