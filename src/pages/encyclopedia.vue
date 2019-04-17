<template>
  <div>
    <head-nav></head-nav>
    <div class="variety">
      <div class="title">
        <h2>猫百科</h2>
        <div class="filtrate">
          <div>
            按体型：
            <el-radio-group v-model="somatotype" size="mini" fill="#cc0033">
              <el-radio-button label="全部" value="0" ></el-radio-button>
              <el-radio-button label="小型" value="1" ></el-radio-button>
              <el-radio-button label="中型" value="2" ></el-radio-button>
              <el-radio-button label="大型" value="3" ></el-radio-button>
            </el-radio-group>
          </div>
          <div>
            按毛长：
            <el-radio-group v-model="furlength" size="mini" fill="#cc0033" >
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="短毛"></el-radio-button>
              <el-radio-button label="长毛"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="close" @click="closevariety">
          <div v-if="variety">
            收起 <i class="el-icon-arrow-up"></i>
          </div>
          <div v-else>
            展开 <i class="el-icon-arrow-down"></i>
          </div>
        </div>
      </div>
      <transition name="el-zoom-in-top">
        <div class="variety-items" v-show="variety">
          <div class="variety-item" v-for="(item,index) in afterselect" :key="index">
            <img :src="item.classimgs" @click="choosecat(item.classid[0])">
            <font>{{item.classname[0]}}</font>
          </div>
        </div>
      </transition>
    </div>
    <div class="content">
      <div class="title"><div></div><h2>{{catname}}</h2><div></div></div>
      <ul class="introduce" v-show="catid">
        <li><img src="../../static/assets/images/cat3.jpg" alt=""> <h5>相册（5张照片）</h5></li>
       <li><div>1</div><h3>{{catname}}品种简介</h3></li>
        <li><span v-html="encyc.variaty"></span></li>
        <li><div>2</div><h3>{{catname}}形态特征</h3></li>
        <li><span v-html="encyc.form"></span></li>
        <li><div>3</div><h3>{{catname}}性格特点</h3></li>
         <li><span v-html="encyc.character"></span></li>
        <li><div>4</div><h3>{{catname}}养护知识</h3></li>
         <li><span v-html="encyc.nurse"></span></li>
        <li><div>5</div><h3>{{catname}}喂食要点</h3></li>
         <li><span v-html="encyc.feed"></span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import goodsNav from '../components/goodsNav'
  import HeadNav from "../components/headNav";
  export default {
    name: 'cat',
    data() {
      return {
        somatotype: '', furlength: '',
        variety: true,
        ifchecked: '',
        catname: "请选择您要查询的品种猫", catid: 0,
        encyclist:[],
        encyc:{}
      }
    },
    components: {
      HeadNav,
      goodsNav
    },
    methods: {
      closevariety() {
        this.variety = !this.variety
      },
      choosecat(id) {
        this.classlist.forEach((item) => {
          if (item.classid[0] === id) {
            this.catname = item.classname[0];
            this.catid = item.classid[0];
          }
        });
        for(let item of this.encyclist){
          if(this.catid===item.classid){
            this.encyc=item;
            break;
          }
        }
      },
    },
    computed: {
      classlist() {
        return this.$GoodsClass
      },
      //体型和毛长的筛选
      afterselect() {
        //都选全部
        if (
          (!this.somatotype || this.somatotype === "全部") && (!this.furlength || this.furlength === "全部")
        ) {
          return this.classlist
        }
        // 只选体型
        else if (
          (this.somatotype === "小型") && (!this.furlength || this.furlength === "全部")
        ) {
          return this.classlist.filter(function (item) {
            return item.somatotype[0] === "小型"
          })
        } else if (
          (this.somatotype === "中型") && (!this.furlength || this.furlength === "全部")
        ) {
          return this.classlist.filter(function (item) {
            return item.somatotype[0] === "中型"
          })
        } else if (
          (this.somatotype === "大型") && (!this.furlength || this.furlength === "全部")
        ) {
          return this.classlist.filter(function (item) {
            return item.somatotype[0] === "大型"
          })
        }
        //只选毛长
        else if (
          (!this.somatotype || this.somatotype === "全部") && (this.furlength === "长毛")
        ) {
          return this.classlist.filter(function (item) {
            return item.furlength[0] === "长毛"
          })
        } else if (
          (!this.somatotype || this.somatotype === "全部") && (this.furlength === "短毛")
        ) {
          return this.classlist.filter(function (item) {
            return item.furlength[0] === "短毛"
          })
        }
        //体型毛长都选
        else if (
          (this.somatotype === "小型") && (this.furlength === "长毛")
        ) {
          return this.classlist.filter(function (item) {
            return item.somatotype[0] === "小型" && item.furlength[0] === "长毛"
          })
        } else if (
          (this.somatotype === "小型") && (this.furlength === "短毛")
        ) {
          return this.classlist.filter(function (item) {
            return item.somatotype[0] === "小型" && item.furlength[0] === "短毛"
          })
        } else if (
          (this.somatotype === "中型") && (this.furlength === "长毛")
        ) {
          return this.classlist.filter(function (item) {
            return item.somatotype[0] === "中型" && item.furlength[0] === "长毛"
          })
        } else if (
          (this.somatotype === "中型") && (this.furlength === "短毛")
        ) {
          return this.classlist.filter(function (item) {
            return item.somatotype[0] === "中型" && item.furlength[0] === "短毛"
          })
        } else if (
          (this.somatotype === "大型") && (this.furlength === "长毛")
        ) {
          return this.classlist.filter(function (item) {
            return item.somatotype[0] === "大型" && item.furlength[0] === "长毛"
          })
        } else if (
          (this.somatotype === "大型") && (this.furlength === "短毛")
        ) {
          return this.classlist.filter(function (item) {
            return item.somatotype[0] === "大型" && item.furlength[0] === "短毛"
          })
        }
      },
      
    },
    mounted(){
      this.axios.get(this.$domain+'/api/encyclopediaInfo').then(res=>{
        this.encyclist=res.data
      }).catch(err=>{
        console.log(err)
      })
    }
  }
</script>
<style scoped>

  .variety {
    width: 100%;
  }

  .variety .title {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #5e5e5e;
    color: white;
    padding: 0 30px;
    box-sizing: border-box;
  }

  .variety .title .filtrate {
    display: flex;
    justify-content: space-around;
    font-size: 13px;
    width: 600px;
    margin-left: -400px;
    padding-left: 170px;
  }

  .variety .title .close {
    cursor: pointer;
  }

  .variety .variety-items {
    width: 100%;
    padding-bottom: 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 2px #ddd;
    background: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: space-around;
  }

  .variety .variety-items .variety-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    width: 95px;
    height: 70px;
    padding: 10px;
  }

  .variety .variety-items .variety-item img {
    height: 47px;
    width: 47px;
    border-radius: 50%;
    box-shadow: 3px 3px 5px #303030;
    cursor: pointer;
  }

  .content .title {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #5e5e5e;
    color: white;
    padding: 0 30px;
    box-sizing: border-box;
    font-size: 13px;
  }
  .content img{
    height: 120px;width: 120px;
    border: 5px solid white;
  }
  .introduce{
    list-style: none;
    position: relative;
    width: 100%;
    padding: 20px 0 0 200px;
    box-sizing: border-box;
  }
  .introduce li{
    display: flex;
    margin: 15px 0;
  }
  .introduce li:nth-child(1){
    display: flex;flex-direction: column;
    position: absolute;left: 20px; top: 20px;
  }
  .introduce li div{
    width: 25px;height: 25px;border-radius: 5px;
    background: #cc0033;
    color: white;
    text-align: center;line-height:25px;
    margin-right: 10px;
  }

</style>


