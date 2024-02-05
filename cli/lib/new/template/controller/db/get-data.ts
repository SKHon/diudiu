export default {
  method: 'GET',
  handler: async (ctx) => {

    await ctx.elasticsearch.create({
      index: 'student3',
      type: '_doc',
      id: '2',
      body: {
        name: 'liujianghong222',
        sex: 'male22',
        age: 30
      }
    })

    const sql = `INSERT INTO tbl_users(username,nickname) VALUES('liujianghong3','刘江虹3')`;
    ctx.mysql.query(sql, function (error, results, fields) {
      if (error) throw error;
      ctx.log('The results is:', results);
    });

    await ctx.redis.set(`diudiu:user`, 'liujianghong');
    ctx.body = '';

  }
}