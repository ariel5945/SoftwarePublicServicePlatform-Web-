<template>
  <div>
    <div class="tab-con">
      <span :class="{'active': tabType === 0}" @click="getList(0)">员工列表</span>
      <!--<span :class="{'active': tabType === 1}" @click="getList(1)">考试记录</span>-->
      <span :class="{'active': tabType === 2}" @click="getList(2)">试题列表</span>
    </div>
    <div v-if="tabType==0">
      <el-button size="small" type="success" @click="openDia()">添加员工</el-button>
      <el-divider></el-divider>
      <div class="yg-list" v-if="staffList.length>0">
        <div v-for="(item,index) in staffList" :key="'staff'+index" class="sraff-item">
          <div style="width: 80px">
            <img v-if="item.userImgUrl" :src="item.userImgUrl">
            <img src="./../../assets/image/login_icon_kaifazhe.png">
          </div>
          <div class="item-content">
            <p style="font-weight: bold;"><span>登录账号：</span> {{ item.loginAccount }}</p>
            <p style="color: #9B9B9B"><span>员工姓名：</span> {{ item.userName }}</p>
          </div>
          <div style="width: 180px">
            <span>创建时间：</span>
            {{ item.createTime.split("T")[0] }}
          </div>
          <div style="width: 100px;justify-content: flex-end">
            <el-button size="small" type="danger" @click="batchResetPassword(item.loginAccountId)">重置密码</el-button>
          </div>
          <!---->
        </div>
      </div>
      <el-empty v-else description="暂无数据"></el-empty>
    </div>
    <div v-if="tabType==1">
      <el-empty description="暂无数据"></el-empty>
    </div>
    <div v-if="tabType==2">
      <div class="yg-list" v-if="staffList.length>0">
        <div v-for="(item,index) in staffList" :key="'staff'+index" class="sraff-item">
          <div style="width: 80px">
            <img v-if="item.userImgUrl" :src="item.userImgUrl">
            <img src="./../../assets/image/login_icon_kaifazhe.png">
          </div>
          <div class="item-content">
            <p style="font-weight: bold;"><span>登录账号：</span> {{ item.loginAccount }}</p>
            <p style="color: #9B9B9B"><span>员工姓名：</span> {{ item.userName }}</p>
          </div>
          <div style="width: 180px">
            <span>创建时间：</span>
            {{ item.createTime.split("T")[0] }}
          </div>
          <div style="width: 100px;justify-content: flex-end">
            <el-button size="small" type="danger" @click="batchResetPassword(item.loginAccountId)">重置密码</el-button>
          </div>
          <!---->
        </div>
      </div>
      <el-empty v-else description="暂无数据"></el-empty>
    </div>

    <el-dialog
        title="添加员工"
        :lock-scroll="false"
        :visible.sync="dialogVisible"
        width="480px"
        :before-close="handleClose">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="员工姓名">
          <el-input v-model="formData.userName"></el-input>
        </el-form-item>
        <el-form-item label="员工账号">
          <el-input v-model="formData.loginAccount"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HTTP from "./../../server/http"

export default {
  name: "yuangongView",
  data() {
    return {
      dialogVisible: false,
      tabType: 0,
      pageNum: 1,
      pageSize: 10,
      total: 0,

      formData: {
        userName: "",
        loginAccount: "",
        pwd: "123456",
        companyId: "",
      },

      staffList: [],
    }
  },
  methods: {
    handleClose(){
      this.dialogVisible = false;
      this.formData.userName = "";
      this.formData.loginAccount = "";
    },
    openDia(){
      this.dialogVisible = true;
    },

    batchResetPassword(id){
      let arr = [];
      arr.push(id);
      let url = "/api/user/batchResetPassword";
      let data = {
        ids: arr,
      }
      HTTP.get(url,data,res=>{
        console.log(res);
      },false)
    },

    getList(type) {
      this.pageNum = 1;
      this.tabType = type;
      if(type == 0){
        this.gatStaffList();
      } else if(type == 2){
        this.gatShitiList();
      }
    },
    gatShitiList(){
      let url = "/api/train/examInfo";
      let data = {
        userName: this.userName,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      HTTP.get(url, data, res => {
        if(res.code == 0){
          this.total = res.total;
          this.staffList = res.data;
        } else {
          this.$message.error(res.msg)
        }
      }, false);
    },
    gatStaffList() {
      let url = "/api/companyInfo/getCompanyUserByLogin";
      let data = {
        userName: this.userName,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      HTTP.get(url, data, res => {
        if(res.code == 0){
          this.total = res.total;
          this.staffList = res.rows;
        } else {
          this.$message.error(res.msg)
        }
      }, false);
    },
    addSubmit(){
      let url = "/apiLogin/companyUserrLoginAccount";
      let data = this.formData;
      HTTP.get(url, data, res => {
        if(res.code == 0){
          this.$message.success("创建成功");
          this.gatStaffList()
          this.handleClose();
        } else {
          this.$message.error(res.msg)
        }
      }, false);
    },

    getCompanyId(id){
      let url = "/portal/companyInfo/getConpanyInfoByAccountId";
      let data = {
        accountId: id,
      };
      HTTP.get(url, data, res => {
        if(res.code == 0){
          this.formData.companyId = res.data.id;
        } else {
          this.$message.error(res.msg)
        }
      }, false);
    }
  },
  mounted() {
    this.getList(0);
    if(localStorage.getItem("user_role")){
      this.getCompanyId(JSON.parse(localStorage.getItem("user_role")).accountId)
      // this.formData.companyId = ;
    }
  }
}
</script>

<style scoped lang="scss">
.tab-con {
  display: flex;
  justify-content: flex-start;
  position: relative;
  height: 30px;
  line-height: 30px;
  margin-bottom: 30px;

  span {
    font-size: 18px;
    padding: 0;
    cursor: pointer;
    color: #9D9D9D;
    border-bottom: 2px solid transparent;
    margin-right: 30px;
  }

  span.active {
    color: #3291F8;
    border-bottom: 2px solid #3291F8;
  }
}

//员工列表
.yg-list {
  min-height: 3rem;
}

.sraff-item:first-child{
  padding-top: 0;
}

.sraff-item{
  display: flex;
  border-bottom: 1px solid #D6D8DB;
  padding-bottom: 20px;
  padding-top: 20px;

  div{
    display: flex;
    height: 50px;
    align-items: center;
    
    img{
      width: 50px;
      height: 50px;
      display: block;
    }
  }

  .item-content{
    width: calc(100% - 320px);
    display: flex;
    height: 50px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    p{
      height: 24px;
      line-height: 24px;
    }
  }

}
.sraff-item:last-child{
  border: none;
}



</style>