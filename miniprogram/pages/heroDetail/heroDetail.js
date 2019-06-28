import API from "../../utils/api";
const { getHeroDetail, getFullHeroDetails } = API;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hero: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getFullHeroDetails(parseInt(options.ename)).then(res => {
      this.setData({
        hero: res.result
      });
    });
  }
});
