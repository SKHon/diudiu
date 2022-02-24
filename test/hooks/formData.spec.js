const request = require('supertest')
const { expect } = require('chai')

describe('formData hooks测试', () => {
	it('request with formData', async () => {
		const res = await request('http://localhost:8888')
			.post('/product/getinfo')
			.field('name', 'luyuhong')

		expect(res.status).to.match(/302|200/)
		expect(res.text).to.equal('my name is luyuhong.')
	})
})
