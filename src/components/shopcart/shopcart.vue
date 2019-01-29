<template>
  <div class="shopcart" >
    <div class="content" @click="ToggleShopList">
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
        <div class="content_right" >
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
    <div class="shopList" v-show="showShopList">
      <div class="shopListbg" @click="ToggleShopList"></div>
      <div class="shop_wrapper" ref="shopWrapper">
        <div class="title"><span class="cart">购物车</span><span class="empty" @click="emptyAll">清空</span></div>
        <div class="shop" ref="shop">
          <ul class="shopList_wrapper" ref="shoplist">
            <li class="shopitem_wrapper" v-for="item in selectsFoods" :key="item.text">
              <div class="shopitem">
                <div class="shop_name">{{item.name}}</div>
                <div class="shop_right">
                  <span class="price">￥{{item.price}}</span>
                  <span class="cartcon"><cartcontrol :food="item"></cartcontrol></span>
                </div>
              </div>
            </li>
        </ul>
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import Cartcontrol from '../cartcontrol/cartcontrol';
import Betterscroll from 'better-scroll';
export default {
  name: 'shopcart',
  data () {
    return {
      showShopList: false
    };
  },
  props: {
    minPrice: {},
    deliveryPrice: {},
    selectsFoods: {
      default () {
        return [];
      }
    }
  },
  components: {
    cartcontrol: Cartcontrol
  },
  methods: {
    //  监听选择商品详情高度
    goodsDetailHeight () {
      this.$nextTick(() => {
        if (this.$refs.shoplist.clientHeight < this.$refs.shopWrapper.clientHeight - 40) {
          return false;
        } else {
          this.$refs.shop.style.height = this.$refs.shopWrapper.clientHeight - 40 + 'px';
          this.DetailsScroll = new Betterscroll(this.$refs.shop, {
            probeType: 3,
            click: true
          });
          return true;
        };
      });
    },
    // 显示隐藏选择商品详情
    ToggleShopList () {
      if (this.totalCount) {
        this.showShopList = !this.showShopList;
      };
    },
    // 清空
    emptyAll () {
      this.selectsFoods.forEach((food) => {
        food.count = 0;
      });
    }
  },
  computed: {
  // 计算总金额
    totalPrice () {
      let total = 0;
      this.selectsFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    // 计算商品数量
    totalCount () {
      let count = 0;
      this.selectsFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    // 监听起送价
    payDesc () {
      let msg;
      if (this.totalPrice === 0) {
        msg = `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        msg = `还差￥${diff}元起送`;
      } else {
        msg = '去结算';
      }
      return msg;
    },
    // 结算样式
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not_enough';
      } else {
        return 'enough';
      }
    }
  },
  watch: {
    totalCount: function () {
      // this.$refs.shop.style.height = this.$refs.shoplist.clientHeight + 'px';
      if (this.totalCount === 0) {
        this.showShopList = false;
      }
    },
    showShopList: function () {
      if (this.showShopList) {
        this.goodsDetailHeight;
        console.log();
      }
    }
  }
};
</script>

<style lang="stylus">
@import "../../common/stylus/mixxin.styl";
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
    z-index 40
    position relative
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
        &.not_enough
          background #2b343c
        &.enough
          background #00b43c
          color #ffffff

  .shopList
    position fixed
    left 0
    bottom 48px
    min-height 100%
    width 100%
    min-height 100%
    .shopListbg
      display block
      height 100%
      background rgba(7,17,27,.6)
      width 100%
      z-index 10
      position absolute
    .shop_wrapper
      display inline-block
      z-index 50
      max-height 50%
      background #fff
      position absolute
      bottom 0
      left 0
      width 100%
      box-sizing border-box
      .title
        display flex
        height 40px
        padding 0 18px
        border-1px(rgba(7,17,27,0.1))
        background #f3f5f7
        .cart,.empty
         flex 1
        .cart
          font-size 14px
          font-weight 200
          color rgb(7,17,27)
          line-height 40px
        .empty
          text-align right
          font-size 12px
          color rgb(0,160,280)
          line-height 40px
          font-weight 200
          flex 0 0 40px
      .shop
        padding-bottom 20px
        overflow hidden
        &:after
          content ' '
          width 100%
          display block
          margin-top 20px
          position absolute
          bottom 0
      .shopitem_wrapper
        width 100%
        padding 0 18px
        .shopitem
          display flex
          width 100%
          border-1px(rgba(7,17,27,0.1))
          padding 8px 0
          .shop_name
            display inline-block
            font-size 14px
            color rgb(7,17,27)
            line-height 36px
            flex 1
            text-overflow ellipsis
            white-space nowrap
            overflow hidden
          .shop_right
            display inline-block
            flex 1
            text-align right
            .price
              font-size 14px
              color red
              font-weight 700
              margin-right 12px

</style>
