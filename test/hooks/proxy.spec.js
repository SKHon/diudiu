
const request = require('supertest')
const { expect } = require('chai')

describe('proxy hooks测试', () => {
  
  it('proxy 调用通过', async () => {
    const res = await request('http://localhost:8888').get('/goods/getinfo')
    expect( res.status ).to.equal(200)
  })

})