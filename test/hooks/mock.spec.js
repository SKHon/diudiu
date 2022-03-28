
const request = require('supertest')
const { expect } = require('chai')

describe('mock hooks测试', () => {
  
  it('mock 调用通过', async () => {
    const res = await request('http://localhost:8888').get('/user/getinfo')
    expect( res.status ).to.equal(200)
  })

})