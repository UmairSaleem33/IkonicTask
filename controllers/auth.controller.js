const {AppResponse} = require('../utils/response.helper')
const UserModel = require('../models/user.model')
const bcrypt = require('bcryptjs');

const registration = async (req, res) => {
	try {
		const data = {
			...req.body,
		};
		const user = new UserModel(data);
		await user.save();
		const token = await user.generateAuthToken();
		const responseData = {
			token: token,
			user: {
				_id: user._id,
				first_name: user.first_name,
				last_name: user.last_name,
				full_name: user.full_name,
				email: user.email,
			},
		};
		return AppResponse(
			res, {
				statusCode: 201,
				message: null,
				data: responseData,
			});
	}
	catch (e) {
		return AppResponse(
			res, {
				statusCode: 500,
				message: e,
			});
	}
};

const userLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await UserModel.findOne({ email });
		if (!user) {
			return AppResponse(res, {
				statusCode: 400,
				message: 'Invalid Credentials',
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return AppResponse(res, {
				statusCode: 400,
				message: 'Invalid Credentials',
			});
		}

		const token = await user.generateAuthToken();

		const data = {
			token,
			user: {
				_id: user._id,
				full_name: user.full_name,
				email: user.email,
			},
		};

		return AppResponse(res, {
			statusCode: 200,
			message: null,
			data: data,
		});
	}
	catch (e) {
		return AppResponse(res, {
			statusCode: 500,
			message: e,
		});
	}
};

module.exports = {
    registration,
	userLogin
}