<template>
<div class="goods">
    <div class="menu_wrapper">
        <ul>
            <li :key="item.text" v-for="item in goods" class="ment_item">
                <span class="text border-1px" >
                    <span v-show="item.type>0" class="icon" :class="classmap[item.type]"></span>
                    {{item.name}}
                </span>
            </li>
        </ul>
    </div>
    <div class="foods_wrapper">
        <ul>
            <li class="food_item border-1px" v-for="item in goods" :key="item.text">
                <div class="title">{{item.name}}</div>
                <div v-for="food in item.foods" :key="food.text" class="food">
                    <span class="food_icon" ><img :src="food.icon"/></span>
                    <span class="content">
                        <div class="name">{{food.name}}</div>
                        <p class="desc">{{food.description}}</p>
                        <div>
                            <span class="sell_count">月售：{{food.sellCount}}份</span>
                            <span class="sell_count">好评率：{{food.rating}}%</span>
                        </div>
                        <div>
                            <span>￥{{food.price}}</span>
                            <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                            <i class="icon"></i>
                        </div>
                    </span>
                </div>
            </li>

        </ul>
    </div>
</div>
</template>

<script>
export default {
  props: {
    seller: {}
  },
  data () {
    return {
      goods: []
    };
  },
  created () {
    this.classmap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('/api/goods').then((result) => {
      this.goods = result.body.data;
    }).catch((err) => {
      console.log(err);
    });
  }
};
</script>

<style scoped lang="stylus">
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
        .ment_item
            display table
            height 54px
            width 100%
            line-height 14px
            padding 0 12px
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
                vertical-align text-top
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
        padding 0 14px
        .food_item
            display inline-block
            width 100%
            .food
                display flex
                border-1px(rgba(7,17,27,0.1))
                margin-right 4px
                .food_icon
                    display inline-block
                    flex 0
                .content
                    display inline-block
                    flex 1
                    .name
                        font-size 14px
                        line-height 14px
                        color rgb(7,17,27)

            .title
                font-size 12px
                color rgb(147,153,159)
                font-weight 700
                line-height 27px

</style>
