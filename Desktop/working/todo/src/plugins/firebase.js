import firebase from "firebase";
// ２度目以降の読み込みでエラーが起きるため、初回のみ初期化の処理を行う
if (!firebase.apps.length) {
  // 認証情報を使用したモジュールの初期化
  firebase.initializeApp({
    apiKey: "AIzaSyDNggR5cxnWxQfJ5dzH3RRGccIsahP9Obk",
    authDomain: "todo-dc123.firebaseapp.com",
    databaseURL: "https://todo-dc123.firebaseio.com",
    projectId: "todo-dc123",
    storageBucket: "todo-dc123.appspot.com",
    messagingSenderId: "916169009699",
    appId: "1:916169009699:web:7a1cabb217bd414dc51f96",
  });
}

export default firebase;
