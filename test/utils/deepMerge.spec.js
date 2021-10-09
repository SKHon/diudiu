const deepMerge  = require('../../lib/dist/core/utils/tools').deepMerge;
const { expect } = require('chai')

describe('工具类函数测试', () => {
  it('检测 deepMerge 方法', async () => {
    const obj1 = { name: 'liujianghong', age: 29 };
    const obj2 = { name: 'liujianghong1', age: 30 };
    expect(deepMerge(obj1, obj2)).deep.equal({
      name: 'liujianghong1',
      age: 30
    })
  })
})


