<template>
    <div class="header">
        <div class="bg">
            <div class="sell_box"> 我是header </div>
            <div class="sell_box"> 头像</div>
            <!-- <input class="sell_box" @click="this1"  disabled='false' value="点击事件" readonly='readonly' /> -->
        </div>
    </div>
</template>

<script>
export default {
  name: 'header',
  methods: {
    this1 () {
      alert('dianjia');
    }
  }
};
</script>

<style>

</style>
