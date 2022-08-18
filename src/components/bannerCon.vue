<template>
  <section class="banner-con hidden-md-and-down">
    <div>
      <div>
        <h3>
          <slot name="bannerTitle"></slot>
        </h3>
        <p>
          <slot name="bannerText"></slot>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "bannerCon"
}
</script>

<style scoped lang="scss">
.banner-con {
  background-size: 100% 100%;
  background-position: center;
  height: 3.8rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  > div {
    color: #fff;
    width: 98%;
    max-width: 1200px;

    h3 {
      font-size: .28rem;
      margin-bottom: 7px;
    }

    p {
      font-size: .28rem;
      margin-bottom: .22rem;
      position: relative;
    }

    p:after {
      position: absolute;
      content: "";
      width: 6px;
      height: 15px;
      background: linear-gradient(0deg, #3BBFFD, #0E5EAB);
      bottom: -0.29rem;
      left: .3rem;
    }

  }

}
</style>