const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
	{
		first_name: {
			type: String, trim: true, lowercase: true, required: true,
		},
		last_name: {
			type: String, trim: true, lowercase: true, required: true,
		},
		full_name: { type: String, trim: true, lowercase: true },
		email: {
			type: String,
			unique: true,
			lowercase: true,
			required: true,
			validate(val) {
				if (!validator.isEmail(val)) {
					throw new Error('Email is invalid!');
				}
			},
		},
		password: {
			type: String,
			validate(val) {
				if (val.length < 8) {
					throw new Error('Password must be 8 character long!');
				}
			},
			required: true,
		},
		tokens: [
			{
				_id: false,
				token: {
					_id: false,
					type: String,
					required: true,
				},
			},
		],
	},
	{ timestamps: true },
);


userSchema.pre('save', async function(next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = await jwt.sign({ _id: user._id.toString() }, process.env.SECRET, {
		expiresIn: process.env.AUTHROZATION_TOKEN_TTL,
	});
	user.tokens = user.tokens.concat({ token });
	await user.save();

	return token;
};

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;
