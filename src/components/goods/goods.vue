/* eslint-disable no-unused-vars */
<template>
<div class="goods">
    <div class="menu_wrapper" ref="menuWrapper">
        <ul>
            <li :key="item.text" v-for="(item,index) in goods" class="menu_item" :class="{'current':currentIndex===index}" @click="menuClick(index,$event)" >
                <span class="text border-1px">
                    <span v-show="item.type>0" class="icon" :class="classmap[item.type]"></span>
                    {{item.name}}
                </span>
            </li>
        </ul>
    </div>
    <div class="foods_wrapper" ref="foodsWrapper">
        <ul>
            <li class="food_item border-1px food_list_hook" v-for="item in goods" :key="item.text">
                <ul>
                    <span class="title">{{item.name}}</span>
                    <li v-for="food in item.foods" :key="food.text" class="food">
                        <span class="food_icon" ><img :src="food.icon" width="56" height="56"/></span>
                        <span class="content">
                            <div class="name">{{food.name}}</div>
                            <p class="desc" v-show="food.description">{{food.description}}</p>
                            <div class="sell">
                                <span class="sell_count count">月售：{{food.sellCount}}份</span><span class="sell_count">好评率：{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="food_price">￥{{food.price}}</span>
                                <span v-show="food.oldPrice" class="old_price">￥{{food.oldPrice}}</span>
                              <span class="choose_wrapper"><cartcontrol :food="food"></cartcontrol></span>
                            </div>
                        </span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectsFoods="selectFoods"></shopcart>
</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import BetterScroll from 'better-scroll';
import ShopCart from '../shopcart/shopcart';
import Cartcontrol from '../cartcontrol/cartcontrol';

export default {
  props: {
    seller: {}
  },
  components: {
    shopcart: ShopCart,
    cartcontrol: Cartcontrol
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    };
  },
  computed: {
    // 计算当前访问菜单索引
    currentIndex: function () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY + 120 >= height1 && this.scrollY + 120 < height2)) {
          return i;
        }
      }
    },
    // 计算选择商品
    selectFoods: function () {
      let selectFoods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            selectFoods.push(food);
          }
        });
      });
      return selectFoods;
    },
    //  计算导航选择商品
    menuSelect () {
      let count = [];
      for (var i in this.goods) {
        let number = 0;
        this.goods[i].foods.forEach((food) => {
          if (food.count) {
            number += food.count;
            return number;
          }
        });
        count.push(number);
        console.log(this.goods[i].name + '有' + number + '个已选择');
      };
      console.log(count);
      return count;
    }
  },
  watch: {
    // 监听超出屏幕的菜单滚动
    'currentIndex': function (index) {
      let menuList = this.$refs.menuWrapper.getElementsByClassName('menu_item');
      this.menuScroll.scrollToElement(menuList[index], 1000);
    }

  },
  created () {
    this.classmap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('/api/goods').then((result) => {
      this.goods = result.body.data;
      this.$nextTick(() => { // vue是异步更新，必须加$nextTick,才能在nextTick里面更新，实现滚动。
        this._initScroll();
        this._calculateHeight();
      });
    }).catch((err) => {
      console.log(err);
    });
  },
  methods: {
    //  导航点击
    menuClick (index) {
      this.foodScroll.scrollTo(0, -this.listHeight[index], 1000);
    },
    //   初始化滚动条
    _initScroll () {
      this.menuScroll = new BetterScroll(this.$refs.menuWrapper, {
        probeType: 3,
        click: true});
      this.foodScroll = new BetterScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true});
      // 监听菜单滚动
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    // 导航联动
    _calculateHeight: function () {
      let FoodList = this.$refs.foodsWrapper.getElementsByClassName('food_list_hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < FoodList.length; i++) {
        let item = FoodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }

  }
};
</script>

<style  lang="stylus">
@import "../../common/stylus/mixxin.styl";
.goods
    display flex
    overflow hidden
    position absolute
    top 174px
    bottom 46px
    width 100%
    .menu_wrapper
        flex 0 0 80px
        width 80px
        background #f3f5f7
        font-size 0
        .menu_item
            display table
            height 54px
            width 100%
            line-height 14px
            padding 0 12px
            &.current
                background #ffffff
                font-weight 700
                margin-top -1px
                z-index 10
                position relative
                .text
                  border-none()
          &:last-child
                .text
                  border-none()
            .text
                display table-cell
                width 100%
                vertical-align middle
                font-size 12px
                font-weight 200
                border-1px(rgba(7,17,27,0.1))
            .icon
                display inline-block
                vertical-align top
                width 12px
                height 12px
                margin-right 2px
                background-size 12px 12px
                background-repeat no-repeat
                &.decrease
                    bg_img('decrease_3')
                &.discount
                    bg_img('discount_3')
                &.guarantee
                    bg_img('guarantee_3')
                &.invoice
                    bg_img('invoice_3')
                &.special
                    bg_img('special_3')
    .foods_wrapper
        flex 1
        .food_item
            display inline-block
            width 100%
            .food
                display flex
                border-1px(rgba(7,17,27,0.1))
                margin 18px
                padding-bottom 18px
                &:last-child
                    border-none()
                    margin-bottom 0
                .food_icon
                    flex 0 0 56px
                    margin-right 10px
                .content
                    flex 1
                    .name
                        font-size 14px
                        line-height 14px
                        color rgb(7,17,27)
                        margin 2px 0 8px 0
                        height 14px
                    .sell
                        display inline
                    .desc,.sell_count
                        line-height 10px
                        font-size 10px
                        color rgb(147,153,159)
                    .desc
                        margin-bottom 8px
                        line-height 12px
                        .count
                            margin-right 12px
                    .price
                        position relative
                        .food_price,.old_price
                            font-weight 700
                            line-height 24px
                        .food_price
                            font-size 14px
                            color red
                            margin-right 8px
                        .old_price
                            font-size 10px
                            color rgb(147,153,159)
                            text-decoration line-through
                        .choose_wrapper
                            position absolute
                            right 0
                            width auto

            .title
                display block
                font-size 12px
                color rgb(147,153,159)
                font-weight 700
                line-height 26px
                border-left 2px solid #d9dde1
                height 26px
                background #f3f5f7
                padding-left 14px

</style>
