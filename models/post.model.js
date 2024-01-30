const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String, trim: true, lowercase: true, required: true,
		},
		description: {
			type: String, trim: true, lowercase: true, required: true,
		},
		author: { type: String, trim: true, lowercase: true },
		userId: { type: String }
	},
	{ timestamps: true },
);


const PostModel = mongoose.model('posts', postSchema);
module.exports = PostModel;
