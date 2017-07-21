var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  return new Promise((resolve, reject) => {
    fs.readFile(exports.paths.list, 'utf-8', (err, res) => {
      if (err) {
        reject(err);
      } else {
        listOfUrls = res.split('\n');
        callback(listOfUrls);
        resolve(listOfUrls);
      }
    });
  });
};

exports.isUrlInList = function(url, callback) {
  return new Promise(exports.readListOfUrls)
    .then((urls) => callback(urls.includes(url)));
};

exports.addUrlToList = function(url, callback) {
  return new Promise((resolve, reject) => {
    fs.appendFile(exports.paths.list, url + '\n', (err, res) => {
      if (err) {
        reject(err);
      } else {
        callback(res);
        resolve(res);
      }
    });
  });
};

exports.isUrlArchived = function(url, callback) {
  return new Promise ((resolve, reject) => {
    fs.readdir(exports.paths.archivedSites, 'utf-8', (err, files) => {
      let isInDir = files.some((file) => file === url);
      if (err) { 
        reject(err); 
      } else {
        resolve(isInDir);
      }
      callback(isInDir);
    });
  });
};

exports.downloadUrls = function(urls) {
  return new Promise((resolve, reject) => {
   
    urls.forEach(url => {
      let urlStream = fs.createWriteStream(url);
      request.get('https://' + url)
        .then((body) => fs.writeFile(exports.paths.archivedSites + '/' + url,
          body, 'utf-8', (err) => reject(err)));
    });


    //using promises make a get request for each url
    //make an options object that houses the url, headers, and json
    //make the get request
    //on err reject err
    //on res write to the urlStreamCopy

  });
    
  
  //looks at the urls
  //iterates
  //checks the internet
  //makes a request to the internet
  //receives a html file
  //writes the html file to the sites folder

  //watch for changes
};
