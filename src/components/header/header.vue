<template>
    <div class="header">
        <div class="content_wrapper">
            <div class="avatar"><img :src="seller.avatar" width="64" height="64"/></div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}} </span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="supports" v-if="seller.supports" @click="toggleDetaili">
                    <span class="icon" :class="classmap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="supports_count" v-if="seller.supports" @click="toggleDetaili">
                <span class="conut">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin_wrapper">
            <span class="bulletin_title"></span><span class="bulletin_text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%"/>
        </div>
        <div class="detail" v-show="detailShow">
            <div class="detail_wrapper clearfix">
                <div class="detail_main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star_wrapper">
                        <star :size="48" :score="seller.score"></star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports">
                        <li v-for="(item,index) in seller.supports" :key="item.text" class="support_item">
                            <span class="icon" :class="classmap[seller.supports[index].type]"></span>
                            <span class="text">{{ seller.supports[index].description }}</span>
                        </li>
                    </ul>
                     <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="infomation">
                        {{seller.bulletin}}
                    </div>
                </div>
            </div>
            <div class="detail_close icon-close" @click="toggleDetaili"></div>
        </div>
    </div>
</template>

<script>
import star from '../star/star';

export default {
  name: 'header',
  props: {
    seller: {}
  },
  data  () {
    return {
      detailShow: false,
      itemClasses: {},
      suppots: this.seller.suppots
    };
  },
  methods: {
    toggleDetaili () {
      this.detailShow = !this.detailShow;
    }
  },
  created () {
    this.classmap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    star: star
  }
};
</script>

<style lang="stylus">
@import "../../common/stylus/mixxin.styl";

.header
    color #ffffff
    position relative
    overflow hidden
    background rgba(7,17,27,0.5)
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
            bottom 14px
            padding 0 8px
            height 24px
            line-height 24px
            border-radius 14px
            background-color rgba(0,0,0,0.2)
            text-align center
            .conut
                font-size 12px
                vertical-align top
            .icon-keyboard_arrow_right
                line-height 24px
                margin-left 2px
                font-size 12px
    .bulletin_wrapper
        height 28px
        line-height 28px
        padding 0 22px 0 12px
        white-space nowrap
        overflow  hidden
        text-overflow ellipsis
        background rgba(7,17,27,0.2)
        position relative
        .bulletin_title
            display inline-block
            bg_img('bulletin')
            width 22px
            height 12px
            background-size 100% 100%
            vertical-align middle
        .bulletin_text
            font-size 10px
            margin  0 4px
        .icon-keyboard_arrow_right
            position absolute
            font-size 10px
            right 12px
            top 8px
    .background
        width 100%
        position absolute
        top 0
        left 0
        z-index -1
        filter blur(10px)
    .detail
        position fixed
        z-index 100
        width 100%
        height 100%
        overflow auto
        background rgba(7,17,27,0.8)
        top 0
        left 0
        .detail_close
            position relative
            width 32px
            height 32px
            margin -64px auto 0
            clear both
            text-align center
            font-size 32px
        .detail_wrapper
            min-height 100%
            width 100%
            .detail_main
                padding  64px 36px
                width 100%
                height 100%
                .name
                    text-align center
                    font-size 16px
                    color rgb(255,255,255)
                    line-height 16px
                    font-weight 700
                .star_wrapper
                    margin 18px auto 0
                    padding 2px 0
                    text-align center
                .title
                    display flex
                    width 100%
                    margin 28px auto 24px
                    .text
                        padding 0 12px
                        font-weight 700
                        font-size 14px
                    .line
                        flex 1
                        position relative
                        top -6px
                        border-bottom 1px solid rgba(255,255,255,0.2)
                .supports
                    display block
                    width 100%
                    .support_item
                        padding 0 12px
                        display block
                        margin-bottom 12px
                        &:last-child
                            margin-bottom 0
                        .icon
                            display inline-block
                            width 16px
                            height 16px
                            vertical-align top
                            margin 0 6px 0 0
                            background-size 100% 100%
                            background-repeat no-repeat
                            &.decrease
                                bg_img('decrease_2')
                            &.discount
                                bg_img('discount_2')
                            &.guarantee
                                bg_img('guarantee_2')
                            &.invoice
                                bg_img('invoice_2')
                            &.special
                                bg_img('special_2')
                        .text
                            font-size 12px
                            line-height 12px
                            font-weight 200
                .infomation
                    font-size 12px
                    font-weight 200
                    line-height 24px
                    padding  0 12px

</style>
