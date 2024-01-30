const { AppResponse } = require("../utils/response.helper");
const { fetchData, listFiles, downloadContents } = require('../utils/file.helper');

const download = async (req, res) => {
    try {
        const downloadedContents = await downloadContents(req.body);
        return AppResponse(res, {
            statusCode: 200,
            message: "Download Content",
            data: downloadedContents
        })
      } catch (error) {
        return AppResponse(
			res, {
				statusCode: 500,
				message: error,
			});
      }
};


 const fetchUrlData = async (req, res) => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    try {
      const data = await fetchData(apiUrl);
      return AppResponse(res, {
        statusCode: 200,
        message: "fetch data",
        data: data
    })
    } catch (error) {
        return AppResponse(
			res, {
				statusCode: error.statusCode || 500,
				message: error.message,
			});
    }
  };
  

  const listFilesInfo = (req, res) => {
    const directoryPath = "/data/dummy";
    const extension = '.txt';
    try {
      const files = listFiles(directoryPath, extension);
      return AppResponse(res, {
        statusCode: 200,
        message: "files data",
        data: files
    })
    } catch (error) {
        return AppResponse(
			res, {
				statusCode: 500,
				message: error,
			});
    }
  };
  
module.exports = {
    download,
    fetchUrlData,
    listFilesInfo
}