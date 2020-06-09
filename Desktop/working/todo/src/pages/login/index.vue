<template>
  <v-container>
    <h2 style="color: black; text-align: left">ログイン</h2>
      <v-text-field v-model="email" label="メールアドレス" light></v-text-field>
      <v-text-field v-model="password" label="パスワード" light></v-text-field>
      <p class="errorMessage" style="color: red" v-if="valid">{{ validError }}</p>
      <v-btn @click="mailLogin()">ログイン</v-btn>
    <h2 style="color: black; text-align: left">Google アカウントでログイン</h2>
      <v-btn @click="googleLogin()">ログイン</v-btn>
    <h2 style="color: black; text-align: left">新規登録</h2>
      <v-btn @click="toSignup()">新規登録</v-btn>
  </v-container>
</template>

<script>
import firebase from "~/plugins/firebase"

export default {
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      validError: "メールアドレスまたはパスワードが間違っています",
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(users => {
      if (users != null) {
        this.$store.commit("loginState", users.uid)
        this.$router.push("/projects")
      } else {
        console.log("Not signin")
      }
    })
  },
  methods: {
    mailLogin() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(users => {
        this.$store.commit("loginState", users.uid)
      }).catch(() => {
        console.log("error")
        this.valid = true
      })
    },
    googleLogin() {
     const provider = new firebase.auth.GoogleAuthProvider()
     firebase.auth().signInWithRedirect(provider)
     .then(users => {
       this.$store.commit("loginState", users.uid)
     }).catch(() => {
       console.log("error")
     })
    },
    toSignup() {
      this.$router.push("/login/signup")
    }
  }
}
</script>