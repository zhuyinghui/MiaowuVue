<template>
    <div>
        <publicgrayTitle>我的领养</publicgrayTitle>
        <div class="content">
            <ul v-for="(item,index) in adoptlist" :key="index" class="item">
                <li>内容：{{item.words}}</li>
                <li>发表时间：{{item.submitTime}}</li>
                <li><el-button size="mini" @click="deleteInfo(item._id)">删除</el-button></li>
            </ul>
        </div>
    </div>
</template>
<script>
import publicgrayTitle from '../../components/publicgrayTitle2'
export default {
    name:"myAdopt",
    components:{publicgrayTitle},
    data(){
        return{
            adoptlist:[]
        }
    },
    methods:{
        getInfo(){
             this.axios.get(this.$domain+'/api/adoptInfo/user',{
                params:{
                    username:localStorage.getItem('name')
                }
            }).then(res=>{
                this.adoptlist=res.data
            }).catch(err=>{
                console.log(err)
            })
        },
        deleteInfo(_id){
            this.axios.delete(this.$domain+'/api/adoptInfo',{
                params:{
                    _id
                }
            }).then(res=>{
                this.getInfo()
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    mounted(){
        this.getInfo()
    }
}

</script>
<style lang="scss" scoped>
.content{
    display: flex;flex-direction: column-reverse;
    width: 100%;
  
}
.item{
    width:100%;
    background: white;
    list-style: none;
    padding:15px;
    position: relative;
    margin-bottom: 5px;
    box-sizing: border-box;
}
.item li:nth-child(1){
    margin-bottom: 10px;
}
.item li:nth-child(2){
    font-size: 14px;color: #5e5e5e
}
.item li:nth-child(3){
    position: absolute;
    right: 20px; bottom: 15px;
}
</style>

