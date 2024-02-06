/**
 *  === controller ===
 *  route: <%= route %>
 *  created at: <%= createdAt %>
 */
export default {
  method: 'GET',
  handler: async (ctx) => {
    ctx.body = 'my name is diudiu';
  }
}