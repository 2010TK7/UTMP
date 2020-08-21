
(function(ABTest,ipay,LIB,W,INFO,$){var actid=LIB.getUrlParam('actid')
var aid=LIB.getUrlParam('aid')
var originPrice=IPAY.data.price
window.globalPrice={"MA20160126193653791":{"3":9,"12":8}}
$('#amount_input').on('keyup blur',function(){IPAY.updateAmount($(this).val());});ABTest.before(IPAY,'submit',function(opts){opts=opts||{};opts.data=opts.data||{};if(IPAY.data.code=='qqacct_save'){IPAY.data.price=1;opts.data.mp_id='';opts.data.noadjust='';}
return[opts];});ABTest.before(IPAY,'updateAmount',function(amount){setPriceDiscount(amount)
if(IPAY.data.code=='qqacct_save'){return[Math.ceil(amount)]}});ABTest.after(IPAY,'updateAmount',function(amount){if(IPAY.current_channel=="weixin"){scanWeixinQrCode()}});ABTest.before(IPAY,'setCurrentChannel',function(args){setPriceDiscount(IPAY.amount)});ABTest.after(IPAY,'setCurrentChannel',function(args){if(channel=="weixin"){scanWeixinQrCode()}});ABTest.before(IPAY,'selectChannel',function(channel){if(channel=="weixin"){return[channel,scanWeixinQrCode]}});function scanWeixinQrCode(){}
function setPriceDiscount(amount){if(IPAY.data.code=='qqacct_save'){IPAY.data.price=1;}
var discountInfo=window.globalPrice[actid]
if(discountInfo&&discountInfo[amount]){IPAY.data.price=originPrice*discountInfo[amount]*10/100}
else{IPAY.data.price=originPrice}}
if(window.globalPrice[actid]){$("#amount_input_field .controls").append('<div class="help-normal" style="display: block;">\
                    <i class="icon-mark-discount"></i>1个月50元；3个月'+window.globalPrice[actid]["3"]+'折；12个月'+window.globalPrice[actid]["12"]+'折！\
                </div>')}
$("#left_sidebar").append('<div style=" color:#666;float: left;margin-top: 15px;margin-left: 10px;">\
                    <span>核心权益:</span>\
                    <ol>\
                        <li>1.免广告</li>\
                        <li>2.1080p蓝光高清</li>\
                        <li>3.多视角现场体验</li>\
                    </ol>\
                </div>')
setTimeout(function(){setPriceDiscount(IPAY.amount)
IPAY.onAmountChange(IPAY.amount)})})(ABTest,IPAY,LIB,window,INFO,$)/*  |xGv00|edcb61a1890fef4aa9f62d589a23efa5 */