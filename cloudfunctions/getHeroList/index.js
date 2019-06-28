const cloud = require("wx-server-sdk");

cloud.init({
  env: "xiami-opycn"
});
const db = cloud.database();

exports.main = async () => {
  return await db
    .collection("herolist")
    .get()
    .then(function(res) {
      let items = res.data;
      items = items.map(item => {
        return {
          ename: item.ename,
          cname: item.cname,
          hero_type: item.hero_type
        };
      });
      return Promise.all([
        db.collection("freeHero").get(),
        db.collection("last3NewHeroes").get(),
        db.collection("hotHero").get()
      ]).then(data => {
        let [data1, data2, data3] = data;
        data1 = data1.data[0].sSubContent;
        data2 = data2.data[0].last3NewHeroes.map(item => item.ename);
        data3 = data3.data.map(item => parseInt(item.heroid));
        data3.forEach(index => {
          let _index = items.findIndex(item => {
            return item.ename === index;
          });
          items[_index].type = "H";
        });
        data2.forEach(index => {
          let _index = items.findIndex(item => {
            return item.ename === index;
          });
          items[_index].type = "N";
        });
        data1.forEach(index => {
          let _index = items.findIndex(item => {
            return item.ename === index;
          });
          items[_index].type = "F";
        });
        return items;
      });
    });
};
