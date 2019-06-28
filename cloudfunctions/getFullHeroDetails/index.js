const cloud = require("wx-server-sdk");

cloud.init({
  env: "xiami-opycn"
});
const db = cloud.database();
const _ = db.command;

exports.main = async event => {
  return await Promise.all([
    db
      .collection("heroInfo")
      .where({
        ename: _.eq(event.ename)
      })
      .get(),
    db
      .collection("herolist")
      .where({
        ename: _.eq(event.ename)
      })
      .get()
  ]).then(res => {
    let [heroDetail, heroInfo] = res;
    heroDetail = heroDetail.data[0];
    delete heroDetail["_id"];
    heroInfo = heroInfo.data[0];
    delete heroInfo["_id"];
    let obj = {};
    Object.assign(obj, heroDetail, heroInfo);
    return obj;
  });
};
