<template>
    <div id="app">
        <button class="btn  btn-primary" @click="get"> get</button>
        <button class="btn  btn-primary" @click="post"> post</button>
        <button class="btn  btn-primary" @click="json"> json</button>
        <span> {{msg}}</span>
    </div>
</template>
<script>

export default {
  name: 'resource',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  methods: {
    successCallback (res) {
      this.msg = res.bodyText;
      var str, str2;
      str = res.bodyText.replace('{"d":null}', '');
      str2 = JSON.parse(str);
      console.log(str2.data[0].PlateData);
    },
    errorCallback (err) {
      this.msg = err;
    },
    get () {
      this.$http.get('../static/package.json').then(
        this.successCallback, this.errorCallback
      );
    },
    post () {
      var jsonValue = {jsonValue: '{"type":1}'};
      this.$http.post('http://219.153.13.158:8005/WeChatService.asmx/GetHomeImages',
        JSON.stringify(jsonValue)
      ).then(
        this.successCallback, this.errorCallback
      );
    }
  }

};
</script>

<style>

</style>
