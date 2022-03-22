export default {
  "GET /goods/getinfo": (ctx) => {
    console.log(ctx);
    return {
      id: 1,
      goodname: "book",
    };
  },
};
