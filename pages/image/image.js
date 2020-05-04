// pages/image/image.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight:getApp().globalData.navHeight,
    statusHeight:getApp().globalData.statusHeight,
  },

  back(){
    wx.navigateBack({
      delta: 1
    });  
  },

  sa(){
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        wx.canvasToTempFilePath({
          canvas: canvas,
          success: (result) => {
            wx.saveImageToPhotosAlbum({
              filePath: result.tempFilePath,
              success: (res) => {
                console.log(res)
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  
                })
              },
              fail(res) {
                  console.log(res)
              }
          }) 
          },
        }, this);
      })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        const width=res[0].width
        const height=res[0].height
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)

        ctx.fillStyle = 'white';  
        ctx.fillRect(0,0,width,height)
        ctx.save()
        ctx.beginPath()
        ctx.arc(width/2, height/2, width/2, 0, 2*Math.PI)
        ctx.clip() 
        var image=canvas.createImage()
        image.src='/icon/temp1.png'
        image.onload = () => {
          ctx.drawImage(image,0,0,width,height)
          ctx.restore()
        }
      })
  },
})