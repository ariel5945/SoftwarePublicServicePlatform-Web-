<template>
  <main>
    <div>
      <h3>平台展示</h3>
      <span>
        洛阳软件公共服务平台是洛阳市软件行业的公共服务设施，旨在通过交流、共享、合作等方式，实现业务服务在线化，承担服务推介、数据查询、
                      业务协同等线上服务职能。实现培训定向化、开发模块化、检测规范化等行业标准。实现培训中心、交流中心落地，引行业人才汇聚于此交流学习。
                      最终在洛阳软件行业的人才、开发、外包、市场等领域形成服务能力，促进行业协同化、生态化发展，让软件公共服务平台成为促进行业高质量发展的助力工具。
      </span>
    </div>

    <img src="./../assets/image/cj1.png">
    <img src="./../assets/image/cj2.png">
    <img src="./../assets/image/cj3.png">
  </main>
</template>

<script>
export default {
  name: "aboutView"
}
</script>

<style scoped lang="scss">
main{
  padding-top: 1rem;
  margin-bottom: -40px;
}

div{
  position: fixed;
  top: 24vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  h3{
    width: 100%;
    text-align: center;
    font-size: 34px;
    margin-bottom: 30px;
  }
  span{
    display: block;
    width: 500px;
    background-color: rgba(0,0,0,.6);
    color: #FFFFFF;
    padding: 30px 50px;
    border-radius: 4px;
    line-height: 20px;
  }

}
</style>