// pages/commend/commend.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    otherHeight: getApp().globalData.navHeight+getApp().globalData.statusHeight, 
    tabs:[
      {
        id:0,
        name:"热门",
        isActive:true
      },
      {
        id:1,
        name:"最新",
        isActive:false
      },
      {
        id:2,
        name:"情侣",
        isActive:false
      },
      {
        id:3,
        name:"女生",
        isActive:false
      },
      {
        id:4,
        name:"男生",
        isActive:false
      },
      {
        id:5,
        name:"闺蜜",
        isActive:false
      },
      {
        id:6,
        name:"动漫",
        isActive:false
      },
    ],
    swiperList:[],  //横向轮播图
    catesList:[],   //分类导航栏
    vercialList:[], //竖向轮播图
    dailyList:[],   //每日精选
    imageList:[],   //图片列表
    index:0
  },

  //处理item切换操作
  handleItemChange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData(
      {
        tabs,
        index,
        imageList:[]
      })
    this.getImageList();
  },

  //获取横向轮播图数据
  getSwiperList(){
    const db = wx.cloud.database();
    db.collection('swiper_img').doc('0dee15725e72e2fe00031f7078ca714d').get().then(res => {
      // res.data 包含该记录的数据
      this.setData({
        swiperList:res.data.swiperList
      })
    })
  },

  //获取分类导航数据
  getCatesList(){
    const db = wx.cloud.database();
    db.collection('cates_msg').get().then(res => {
      // res.data 包含该记录的数据
      this.setData({
        catesList:res.data
      })
    })
  },

  //获取竖向轮播图数据
  getVercialList(){
    const db = wx.cloud.database();
    db.collection('headline').doc('d7e7dede5e7347420006099230b8cfb3').get().then(res => {
      // res.data 包含该记录的数据
      this.setData({
        vercialList:res.data.headline_list
      })
    })
  },

  //获取每日精选
  getDailyList(){
    const db = wx.cloud.database();
    db.collection('daily').doc('ae7e55b35e73829f0008771977913fb3').get().then(res => {
      // res.data 包含该记录的数据
      this.setData({
        dailyList:res.data.temp_img
      })
    })
  },

  //获取图片列表
  getImageList(){
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('img_group').where({
      cat_id:this.data.index+1
    }).get().then(res => {
      // res.data 包含该记录的数据
      this.setData({
        imageList:res.data
      })
    })
  },

  //到达底部
  reachBottom(){
    console.log("iii");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getCatesList();
    this.getVercialList();
    this.getDailyList();
    this.getImageList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("chudi");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})