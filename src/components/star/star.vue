<template>
    <div class="star" :class="startScore">
        <span  class="star_item" :key="itemclass" v-for="itemclass in result"  :class="itemclass" track-by="$index"></span>
    </div>
</template>

<script>
const Lenth = 5;
const StarOn = 'on';
const StarHalf = 'half';
const StarOff = 'off';

export default {
  name: 'star',
  props: {
    size: {type: Number},
    score: {type: Number}
  },
  computed: {
    startScore () {
      return 'star-' + this.size;
    },
    result () {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDeciml = this.score % 1 !== 0;
      let integer = Math.floor(score);
      for (var i = 0; i < integer; i++) {
        result.push(StarOn);
      }
      if (hasDeciml) {
        result.push(StarHalf);
      }
      if (result.length < Lenth) {
        result.push(StarOff);
      }
      return result;
    }
  }

};
</script>

<style lang="stylus">
@import "../../common/stylus/mixxin.styl";

.star
    display block
    height 50px
    .star_item
        line-height 24px
        display inline-block
        background-repeat no-repeat
        background-size 100% 100%
        width 24px
        height 24px
        margin-right 22px
        &:last-child
            margin-right 0
&.star-24
    .on
        bg_img("star24_on")
    .half
        bg_img("star24_half")
    .off
        bg_img("star24_off")
&.star-36
    .on
        bg_img("star36_on")
    .half
        bg_img("star36_half")
    .off
        bg_img("star36_off")
&.star-48
    .on
        bg_img("star48_on")
    .half
        bg_img("star48_half")
    .off
        bg_img("star48_off")
</style>
