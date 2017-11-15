const slack = require('./lib/slack.js')
const path = require('./config/pathToken.js')
const util = require('./util/utils.js')

const payload = {
	channel: '#busuol',
	username: 'UOLnibus',
	text: 'busão saindo em breve',
	icon_emoji: ':bus:'
}

const warnings = [10, 5]

const stations = ['Santa Cecília', 'República']

const departures = [
	{time: '18:15', stations: [0,1]},
	{time: '18:35', stations: [0,1]},
	{time: '18:55', stations: [0,1]},
	{time: '19:15', stations: [0,1]},
	{time: '19:35', stations: [0,1]},
	{time: '19:55', stations: [0,1]},
	{time: '20:15', stations: [0,1]},
	{time: '20:35', stations: [0,1]},
	{time: '21:05', stations: [0,1]},
	{time: '21:35', stations: [0,1]},
	{time: '22:05', stations: [0,1]},
	{time: '22:35', stations: [0,1]},
	{time: '23:05', stations: [0,1]},
	{time: '23:35', stations: [0,1]}
]

const warnsTime = util.calcWarns(util.getTimes(departures), warnings)

setInterval(() => {
	const t = new Date();

	console.log(t)

	if(util.shouldWarn(t, warnsTime))
		slack(path, payload).then(console.log)

}, 60000)
