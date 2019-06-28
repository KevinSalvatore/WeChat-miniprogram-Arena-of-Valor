import API from "../../utils/api";
const { getNewHeroes, getHeroList, getHeroType } = API;

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    labels: {
      rows: [
        [
          {
            type: "normal",
            content: "全部"
          },
          {
            type: "normal",
            content: "解说"
          },
          {
            type: "special",
            content: "♔英雄图谱"
          },
          {
            type: "normal",
            content: "攻略"
          },
          {
            type: "normal",
            content: "新手"
          }
        ],
        [
          {
            type: "normal",
            content: "同人"
          },
          {
            type: "normal",
            content: "娱乐"
          },
          {
            type: "normal",
            content: "赛事"
          },
          {
            type: "normal",
            content: "官方"
          },
          {
            type: "normal",
            content: "冒险"
          },
          {
            type: "normal",
            content: "新闻"
          }
        ]
      ],
      selected: "♔英雄图谱"
    },
    newHeroes: [],
    heroList: [],
    heroType: []
  },
  toHeroDetailPage(e) {
    wx.navigateTo({
      url: `/pages/heroDetail/heroDetail?ename=${e.currentTarget.dataset.ename}`
    });
  },
  select(e) {
    let labels = this.data.labels;
    labels.selected = e.currentTarget.dataset.content;
    this.setData({
      labels
    });
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onLoad() {
    getNewHeroes().then(res => {
      this.setData({
        newHeroes: res.result
      });
    });
    getHeroType().then(res => {
      let data = res.data[0];
      data = Object.keys(data)
        .map(e => parseInt(e))
        .filter(e => e)
        .map(e => {
          return {
            key: e,
            value: data[e]
          };
        });
      this.setData({
        heroType: data
      });
    });
    getHeroList().then(res => {
      this.setData({
        heroList: res.result
      });
    });
  }
});
