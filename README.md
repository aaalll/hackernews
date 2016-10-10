# Node.js scraper for HackerNews
command line application that output news to STDOUT 

## Dependencies
- [cheerio](https://github.com/cheeriojs/cheerio) - Implementation of core jQuery used for HTML parsing.
- [mocha](https://github.com/mochajs/mocha) - Test framework for node.js.
- [chai](https://github.com/mochajs/chai) - BDD / TDD assertion library.

## Installation
`npm install yphackernews`

## How to use
```
hackernews --posts n
```
`---posts n` - required parametes where n number 0..100

## At the moment scraper parse:
- Title
- Link URL
- User
- Points
- Number of comments
- Rank

## Incorect data:
Storing in log.txt

## Used output format
```json
[
    {
        "title": "Web Scraping in 2016",
        "uri": "https://franciskim.co/2016/08/24/dont-need-no-stinking-api-web-scraping-2016-beyond/",
        "author": "franciskim",
        "points": 133,
        "comments": 80,
        "rank": 1
    },
    ...
]

## About me
Email me: [lyst@ukr.net](mailto:lyst@ukr.net)