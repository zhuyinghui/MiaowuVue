<template>
  <div class="foott">
    <div class="footertop">
      <div class="title">
        <h3>订单服务</h3>
        <h3>服务支持</h3>
        <h3>自助服务</h3>
        <h3>媒体中心</h3>
        <h3>关于公司</h3>
        <h3>关注我们</h3>
      </div>
      <ul class="list">
        <li><a href="">购买指南</a></li>
        <li><a href="">售后服务</a></li>
        <li><a href="">热点咨询</a></li>
        <li><a href="">新闻动态</a></li>
        <li><a href="">公司简介</a></li>
        <li><a href="">新浪微博</a></li>
        <li><a href="">支付方式</a></li>
        <li><a href="">维修门店</a></li>
        <li><a href="">预约购买</a></li>
        <li><a href="">官方视频</a></li>
        <li><a href="">加入我们</a></li>
        <li><a href="">官方微信</a></li>
        <li><a href="">送货政策</a></li>
        <li><a href="">零售门店</a></li>
        <li><a href="">订单物流</a></li>
        <li><a href="">图片资源</a></li>
        <li><a href="">联系我们</a></li>
        <li><a href="">官方贴吧</a></li>
      </ul>
      <div class="phone">
        <h2>177-7329-7786</h2>
        <h5>周一至周日 9:00-18:00</h5>
        <button>在线帮助</button>
      </div>
    </div>
    <div class="footerbottom">
      <ul class="line1">
        <li><h5>喵呜网</h5></li>
        <li>丨</li>
        <li><a href="">法律声明</a></li>
        <li>丨</li>
        <li><a href="">隐私条款</a></li>
        <li>丨</li>
        <li><a href="">开发者中心</a></li>
      </ul>
      <a href="" class="line2">
        湘ICP备案19005953号 &nbsp;
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "footNav"
  }
</script>

<style scoped>
  .foott{
    width: 100%;height: 354px;background: white;
    margin-top: 20px;
    display: flex;flex-direction: column;align-items: center;
    border-top: 1px solid #e6e6e6;
    background: #FAFAFA;
    padding: 0 50px;
    box-sizing: border-box;
    min-width: 800px;
  }
  .footertop{
    width: 100%;height: 233px;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
  }
  .footertop .title,.list{
    width:390px;
    display: flex;flex-direction: row;flex-wrap: wrap;
  }
  .footertop .title{
    margin-bottom: 10px;margin-top: 80px;
  }
  .footertop .title h3,.footertop .list li{
    width: 60px;height: 26px;
    list-style-type: none;
    font-size: 12px;
  }
  .footertop .list li a{
    color: gray;
    text-decoration: none;
  }
  .footertop .phone{
    width: 240px;height: 100%;
    position: absolute;top: 0;right: 0;
    text-align: right;
    padding-top: 80px;

  }
  .footerbottom{
    width: 100%;height: 120px;
  }
  .footerbottom .line1{
    display: flex;flex-direction: row;
    margin-top: 30px;
  }
  .footerbottom .line1 li{
    list-style-type: none;color: gray;
  }
  .footerbottom .line1 li a{
    text-decoration: none;color: dodgerblue;
  }
  .footerbottom .line2{
    text-decoration: none;color: gray;font-size: 12px;
  }

</style>
