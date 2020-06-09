<template>
  <v-container>
    <h1>サインアップする</h1>
    <v-text-field v-model="email" label="メールアドレス" light></v-text-field>
    <v-text-field v-model="password" label="パスワード" light></v-text-field>
    <p class="errorMessage" style="color: red" v-if="valid">{{ validError }}</p>
    <v-btn @click="signUp()">新規登録</v-btn>
    <p class="toLogin" style="color: black" v-if="valid">{{ loginMessage }}</p>
    <v-btn @click="toLogin()" v-if="valid">ログインページへ</v-btn>
  </v-container>
</template>

<script>
import firebase from "~/plugins/firebase"

export default {
  data() {
    return{
      email: "",
      password: "",
      valid: false,
      validError: "入力されたメールアドレスはすでに登録されています",
      loginMessage: "ログインページへ飛びますか？"
    }
  },
  methods: {
   signUp() {
     firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
     .then(users => {
       this.$store.commit("loginState", users.uid)
       this.$router.push("/")
     }).catch(() => {
       this.valid = true
      })
    },
    toLogin() {
      this.$router.push("/login")
    }
  }
}
</script>