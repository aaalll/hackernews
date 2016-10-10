#!/usr/bin/env node
'use strict';

var promt = require('./src/promt.js'),
	parser = require('./src/parser.js');

parser.loadData(promt.loadParameters()).then((response) => {
    //Output data to STDOUT
    process.stdout.write(JSON.stringify(response))
});