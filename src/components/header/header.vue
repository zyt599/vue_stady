<template>
    <div class="header">
        <div class="content_wrapper">
            <div class="bulletin_wrapper">
                <div class="avatar"><img :src="seller.avatar" width="64" height="64"/></div>
                <div class="content">
                    <div class="title">
                        <span class="brand"></span>
                        <span class="name">{{seller.name}} </span>
                    </div>
                    <div class="description">
                        {{seller.description}}/{{seller.deliveryTime}}分钟送达
                    </div>
                    <div class="supports" v-if="seller.supports">
                        <span class="icon" :class="classmap[seller.supports[0].type]"></span>
                        <span class="text">{{seller.supports[0].description}}</span>
                    </div>
                </div>
                <div class="supports_count" v-if="seller.supports">
                    <span class="conut">{{seller.supports.length}}个</span>
                    <i class="icon-keyboard_arrow_right"></i>
                </div>
            </div>
            <div class="sell_box">

            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'header',
  props: {
    seller: {}
  },
  created () {
    this.classmap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
};
</script>

<style lang="stylus">
@import "../../common/stylus/mixxin.styl";

.header
    color #ffffff
    background #999
    .content_wrapper
        position relative
        padding 24px 12px 18px 24px
        font-size 0
        .avatar
            display inline-block
            vertical-align top
            img
                border-radius 2px
        .content
            display inline-block
            margin-left 16px
            .title
                margin 2px 0 8px 0
                .brand
                    vertical-align top
                    width 30px
                    height 18px
                    display inline-block
                    bg_img('brand')
                    background-size 100% 100%
                    background-repeat no-repeat
                .name
                    margin-left 6px
                    font-size 16px
                    line-height 18px
                    font-weight bold
            .description
                margin-bottom 10px
                line-height 12px
                font-size 12px
            .supports
                .text
                    line-height 12px
                    font-size 10px
                .icon
                    display inline-block
                    vertical-align top
                    width 12px
                    height 12px
                    margin-right 4px
                    background-size 12px 12px
                    background-repeat no-repeat
                    &.decrease
                        bg_img('decrease_1')
                    &.discount
                        bg_img('discount_1')
                    &.guarantee
                        bg_img('guarantee_1')
                    &.invoice
                        bg_img('invoice_1')
                    &.special
                        bg_img('special_1')
        .supports_count
            position absolute
            right 12px
            bottom 18px
            padding 0 8px
            height 24px
            line-height 24px
            border-radius 14px
            background-color rgba(0,0,0,0.2)
            text-align center
            .conut
                font-size 12px
            .icon-keyboard_arrow_right
                font-size 12px

</style>
