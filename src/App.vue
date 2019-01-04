<template>
  <div id="app" class="content">
    <v-header></v-header>
    <div class="tab">导航</div>
    <div class="content"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header';

export default {
  name: '',
  data () {
    return {

    };
  },
  methods: {},
  components: {
    'v-header': header
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylusnpm'>
.content{text-align :center}
</style>
