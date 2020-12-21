const axios = require("axios");

module.exports.search = async (req, res) => {
    console.log(req);
    const track = await axios.get("https://www.youtube.com/results?search_query=" + req.body.name);
    res.send({track: track});
}