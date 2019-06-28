import Promise from "./bluebird.min";

wx.cloud.init({
  env: "xiami-opycn"
});

const db = wx.cloud.database();
const _ = db.command;

module.exports = {
  getHeroList() {
    return wx.cloud.callFunction({
      name: "getHeroList"
    });
  },
  getNewHeroes() {
    return wx.cloud.callFunction({
      name: "getNewHeroes"
    });
  },
  getHeroType() {
    return db.collection("herotype").get();
  },
  getFullHeroDetails(ename) {
    return wx.cloud.callFunction({
      name: "getFullHeroDetails",
      data: {
        ename
      }
    });
  }
};
