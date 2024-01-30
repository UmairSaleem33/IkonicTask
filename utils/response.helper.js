const AppResponse = (response, { statusCode = 200, message, data = null }) => {
	response.status(statusCode).send({
		status_code: statusCode,
		message,
		data,
	});
};

module.exports = { AppResponse };