
const PostModel = require("../models/post.model");
const { AppResponse } = require("../utils/response.helper");

const create = async (req, res) => {
	try {
		const data = {
			...req.body,
			userId: req.user.id
		};
		const post = new PostModel(data);
		await post.save();
		const responseData = {
				_id: post._id,
				title: post.title,
				description: post.description,
				author: post.author,
		};
		return AppResponse(
			res, {
				statusCode: 201,
				message: 'Post Create Successfully',
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

const veiwAll = async (req,res) => {
	try {
		const post = await PostModel.find({userId: req.user.id});
		return AppResponse(
			res, {
				statusCode: 201,
				message: null,
				data: post,
		});

	} catch(e) {
		return AppResponse(
			res, {
				statusCode: 500,
				message: e,
			});
	}
}

const veiw = async (req,res) => {
	try {
		const post = await PostModel.findOne({_id:req.params.postId ,userId: req.user.id});
		return AppResponse(
			res, {
				statusCode: 201,
				message: null,
				data: post,
		});

	} catch(e) {
		return AppResponse(
			res, {
				statusCode: 500,
				message: e,
		});
	}
}

const update = async (req, res) =>{
	try {
		const post = await PostModel.findOneAndUpdate(
			{_id: req.params.postId,userId: req.user.id},
			{
				$set: {
					title: req.body.title,
					description: req.body.description,
					author: req.body.author,
				  },
			},
			{ new: true },
		);
		return AppResponse(
			res, {
				statusCode: 201,
				message: null,
				data: post,
		});
	} catch(e) {
		return AppResponse(
			res, {
				statusCode: 500,
				message: e,
		});
	}
}

const remove = async (req,res) => {
	try {
		const post = await PostModel.findOneAndDelete({_id:req.params.postId ,userId: req.user.id});
		return AppResponse(
			res, {
				statusCode: 201,
				message: null,
				data: post,
		});

	} catch(e) {
		return AppResponse(
			res, {
				statusCode: 500,
				message: e,
		});
	}
}

module.exports ={
    create,
	veiwAll,
	veiw,
	update,
	remove
}