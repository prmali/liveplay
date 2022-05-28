const RoomModel = require("./room.model").model;

var options = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
var numOptions = options.length;

const genUrl = () => {
	let str = "";
	for (let i = 0; i < 6; ++i) {
		let choice = Math.floor(Math.random() * Math.floor(numOptions));
		str += options.charAt(choice);
	}

	return str;
};

module.exports.createRoom = async (req, res) => {
	try {
		let roomByOwner = await RoomModel.findOne({
			owner: req.body.user,
		}).exec();

		if (!roomByOwner) {
			let genCode = genUrl();
			let codedRoom = await RoomModel.findOne({ code: genCode }).exec();
			let iter = 0;
			while (codedRoom && iter++ <= 100) {
				genCode = genUrl();
				codedRoom = await RoomModel.findOne({ code: genCode }).exec();
			}

			if (iter <= 100) {
				let newRoom = await RoomModel.create({
					owner: req.body.user,
					code: genCode,
				});
				res.status(201).send({ code: newRoom.code });
			} else {
				res.status(400).send({
					error: "Unable to allocate room at this time",
				});
			}
		} else {
			res.status(201).send({ code: roomByOwner.code });
		}
	} catch (err) {
		res.status(400).send({
			error: "Unable to process request. I'll look into it",
		});
	}
};

module.exports.getRoomInfo = async (req, res) => {
	try {
		let roomByCode = RoomModel.findOne({ code: req.code }).exec();
		let exposedRoom = {
			code: roomByCode.code,
			owner: roomByCode.owner,
			isPublic: roomByCode.isPublic,
		};
		res.status(200).send({ room: exposedRoom });
	} catch (err) {
		res.status(400).send({
			error: "Unable to process request. I'll look into it",
		});
	}
};

module.exports.removeRoom = async (req, res) => {
	try {
		let room = await RoomModel.findOne({ code: req.code }).exec();
		await RoomModel.deleteOne({ code: req.code }).exec();
		res.status(200).send({ success: true });
	} catch (err) {
		res.status(400).send({
			error: "Unable to process request. I'll look into it",
		});
	}
};

// increment analytics schema
