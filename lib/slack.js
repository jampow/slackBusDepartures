const https = require('https')


const reqConf = path => {
	return {
		host: 'hooks.slack.com',
		path: path,
		method: 'POST'
	}
}

module.exports = (pathAuth, payload) => {
	return new Promise((res, rej) => {
		const req = https.request(reqConf(pathAuth), resp => {
			let content = ''
			resp.on('data', chunk => content += chunk)
			resp.on('end', () => res(content))
		})
		req.on('error', rej)
		req.write(JSON.stringify(payload))
		req.end()
	})
}
