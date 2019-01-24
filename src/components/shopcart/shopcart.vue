<template>
  <div class="shopcart">
      <div class="content">
        <div class="content_left">
          <div class="logo_wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <span class="icon-shopping_cart"></span>
            </div>
            <div class="number" v-show="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
          <div class="desc">
            另需配送费￥{{deliveryPrice}}元
          </div>
        </div>
        <div class="content_right">
          <div class="pay">￥{{minPrice}}起送</div>
        </div>
      </div>
 </div>
</template>

<script>
export default {
  name: 'shopcart',
  props: {
    minPrice: {},
    deliveryPrice: {},
    selectsFoods: {
      type: Array,
      default () {
        return [{price: 10, count: 1}];
      }
    }
  },
  computed: {
    totalPrice () {
      let total = 0;
      this.selectsFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount () {
      let count = 0;
      this.selectsFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    }
  }
};
</script>

<style lang="stylus">
.shopcart
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height 48px
  .content
    display flex
    background #141d27
    font-size 0
    color rgba(255,255,255,0.4)
    .content_left
      display inline-block
      flex 1
      .logo_wrapper
        display inline-block
        position relative
        top  -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        box-sizing border-box
        vertical-align top
        border-radius 50%
        text-align center
        background #141d27
        .logo
          display inline-block
          width 100%
          border-radius 50%
          background #2b343c
          &.highlight
            background rgb(0,160,220)
            .icon-shopping_cart
              color #ffffff
          .icon-shopping_cart
            line-height 44px
            font-size 24px
            color #80858a

        .number
          position: absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          font-size 9px
          font-weight 700
          color #ffffff
          background rgb(240,20,20)
          box-shadow 0 4px 8px rgba(0,0,0,0.4)
      .price
        display inline-block
        vertical-align top
        font-size 16px
        font-weight 700
        line-height 24px
        margin-top 12px
        box-sizing border-box
        padding-right  12px
        border-right 1px solid rgba(255,255,255,0.1)
        &.highlight
          color #ffffff
      .desc
        display inline-block
        vertical-align top
        font-size 10px
        line-height 24px
        margin 12px 0 0 12px

    .content_right
      display inline-block
      width 105px
      flex 0 0 105px
      .pay
        font-size 12px
        line-height 48px
        font-weight 700
        text-align center
        background #2b343c

</style>
