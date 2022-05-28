const mongoose = require("mongoose");

const Action = new mongoose.Schema({
	description: { type: String, required: true },
	occurance: { type: Date, default: Date.now() },
});

const Settings = new mongoose.Schema({
	canQueue: { type: String, default: "EVERYONE" },
	canChat: { type: String, default: "EVERYONE" },
});

const Room = new mongoose.Schema({
	code: { type: String, required: true },
	owner: { type: String, required: true },
	viewerCount: { type: String, default: 1 },
	viewers: { type: [String], default: [] },
	musicLog: { type: [String], default: [] },
	actionLog: {
		type: [Action],
		default: [{ description: "Room Created", timestamp: Date.now() }],
	},
	createdAt: { type: Date, default: Date.now() },
	settings: { type: Settings },
	isPublic: { type: Boolean, default: true },
	passcode: { type: String },
});

module.exports = {
	model: mongoose.model("rooms", Room),
	schema: Room,
};
