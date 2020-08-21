/**
 * MidasAds.js
 * @desc 用于统一处理广告管理系统数据的组件，包括时间有效性、终端展示校验等
 * @author maxjchuang @ 2017/09/22
 * @param string name 如果初始化时直接传入字符串，则等同于传入opt.name
 * @param string opt.name 广告位在系统中配置的英文标识(必选)
 * @param string opt.prefix 全局变量前缀，默认为midasAdsConfig_，一般不用传(可选)
 * @param string opt.serverTime 当前服务器时间，不传默认为浏览器当前时间(可选)
 * @param enum opt.device [ios, android, pc] 当前终端类型，不传自动取UA中的值(可选)
 * @param enum opt.app [wx, qq, web] 当前浏览器类型，不传自动取UA中的值(可选)
 * @param object opt.data: 广告信息数据，直接传入广告信息，json方式获取数据时会用到(可选)
 * @return class MidasAds 
 */

;(function (root, factory) {
  "use strict"

  if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(factory)
  } else if (typeof module != 'undefined' && module.exports) {
    module.exports = factory()
  } else {
    root.MidasAds = factory()
  }
})(this, function () {

  // // Array.indexOf polyfill
  // if(!Array.prototype.indexOf) {
  //   Array.prototype.indexOf = function(obj, start) {
  //   }
  // }

  function inArray(arr,obj,start){
      for (var i = (start || 0), j = arr.length; i < j; i++) {
          if (arr[i] === obj) { return i; }
      }
      return -1;
  }

  var MidasAds = function (options) {
    var defaultOptions = {
      prefix: 'midasAdsConfig_'
    }
    if (typeof options === 'string') options = {name: options}
    this.opts = this.extend(defaultOptions, options)

    this.ads = typeof this.opts.data === 'object' ? this.opts.data : (typeof window === 'object' ? window : global)[this.opts.prefix + this.opts.name]

    this.init()
  }

  MidasAds.get = function (options, code) {
    if (typeof options == 'undefined') {
      return []
    }

    var midasAds = new MidasAds(options)
    return midasAds.get(code)
  }

  MidasAds.prototype = {

    init: function () {
      this.ua = this.getUa()
      this.deviceApp = this.getDeviceApp()
    },

    extend: function (source) {
      for (var i=1; i <= arguments.length; i++) {
        for(var key in arguments[i]) {
          source[key] = arguments[i][key]
        }
      }
      return source
    },

    getUa: function () {
      var ua = {}
        , agent = navigator.userAgent
        , m

      ua.iPod = agent.indexOf('iPod') > -1
      ua.iPad = agent.indexOf('iPad') > -1
      ua.iPhone = agent.indexOf('iPhone') > -1
      agent.indexOf('Android') > -1 && (ua.android = parseFloat(agent.slice(agent.indexOf("Android") + 8)))
      if(ua.iPad || ua.iPhone || ua.iPod){
        m = /OS (\d+)[_|\.]/.exec(agent)
        ua.iOS = m && parseInt(m[1], 10) || true
      }
      ua.wp = agent.indexOf('Windows Phone') > -1

      // 微信UA
      m = / MicroMessenger\/([0-9\.]+)/i.exec(agent)
      m && (ua.weixin = parseFloat(m[1], 10))

      // 手QUA
      m = / QQ\/([0-9\.]+)/i.exec(agent)
      m && (ua.QQ = parseFloat(m[1], 10))

      // 手QUA
      m = / QQ\/([0-9\.]+)/i.exec(agent)
      m && (ua.mqq = m[1])

      return ua
    },

    getDeviceApp: function () {
      var device = this.opts.device || (this.ua.android ? 'android' : (this.ua.iOS ? 'ios' : 'pc'))
      var app = this.opts.app || (this.ua.weixin ? 'wx' : (this.ua.QQ ? 'qq' : 'web'))

      return device + '_' + app
    },

    validate: function (data) {
      if (typeof data !== 'object' || typeof data.resId == 'undefined') return false

      var onlineTime = new Date(data.onlineTime)
        , offlineTime = new Date(data.offlineTime)
        , now = this.opts.serverTime ? new Date(this.opts.serverTime) : new Date()

      if (now.getTime() < onlineTime.getTime()) return false
      if (now.getTime() > offlineTime.getTime()) return false

      if(inArray(data.display,this.deviceApp)==-1) return false
      // if (data.display.indexOf(this.deviceApp) < 0) return false

      return true
    },

    getRes: function (data) {
      if (this.validate(data)) {
        return {
          adsId: this.ads.adsId,
          resId: data.resId,
          code: data.code,
          title: data.title,
          summary: data.summary,
          tag: data.tag,
          url: data.url,
          link: data.links[this.deviceApp],
          onlineTime: data.onlineTime,
          offlineTime: data.offlineTime
        }
      } else {
        return undefined
      }
    },

    get: function (code) {
      var self = this

      if (!this.ads) return []

      switch (this.ads.type) {
        // 单个广告位
        case 1:
          var result = this.getRes(this.ads.data)
          return result ? [result] : []
        break

        // 业务广告位
        case 2:
          var topRes = typeof this.ads.data['*'] == 'object' && this.validate(this.ads.data['*']) ? this.getRes(this.ads.data['*']) : undefined
          if (topRes) {
            return [topRes]
          } else {
            var result = code && typeof this.ads.data == 'object' ? this.getRes(this.ads.data[code]) : undefined
            return result ? [result] : []
          }
        break

        // 轮播广告位
        case 3:
          if (typeof this.ads.data == 'object' && this.ads.data.length) {
            var item, result = []
            for (var i = 0; i < this.ads.data.length; i++) {
              item = self.getRes(this.ads.data[i])
              if (item) result.push(item)
            }
            return result
          } else {
            return [] 
          }
        break
      }
    }

  }

  return MidasAds
})

