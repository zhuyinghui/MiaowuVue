<template>
  <div>
    <headnav></headnav>
    <div class="publish">
      <span>您有什么猫需要被领养呢？</span>
      <span>两岁柯尼斯卷毛母猫已绝育，求收留<i class="el-icon-d-arrow-right"></i><i>热门帖</i></span>
      <el-input type="textarea" v-model="words" class="inputt"></el-input>
      <ul>
        <li><img src="../../static/assets/images/smile.png" alt=""><div>表情</div></li>
        <li><img src="../../static/assets/images/picture.png" alt=""><div>图片</div></li>
        <li>
          <el-select v-model="value" placeholder="请选择猫的种类" size="mini">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.classname[0]"
              :value="item.classid[0]">
            </el-option>
          </el-select>
          <el-button type="primary" size="mini">发布</el-button>
        </li>
      </ul>
    </div>
    <div class="showinfo">
        <div class="title">
          <img src="../../static/assets/images/adopt.png">
            <h4>猫咪领养</h4>
        </div>
      <ul class="oneclass" v-for="(item,index) in options">
        <li><img :src="item.classimgs" alt="" /></li>
        <li>最后发表时间：15分钟前</li>
        <li>主题：3</li>
        <li>{{item.classname[0]}}</li>
      </ul>
    </div>

  </div>

</template>

<script>
  import headnav from '../components/headNav'
    export default {
      name:"adopt",
      components:{
        headnav
      },
      data() {
        return {
          options:this.$GoodsClass,
          value: '',
          words:''
        };
      },
      methods: {

      },
      mounted(){
console.log(this.options)
      }
    }
</script>

<style scoped>
.publish{
  width: 100%;
  margin: auto;
  background: white;
  padding: 20px 150px;
  font-size: 14px;
  box-sizing: border-box;
}
  .publish span{
    display: block;
    width: 50%;
    float: left;
    margin-bottom: 10px;
  }
.publish span:nth-child(2){
  text-align: right;
  text-decoration: underline;
  cursor: pointer;
}
  .publish .inputt{
    width: 100%;

  }
  .publish ul{
    width: 100%;
    display: flex;
    list-style:none;
    position: relative;
    margin-top: 10px;
  }
.publish ul li{
  display: flex;align-items: center;
}
.publish ul li div{
  margin: 0 15px 0 5px;
  cursor: pointer;
}
.publish ul li:last-child{
  position: absolute;right: 5px;
}
.publish ul li:nth-child(1) img{
 width: 30px;
}
.publish ul li:nth-child(2) img{
  width: 20px;
}
  .showinfo{
    width: 100%;
    padding: 20px 150px;
    box-sizing: border-box;
    display: flex;flex-wrap: wrap;
    background: white;
  }
  .title{
    width: 100%;
    border-bottom: 1px solid #cc0033;
    margin-bottom: 20px;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
  }
  .title h4{
    margin: 5px;

  }
  .oneclass{
    list-style: none;
    height: 80px;
    width: 260px;
    display: flex;
    padding-left: 20px;
    flex-direction: column-reverse;flex-wrap: wrap;
    align-items: flex-start;justify-content: center;
    background: #fff;
  }
  .oneclass li{
    font-size: 13px;
  }
  .oneclass img{
    width: 70px;height: 70px;
  }
  .oneclass:hover{
    background: #cc0033;
    color: white;
    cursor: pointer;
    transform: translate(0,1px);
    transition: transform 0.2s;

  }
</style>
