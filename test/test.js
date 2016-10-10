'use strict';

var expect = require('chai').expect;
var parser = require('../src/parser.js');
var promt = require('../src/promt.js');

describe('parsing page', () => {
    it('should return array of 2 item', () => {
        var res = parser.parsePage(`                        <table class="itemlist" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                                <tr class="athing" id="12657522">
                                    <td class="title" valign="top" align="right"><span class="rank">1.</span></td>
                                    <td class="votelinks" valign="top">
                                        <center>
                                            <a id="up_12657522" href="vote?id=12657522&amp;how=up&amp;goto=news">
                                                <div title="upvote" class="votearrow"></div>
                                            </a>
                                        </center>
                                    </td>
                                    <td class="title"><a class="storylink" href="https://www.newscientist.com/article/2108296-first-farm-to-grow-veg-in-a-desert-using-only-sun-and-seawater/">First farm to grow vegetables in a desert using only sun and seawater</a><span class="sitebit comhead"> (<a href="from?site=newscientist.com"><span class="sitestr">newscientist.com</span></a>)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td class="subtext">
                                        <span class="score" id="score_12657522">177 points</span> by <a class="hnuser" href="user?id=rmason">rmason</a> <span class="age"><a href="item?id=12657522">4 hours ago</a></span> <span id="unv_12657522"></span> | <a href="hide?id=12657522&amp;goto=news">hide</a> | <a href="item?id=12657522">55&nbsp;comments</a> </td>
                                </tr>
                                <tr class="spacer" style="height:5px"></tr>
                                <tr class="athing" id="12654499">
                                    <td class="title" valign="top" align="right"><span class="rank">2.</span></td>
                                    <td class="votelinks" valign="top">
                                        <center>
                                            <a id="up_12654499" href="vote?id=12654499&amp;how=up&amp;goto=news">
                                                <div title="upvote" class="votearrow"></div>
                                            </a>
                                        </center>
                                    </td>
                                    <td class="title"><a class="storylink" href="https://www.google.com/get/noto/">Google Noto Fonts</a><span class="sitebit comhead"> (<a href="from?site=google.com"><span class="sitestr">google.com</span></a>)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td class="subtext">
                                        <span class="score" id="score_12654499">843 points</span> by <a class="hnuser" href="user?id=bpierre">bpierre</a> <span class="age"><a href="item?id=12654499">12 hours ago</a></span> <span id="unv_12654499"></span> | <a href="hide?id=12654499&amp;goto=news">hide</a> | <a href="item?id=12654499">220&nbsp;comments</a> </td>
                                </tr>
                                <tr class="spacer" style="height:5px"></tr>
                                <tr class="athing" id="12657618">
                                    <td class="title" valign="top" align="right"><span class="rank">3.</span></td>
                                    <td class="votelinks" valign="top">
                                        <center>
                                            <a id="up_12657618" href="vote?id=12657618&amp;how=up&amp;goto=news">
                                                <div title="upvote" class="votearrow"></div>
                                            </a>
                                        </center>
                                    </td>
                                    <td class="title"><a class="storylink" href="https://www.ventusky.com/?p=26.33;-79.10;6&amp;l=gust&amp;t=20161007/08&amp;w=0xIAb9A9A">Hurricane Matthew Visualization</a><span class="sitebit comhead"> (<a href="from?site=ventusky.com"><span class="sitestr">ventusky.com</span></a>)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td class="subtext">
                                        <span class="score" id="score_12657618">109 points</span> by <a class="hnuser" href="user?id=ValG">ValG</a> <span class="age"><a href="item?id=12657618">4 hours ago</a></span> <span id="unv_12657618"></span> | <a href="hide?id=12657618&amp;goto=news">hide</a> | <a href="item?id=12657618">15&nbsp;comments</a> </td>
                                </tr>
                                <tr class="spacer" style="height:5px"></tr>
                            </tbody>
                        </table>
                    </td>
                </tr>								`,2);
        expect(res).to.have.lengthOf(2);
    });	
    it('should be empty', () => {
        var res = parser.parsePage(`                        <table class="itemlist" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                                <tr class="athing" id="12657522">
                                    <td class="title" valign="top" align="right"><span class="rank">1.</span></td>
                                    <td class="votelinks" valign="top">
                                        <center>
                                            <a id="up_12657522" href="vote?id=12657522&amp;how=up&amp;goto=news">
                                                <div title="upvote" class="votearrow"></div>
                                            </a>
                                        </center>
                                    </td>
                                    <td class="title"><a class="storylink" href="https://www.newscientist.com/article/2108296-first-farm-to-grow-veg-in-a-desert-using-only-sun-and-seawater/">First farm to grow vegetables in a desert using only sun and seawater</a><span class="sitebit comhead"> (<a href="from?site=newscientist.com"><span class="sitestr">newscientist.com</span></a>)</span>
                                    </td>
                                </tr>
                               
                            </tbody>
                        </table>
                    </td>
                </tr>								`,2);
        expect(res).to.be.empty;
    });
    it('should return array ittem with correct data', () => {
        var res = parser.parsePage(`                        <table class="itemlist" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                                <tr class="athing" id="12657522">
                                    <td class="title" valign="top" align="right"><span class="rank">1.</span></td>
                                    <td class="votelinks" valign="top">
                                        <center>
                                            <a id="up_12657522" href="vote?id=12657522&amp;how=up&amp;goto=news">
                                                <div title="upvote" class="votearrow"></div>
                                            </a>
                                        </center>
                                    </td>
                                    <td class="title"><a class="storylink" href="https://www.newscientist.com/article/2108296-first-farm-to-grow-veg-in-a-desert-using-only-sun-and-seawater/">First farm to grow vegetables in a desert using only sun and seawater</a><span class="sitebit comhead"> (<a href="from?site=newscientist.com"><span class="sitestr">newscientist.com</span></a>)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td class="subtext">
                                        <span class="score" id="score_12657522">177 points</span> by <a class="hnuser" href="user?id=rmason">rmason</a> <span class="age"><a href="item?id=12657522">4 hours ago</a></span> <span id="unv_12657522"></span> | <a href="hide?id=12657522&amp;goto=news">hide</a> | <a href="item?id=12657522">55&nbsp;comments</a> </td>
                                </tr>
                                <tr class="spacer" style="height:5px"></tr>
                                <tr class="athing" id="12654499">
                                    <td class="title" valign="top" align="right"><span class="rank">2.</span></td>
                                    <td class="votelinks" valign="top">
                                        <center>
                                            <a id="up_12654499" href="vote?id=12654499&amp;how=up&amp;goto=news">
                                                <div title="upvote" class="votearrow"></div>
                                            </a>
                                        </center>
                                    </td>
                                    <td class="title"><a class="storylink" href="https://www.google.com/get/noto/">Google Noto Fonts</a><span class="sitebit comhead"> (<a href="from?site=google.com"><span class="sitestr">google.com</span></a>)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td class="subtext">
                                        <span class="score" id="score_12654499">843 points</span> by <a class="hnuser" href="user?id=bpierre">bpierre</a> <span class="age"><a href="item?id=12654499">12 hours ago</a></span> <span id="unv_12654499"></span> | <a href="hide?id=12654499&amp;goto=news">hide</a> | <a href="item?id=12654499">220&nbsp;comments</a> </td>
                                </tr>
                                <tr class="spacer" style="height:5px"></tr>
                                <tr class="athing" id="12657618">
                                    <td class="title" valign="top" align="right"><span class="rank">3.</span></td>
                                    <td class="votelinks" valign="top">
                                        <center>
                                            <a id="up_12657618" href="vote?id=12657618&amp;how=up&amp;goto=news">
                                                <div title="upvote" class="votearrow"></div>
                                            </a>
                                        </center>
                                    </td>
                                    <td class="title"><a class="storylink" href="https://www.ventusky.com/?p=26.33;-79.10;6&amp;l=gust&amp;t=20161007/08&amp;w=0xIAb9A9A">Hurricane Matthew Visualization</a><span class="sitebit comhead"> (<a href="from?site=ventusky.com"><span class="sitestr">ventusky.com</span></a>)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td class="subtext">
                                        <span class="score" id="score_12657618">109 points</span> by <a class="hnuser" href="user?id=ValG">ValG</a> <span class="age"><a href="item?id=12657618">4 hours ago</a></span> <span id="unv_12657618"></span> | <a href="hide?id=12657618&amp;goto=news">hide</a> | <a href="item?id=12657618">15&nbsp;comments</a> </td>
                                </tr>
                                <tr class="spacer" style="height:5px"></tr>
                            </tbody>
                        </table>
                    </td>
                </tr>								`,2);
		
        expect(res[0].title).to.equal("First farm to grow vegetables in a desert using only sun and seawater");
        expect(res[0].uri).to.equal("https://www.newscientist.com/article/2108296-first-farm-to-grow-veg-in-a-desert-using-only-sun-and-seawater/");
        expect(res[0].author).to.equal("rmason");
        expect(res[0].points).to.equal(177);
        expect(res[0].comments).to.equal(177);
        expect(res[0].rank).to.equal(1);		
    });

});

describe('validate URL', () => {	
	it('should validate URL', () => {
		expect(parser.isURL('https://news.ycombinator.com/')).to.be.true;
	});

	it('should reject incorect URL', () => {
		expect(parser.isURL("some test http://sdfsdf.dsd.ds/")).to.be.false;
	});
});

describe('validate post parameters', () => {	
	it('should parse command line arguments', () => {
		let argv = ['--posts', 99];
		expect(promt.loadParameters(argv)).to.be.equal(99);
	});

	it('should parse return -1', () => {
		let argv = [];
		expect(promt.loadParameters(argv)).to.be.equal(-1);
	});
});