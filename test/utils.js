const expect = require('chai').expect
const util = require('../util/utils.js')

describe('Utils', () => {

	it('deve retornar um array de horários', () => {
		const result = util.getTimes([
			{time: '00:00'}, {time: '01:00'}, {time: '02:00'}
		])
		expect(result)
			.to.be.an('array')
			.and.to.include.members(['00:00','01:00','02:00'])
	})

	describe('cálculos de tempo', () => {

		it('deve retornar 02:01 - 2 = 01:59', () => {
			const time = util.subMinutes('02:01', 2)
			expect(time).to.be.equal('01:59')
		})

		it('deve retornar 00:01 - 6 = 23:55', () => {
			const time = util.subMinutes('00:01', 6)
			expect(time).to.be.equal('23:55')
		})
	})

	it('deve trazer todos os horários aonde serão dados os warnings', () => {
		const warns = util.calcWarns(['00:00', '01:00', '02:00'],[10, 5])
		expect(warns)
			.to.be.an('array')
			.and.to.include.members([
				'23:50', 
				'23:55', 
				'00:50', 
				'00:55', 
				'01:50', 
				'01:55'
			])

	})

	it('deve retornar true se faltar 10 min pro horário passado', () => {
		const now = new Date('03/07/1985 00:05')
		const warns = ['00:00', '00:05']

		const should = util.shouldWarn(now, warns)
		expect(should).to.be.true
	})
})

