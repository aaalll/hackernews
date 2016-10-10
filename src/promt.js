'use strict';

//verify parameters send in console
function loadParameters(argv){
	argv = argv || process.argv;
	if (argv.indexOf('--posts')>-1 && argv.length == argv.indexOf('--posts') + 2) {
		var posts = parseInt(argv[argv.length - 1]);
		if (posts > 100) {
			console.log('Wrong parameters: too many post: ' + posts);
			return -1;
		} else {
			if (posts == 0) {
				return 0;
			} else {
				if (posts >= 0) {
					return posts;
				} else {
					console.log('Wrong parameters: incorect post: ' + argv[argv.length - 1]);
					return -1;
				}
			}
		}
	} else {
		console.log('Wrong parameters: no posts');
		return -1;
	}
}


module.exports.loadParameters = loadParameters;