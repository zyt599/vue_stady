<template>
    <div class="cart_wrapprt">
        <transition  name="move">
          <span class="cut" @click="cut" v-show="food.count>0" >
            <span class="inner  icon-thumb_down"></span>
          </span>
        </transition>
        <transition name="move">
          <span class="number" v-show="food.count>0" tran> {{food.count}}</span>
        </transition>
        <span class="choose icon-add_circle" @click="choose"></span>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'cartcontrol',
  data () {
    return {
    };
  },
  props: {
    food: {}
  },
  methods: {
    choose () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      };
    },
    cut () {
      if (this.food.count) {
        this.food.count--;
      }
    }
  },
  created () {
  }
};
</script>

<style lang="stylus">
.cart_wrapprt
    display inline
    fonts-size 0
    .number
        display inline-block
        width 24px
        font-size 10px
        line-height 36px
        color rgb(147,153,159)
        text-align center
        &.move-enter-active,&.move-leave
          transition all .4s linear
          opacity 1
          transform translate3d(0,0,0)
        &.move-leave-active,&.move-enter
          opacity 0
          transform translate3d(24px,0,0)
    .choose
        display inline-block
        font-size 24px
        color rgb(0,160,220)
        text-align right
        padding 6px
        vertical-align middle
    .cut
      display inline-block
      transition all .4s linear
      &.move-enter-active,&.move-leave
        opacity 1
        transform translate3d(0,0,0)
        .inner
          transform rotate(0)
      &.move-leave-active,&.move-enter
        opacity 0
        transform translate3d(24px,0,0)
        .inner
          transform rotate(180deg)
      .inner
        transition all .4s linear
        display inline-block
        font-size 24px
        color rgb(0,160,220)
        text-align right
        vertical-align middle
</style>
