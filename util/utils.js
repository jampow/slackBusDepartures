const functions = {
	getTimes: list => list.map(item => item.time),

	shouldWarn: (now, warns) => {
		const timeNow = functions.normalizeTime(now.getHours(), now.getMinutes())
		return warns.indexOf(timeNow) !== -1
	},

	calcWarns: (times, warns) => {
		return times.map(time => {
			return warns.map(w => functions.subMinutes(time, w))
		}).reduce((acc, i) => acc.concat(i), [])
	},

	subMinutes: (time, minutes) => {
		const [h,m] = time.split(':').map(i => +i)
		let newMin = m - minutes
		let newHou = h

		if(newMin < 0){
			newMin = 60 + newMin

			if(--newHou < 0){
				newHou = 24 + newHou
			}
		}


		return functions.normalizeTime(newHou,newMin)
	},

	normalizeTime: (h, m) => {
		return [h, m]
			.map(i => `0${i}`.substr(-2))
			.join(':')
	}
	
}

module.exports = functions
