<template>
  <v-content>
    <h2 style="color: black">トップページ</h2>
        <v-btn @click="toLogin()" >ログイン</v-btn>
  </v-content>
</template>

<script>
  export default {
    methods: {
      toLogin() {
        this.$router.push("/login")
      }
    }
  }
</script>