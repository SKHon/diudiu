export default {
  "GET /user/list": [
    {
      id: 1,
    },
  ],
  "GET /user/info": (ctx) => {
    return {
      id: 1,
      username: "sky",
      age: 22,
      gender: "0",
    };
  },
};
