export default {
  'GET /goods/getlist': [
    {
      id: 1,
      goodname: 'book',
      goodpic: './images/1.png',
    },
    {
      id: 2,
      goodname: 'pen',
      goodpic: './images/2.png',
    }
  ],
  'GET /goods/getinfo': (ctx) => {
    // console.log(ctx);
    return {
      id: 1,
      goodname: 'book',
      goodpic: './images/1.png',
    };
  },
};
