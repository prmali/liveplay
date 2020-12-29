const puppeteer = require("puppeteer");
const ytdl = require("ytdl-core");

var browser;

(async () => {
	browser = await puppeteer.launch();
})();

module.exports.search = async (req, res) => {
	const trackUrl = "https://www.youtube.com/results?search_query=" + req.query.ref;
	const page = await browser.newPage();
	try {
		await page.goto(trackUrl, { waitUntil: 'load' });
		let trackHref = await page.$eval("ytd-thumbnail:nth-child(1) > a", e => e.href);
		if (trackHref) {
			res.send({ success: true, url: trackHref });
		} else {
			res.send({ success: false, error: "audio not found" });
		}
		await page.close();
	} catch (err) {
		res.send({ success: false, error: "unable to get audio" });
	}
}

module.exports.stream = async (req, res) => {
	const trackUrl = req.query.trackUrl;
	let id = ytdl.getURLVideoID(trackUrl);
	ytdl.getInfo(id).then(info => {
		//console.log(info); // related videos for autoplay
	}).catch(err => {

	});

	let stream = ytdl(trackUrl, {
		filter: "audioonly",
		quality: "highestaudio"
	});

	if (stream) {
		stream.on("info", (info, format) => {
			//stream.setEncoding("binary").pipe(res);
			res.send({ url: format.url });
		})
		//stream = byline.createStream(stream).setEncoding("binary");

	} else {
		res.send({ success: false, error: "stream not found" });
	}
}