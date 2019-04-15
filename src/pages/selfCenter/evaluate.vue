<template>
    <div class="content">
      <PublicgrayTitle>发表评价</PublicgrayTitle>
      <ul class="goodsinfo">
        <li><img :src="eg.goodsimg"></li>
        <li>商品名称：{{eg.goodsname}}</li>
        <li>数量：{{eg.count}}</li>
        <li>金额：￥{{eg.count*eg.price*1+eg.postage*1}}</li>
      </ul>
      <div class="evaluate">
          <div class="rate1">
            <h4>描述相符</h4>
            <el-rate v-model="grade" show-text></el-rate>
          </div>
          <el-input type="textarea" v-model="words"></el-input>
          <!--<el-upload-->
            <!--action="/api/evaluateInfo"-->
            <!--list-type="picture-card"-->
            <!--:on-preview="handlePictureCardPreview"-->
            <!--:on-remove="handleRemove"-->
            <!--:on-change="handlechange"-->
            <!--:auto-upload="false"-->
            <!--:limit="1"-->
            <!--ref="upload"-->
          <!--&gt;-->
            <!--<i class="el-icon-plus"></i>-->
          <!--</el-upload>-->
          <!--<el-dialog :visible.sync="dialogVisible">-->
            <!--<img width="100%" :src="dialogImageUrl" alt="">-->
          <!--</el-dialog>-->
          <div class="rate2">
            <h4>商家评分</h4>
            <div><span>物流服务</span><el-rate v-model="grade2" show-text></el-rate></div>
            <div><span>服务态度</span><el-rate v-model="grade3" show-text></el-rate></div>
          </div>
          <el-button @click="submit" class="btn" type="primary">发表评价</el-button>
      </div>
    
    </div>
</template>

<script>
    import PublicgrayTitle from "../../components/publicgrayTitle";
    export default {
        name: "evaluate",
      components: {PublicgrayTitle},
      data(){
        return{
          grade:0,
          grade2:0,
          grade3:0,
          words:'',
          goodsid: this.$route.query.id,
          dialogImageUrl: '',
          dialogVisible: false,
        }
      },
      computed:{
        eg(){
          return this.$store.state.evalgoods
        }
      },
      methods: {
        // handleRemove(file, fileList) {
        //   console.log(file, fileList);
        // },
        // handlePictureCardPreview(file) {
        //   this.dialogImageUrl = file.url;
        //   this.dialogVisible = true;
        // },
        // handlechange(file){
        //   console.log(file)
        // },
        submit(){
          if(this.grade===0||this.grade2===0||this.grade3===0||this.words===''){
            alert('请完整填写信息')
          }else{
            //评价信息表，用户名即存储本地的，商品的goodsid，分数以及评价内容
            const name=localStorage.getItem('name');
            const userid=localStorage.getItem('userid');
            // this.$refs.upload.submit();
            this.axios.post(this.$domain+'/api/evaluateInfo',{
              username:name,
              userid:userid,
              goodsid:this.goodsid,
              words:this.words,
              grade:this.grade,
              grade2:this.grade2,
              grade3:this.grade3,
            }).then(res=>{
              console.log(res.data);
            }).catch(err=>{
              console.log(err)
            });
            this.$alert('发表评论成功', '提示', {
              confirmButtonText: '确定',
              callback: () => {
                this.$router.push('/myOrder')
              }
            });
          }
        }
      },
      mounted(){
       
      }
    }
</script>

<style lang="scss" scoped>
.content{
  .goodsinfo{
    background: white;
    display: flex;justify-content: center;align-items:center;
    padding: 10px;
    img{
      width: 120px;height: 120px;
    }
    li{
      list-style: none;
      margin-left: 20px;
    }
  } 
  .evaluate{
    width: 30%;
    margin-left: 35%;
  }
  .rate1{
    display: flex;align-items: center;
    padding: 10px 0;box-sizing: border-box;
  }
  .rate2 {
    h4{
      padding-top: 10px;
    }
    div{
      display: flex;align-items: center;padding-top: 4px;
    }
  }
  .setwords{
    height: 200px;
  }
}
.btn{
  margin-top: 20px;
}
</style>
