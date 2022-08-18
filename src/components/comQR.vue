
<template>
  <div>
    <div class="QR-icon">
      <el-popover
        popper-class="xcx-pop"
        placement="left"
        trigger="hover"
        width="20px"
        content=""
      >
      <div class="xcx">
        <div class="xcx-bg"></div>
        <img class="QR-img" src="../assets/img/QR.jpg" alt="" />
      </div>
        <el-button slot="reference">
          <img
            class="xcx-icon"
            src="../assets/image/icon/icon_xcx.png"
            alt=""
          />
        </el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: "comQR"
}
</script>

<style lang="scss" scoped>
.xcx {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  @keyframes turnZ {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.QR-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  //position: relative;
  overflow: hidden;
  position: fixed;
  bottom: 120px;
  right: 60px;
  z-index: 10;
  .xcx-div {
    float: left;
  }
  .el-button {
    width: 20px;
    height: 20px;
    background-color: #07c160;
    border: none;
    text-align: left;
    padding: 0;
    .xcx-icon {
      width: 20px;
      height: 20px;
    }
  }
}

.el-popover.xcx-pop {
  background-color: rgba(255, 255, 255,0) !important;
  border: 0 !important;
  box-shadow: none;
  .QR-img {
    width: 100px;
    height: 100px;
    margin: 10px;
    border-radius: 50%;
  }
  .xcx-bg {
    width: 120px;
    height: 120px;
    position: absolute;
    background-image: url("../assets/img/QR_bg.png");
    background-size: cover;
    animation: turnZ 3s linear infinite;
  }
}
</style>
<style lang="scss">
.el-popover.xcx-pop {
  background-color: rgba(255, 255, 255,1) !important;
  border: 0 !important;
}
</style>