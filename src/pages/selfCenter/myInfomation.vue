<template>
    <div class="content">
        <PublicgrayTitle>个人资料</PublicgrayTitle>
        <el-form :label-position="labelPosition" label-width="100px" :model="form" class="form">
            <el-form-item class="headpicture">
                <div class="picture">
                     <img src="../../../static/assets/images/cat1.jpg" alt="头像">
                </div>
                <a href="#">修改头像</a>
            </el-form-item>
            <el-form-item label="用户编号">
                <el-input disabled v-model="userid"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input disabled v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
             <el-form-item label="性别">
                <el-select v-model="form.sex">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-button type="primary">保存</el-button>
        </el-form>
    </div>
</template>
<script>
import PublicgrayTitle from "../../components/publicgrayTitle2";
export default {
    name:"myInfomation",
    components:{
        PublicgrayTitle
    },
    data(){
        return{
            userid:localStorage.getItem("userid"),
            username:localStorage.getItem('name'),
            labelPosition: 'right',
            form: {
            name: '',
            phone: '',
            email: '',
            sex:'',
            }

        }
    }
}
</script>
<style scoped lang="scss">
.form{
    margin-top: 20px;
    width: 30%;
    min-width: 290px;
    margin-left: 35%;
}
.form button{
    margin-left: 50%;
}
.headpicture{
     margin-left: 25%;
     a{
         color:dodgerblue;
     }
}
.picture{
    width: 60px;height:60px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
       
    img{
        width:100%;height: 100%;
    }
}
</style>


