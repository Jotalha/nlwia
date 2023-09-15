import ytdl from "ytdl-core"
import fs from "fs"
import { info } from "console"

export const download = (videoId) => {
	console.log("Realizando o download: ", videoId)

	const videoUrl = "https://www.youtube.com/shorts/" + videoId

	ytdl(videoUrl, { quality: "lowestaudio", filter: "audioonly" })
		.on("info", (info) => {
			const seconds = info.formats[0].approxDurationMs / 1000
			if (seconds > 60) {
				throw new Error("Vídeo muito grande")
			}
		})
		.on("end", () => {
			console.log("Download finalizado")
		})
		.on("error", (err) => {
			console.log("Erro ao realizar o download: ", err)
		})
		.pipe(fs.createWriteStream("./tmp/audio.mp4"))
}
