const cloud = require("wx-server-sdk");

cloud.init({
  env: "xiami-opycn"
});
const db = cloud.database();

exports.main = async () => {
  let res = await db.collection("last3NewHeroes").get();
  let items = res.data[0].last3NewHeroes;
  return items.map(item => {
    return {
      ename: item.ename,
      cname: item.cname
    };
  });
};
