<template>
    <div>
      <head-nav></head-nav>
      <div class="variety">
        <div class="title">
          <h2>42种猫</h2>
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
        <div class="title"><h2>{{catname}}</h2><font class="showall" @click="showall" v-show="catid">返回全部商品</font><font>{{catsummarize}}</font></div>
        <div class="goods">
          <goods-nav v-for="(item,index) in pageselect" :key="index" :item="item"></goods-nav>
        </div>
        <el-pagination background layout="prev, pager, next"
                       :total="total"
                       :page-size="pagesize"
                       :current-page="currentpage"
                       @current-change="currentchange"
        ></el-pagination>
      </div>
    </div>
</template>

<script>
  import headNav from '../components/headNav'
  import goodsNav from '../components/goodsNav'
    export default {
      name: 'cat',
      data() {
        return {
          somatotype: '', furlength: '',
          variety: true,
          ifchecked: '',
          catname: "全部商品", catsummarize: '', catid: 0,
          total: 40, pagesize: 5, currentpage: 1,
        }
      },
      components: {
        goodsNav,headNav
      },
      methods: {
        closevariety() {
          this.variety = !this.variety
        },
        choosecat(id) {
          this.classlist.forEach((item) => {
            if (item.classid[0] === id) {
              this.catname = item.classname[0];
              this.catsummarize = item.summarize[0];
              this.catid = item.classid[0];
            }
          });
          this.total = this.goodsselect.length;
          this.currentpage = 1;
        },
        showall() {
          this.catid = 0;
          this.catname = "全部";
          this.catsummarize = '';
          this.total = this.goodsselect.length;
          this.currentpage = 1;
        },
        currentchange(value) {
          this.currentpage = value;
        },
      },
      computed: {
        classlist() {
          return this.$GoodsClass
        },
        goodslist() {
          return this.$GoodsList
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
        //商品指定个别种类的筛选
        goodsselect() {
          if (this.catid === 0) {
            return this.goodslist
          } else {
            return this.goodslist.filter((item) => {
              return item.classid[0] === this.catid
            })
          }
        },
        //在goodsselect数组的基础上分页筛选
        pageselect() {
          this.goodsselect.forEach((item, index) => {
            this.$set(item, 'num', index)
          });
          return this.goodsselect.filter((item) => {
            return item.num >= (this.currentpage - 1) * this.pagesize && item.num < this.currentpage * this.pagesize
          })
        }
      },
    
    }
</script>
<style scoped>
  /* line 10, ../sass/cat.scss */
  .variety {
    width: 100%;
  }
  /* line 12, ../sass/cat.scss */
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
  /* line 14, ../sass/cat.scss */
  .variety .title .filtrate {
    display: flex;
    justify-content: space-around;
    font-size: 13px;
    width: 600px;
    margin-left: -400px;
    padding-left: 170px;
  }
  /* line 21, ../sass/cat.scss */
  .variety .title .close {
    cursor: pointer;
  }
  /* line 25, ../sass/cat.scss */
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
  /* line 31, ../sass/cat.scss */
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
  /* line 36, ../sass/cat.scss */
  .variety .variety-items .variety-item img {
    height: 47px;
    width: 47px;
    border-radius: 50%;
    box-shadow: 3px 3px 5px #303030;
    cursor: pointer;
  }

  /* line 45, ../sass/cat.scss */
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  /* line 47, ../sass/cat.scss */
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
  /* line 50, ../sass/cat.scss */
  .content .title font {
    margin-left: 20px;
  }
  /* line 53, ../sass/cat.scss */
  .content .title .showall {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
  /* line 57, ../sass/cat.scss */
  .content .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

</style>
