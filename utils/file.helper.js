const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadContents(urls) {
    const downloadedContents = [];
  
    const promises = urls.map(async (url) => {
      try {
        const response = await axios.get(url);
        downloadedContents.push(response.data);
      } catch (error) {
        console.error(`Error downloading from ${url}: ${error.message}`);
        throw new Error('Download failed');
      }
    });
  
    await Promise.all(promises);
  
    return downloadedContents;
  }

  async function fetchData(apiUrl) {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw { statusCode: error.response.status, message: error.response.statusText };
      } else if (error.request) {
        throw { statusCode: 500, message: error.response.statusText };
      } else {
        throw { statusCode: 500, message: error.response.statusText };
      }
    }
  }

  function listFiles(directoryPath, extension) {
    const files = [];
    const entries = fs.readdirSync(directoryPath);
  
    entries.forEach((entry) => {
      const entryPath = path.join(directoryPath, entry);
      const stat = fs.statSync(entryPath);
  
      if (stat.isFile() && path.extname(entry) === extension) {
        files.push(entry);
      }
    });
  
    return files;
  }

  module.exports = {
    downloadContents,
    fetchData,
    listFiles
  }