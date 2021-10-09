
const request = require('supertest')
const { expect } = require('chai')
const child_process = require('child_process')

describe('hooks测试', () => {
  
  it('action text 调用通过', async () => {
    const res = await request('http://localhost:8888').get('/user/getinfo')
    expect( res.status ).to.equal(200)
    expect( res.text ).to.equal('my name is liujianghong')
  })

})