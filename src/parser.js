'use strict';
var https = require('https'),
    htmlparser = require("cheerio"),
    fs = require('fs'),
    util = require('util');
	
const SOURCE = 'https://news.ycombinator.com/';
const MAX_ITERATION = 10;


/**
 * validate URI
 * @param str
 * @returns {boolean}
 */
function isURL(str) {
    var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    var url = new RegExp(urlRegex, 'i');
    return !str?false:str.length < 2083 && url.test(str);
}

/**
 * Parse received text a DOM return as a array
 * @param text 
 * @param posts
 * @returns {array}
 */
function parsePage(text, posts) {
	// define value "element" to store property order 
	// load to value "page" prepared web page 
	var
		element = {
			title: "",
			uri: "",
			author: "",
			points: "",
			comments: "",
			rank: ""
		},
		logFile = fs.createWriteStream('log.txt', {
			flags: 'a'
		}),
		list = [], 
		page = htmlparser.load(text, {normalizeWhitespace: true});


	//parsing HTML to found out required parameters
	page('tr', '.itemlist').each(function(i, elem) {
		var el = page(this);
		if (el.attr('class') == 'athing') {
			element.title = el.children('.title').children('.storylink').text();
			element.uri = el.children('.title').children('.storylink').attr('href');
			element.rank = parseInt(el.children('.title').children('.rank').text());
		}
		if (!el.attr('class')) {
			element.points = parseInt(el.children('.subtext').children('.score').text());
			element.author = el.children('.subtext').children('.hnuser').text();
			element.comments = parseInt(el.children('.subtext').last().text());
		}
		if (el.attr('class') == 'spacer') {
			//check and add element to output lists
			if (
				isURL(element.uri) &&
				element.points >= 0 &&
				element.rank >= 0 &&
				element.comments >= 0 &&
				element.author.length > 0 && element.author.length < 255 &&
				element.title.length > 0 && element.title.length < 255
			) {
					//check for required count of element
					if (posts > list.length) {
						list.push(element)
					} else {
						return list;
					}
			} else {
				//store incorrect data for future investigation
				logFile.write('error element \n' + JSON.stringify(element) + '\n');
			}

			element = {
				title: "",
				uri: "",
				author: "",
				points: "",
				comments: "",
				rank: ""
			};
		}
	});
	return list;
}

/**
 * Load page and collect list
 * @param id 
 * @param posts
 * @list
 */
function loadPage(id, posts, list) {
	return new Promise(function(resolve, reject) {
		var page, responses = [];
		if (posts == 0 ) {
			process.stdout.write(JSON.stringify(list));
		}

		//build url based on recursive function parameter
		https.get(SOURCE + (id > 1 ? 'news?p=' + id : ''), function(res) {
			res.on('data', function(chunk) {
				responses.push(chunk);
			});

			res.on('end', function() {
				list = list.concat(parsePage(responses.join(), posts - list.length));
				//verify that we load required count of data
				//if no repeat proecdure
				//limit number of repeated requests lunch
				id++;
				if (posts <= list.length) {
					resolve(list.slice(0, posts ));
				} else {
					if (id >= MAX_ITERATION) {
						resolve(list);
					} else {
						resolve( 
							new Promise((resolve, reject) => {
								loadPage(id, posts, list)
								  .then(
									response => resolve(response) ,
									error => reject(error)
								  );
							})
						)
					}
				}

			});
		}).on('error', function(e) {
			reject(new Error("Network Error"));
		});
	});
}


/**
 * Recursively load 
 * @param limit
 */
function loadData (limit) {
	return new Promise(function(resolve, reject) {
		loadPage(0, limit, [])
		  .then(
			response =>resolve(response) ,
			error =>  reject(error)
		  );
	});
}

module.exports.isURL = isURL;
module.exports.parsePage = parsePage;
module.exports.loadData = loadData;