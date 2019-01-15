<template>
  <div id="app" class="content">
    <v-header></v-header>
    <div class="tab">
      <div class="tab_item">商品</div>
      <div class="tab_item">评价</div>
      <div class="tab_item">商家</div>
    </div>
    <div class="content"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vheader from './components/header/header';

export default {
  name: '',
  data () {
    return {

    };
  },
  methods: {},
  components: {
    'v-header': Vheader
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus'>
.app
  .tab
    display:fiex
    width:33%

</style>
