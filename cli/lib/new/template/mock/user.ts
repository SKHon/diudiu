export default {
  'GET /user/list': [
    {
      id: 1,
    },
  ],
  'GET /user/getinfo': (ctx) => {
    return {
      id: 1,
      username: 'sky',
      age: 22,
      gender: '0',
    };
  },
};
