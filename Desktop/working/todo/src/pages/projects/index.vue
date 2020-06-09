<template>
<div>
  <header class="head">
      <b-navbar toggleable="lg" type="light" variant="success">
        <b-navbar-brand href="#" thread-class="text-white">Todo List</b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                  <em>User</em>
                </template>
              <b-dropdown-item @click="toTop()" href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
  </header>
  <section class="container">
    <!-- Side navigation -->
<div class="sidenav">
  <a href="#">ToDo</a>
  <a href="#">Doing</a>
  <a href="#">Done</a>
</div>

<!-- Page content -->
<div class="main">
</div>
    <div class="main_contents">
        <table class="Lists">
          <thead>
            <tr>
              <th class="item1">タスク名</th>
              <!-- <th class="item1">状態</th> -->
              <th class="item1"> </th>
            </tr>
          </thead>
          <tbody class="condition">
            <ul>
              <li
              v-for="(item, i) in todos"
              :key="i"
              class="item2"
              >
              <span v-bind:class= "{ done: item.isDone }" class="list-label">{{item.text}}
                <!-- {{item.createdAt.toDateString()}} -->
                   <span class="button-area">
                <button
                  class="list-button button-done"
                  @click="toggleIsDone(item.id)"
                >完了</button>
                <button
                  class="list-button button-delete"
                  @click="deleteTodo(item.id)"
                >削除</button>
                <!-- <button
                  class="list-button button-edit"
                  @click="editTodo(item.id)"
                >編集</button> -->
              </span>
              </span>
              </li>
            </ul>
          </tbody>
        </table>
        <div class="addArea">
          <input type="text" name="todo-text" id="addName" class="input-text" placeholder="Add Task Here" :value= "text"
            @input="inputText"/>
          <button
            class="add-button"
            @click="addTodo"
          >ADD TODO</button>
        </div>
    </div>
  </section>
</div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
//firebase.firestoreをdbで定義をする
const db = firebase.firestore()

export default {
  async asyncData() {
    const querySnapshot = await db.collection('todos').get()
    const todos = querySnapshot.docs.map((doc) => doc.data())
    return {
      todos: todos
    }
  },
    created: function () {
    this.db = firebase.firestore()

    var _this = this
　　// todos コレクションを監視する
    this.db.collection('todos').onSnapshot(function (querySnapshot) {
      _this.todos = []
      querySnapshot.forEach(function (doc) {
        var data = doc.data()
        data.id = doc.id
        _this.todos.push(data)
      })
    })
  },


 methods: {
    inputText(e) {
      this.text = e.target.value;
    },
    addTodo() {
      if (!this.text) return;
        //text
      const text = this.text;
      const id = Math.ceil(Math.random() * 1000);
      const todo = {
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        id,
        isDone: false,
        text,
      };
      // const timestamp = snapshot.get('created_at');
      // const date = timestamp.toDate(); // JS Date 型が欲しい場合
      // const seconds = timestamp.seconds; // 秒数が欲しい場合
      // const nanoseconds = timestamp.nanoseconds;
          // Add a new document in collection "cities"
    db.collection("todos").add(todo)
    .then(function(docRef) {
        alert("todoを追加しました", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    }),


    this.todos.push(todo);
    this.resetText();
    },
    resetText() {
      this.text = '';
    },

    deleteTodo(id) {
      const index = this.getIndexBy(id);
      this.todos.splice(index, 1);
      db.collection('todos').doc(id).delete();
      alert("todoを削除しました")
    },

    // editTodo(id) {

    // }

    // db.collection("todos").delete(todo)
    // .then(function(docRef) {
    //     alert("ToDOを追加しました", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // // });
    // editToDo(id) {
    //     var newText = alert('以下内容で更新します。');
    //     if (newText === '') {
    //         alert('入力欄が空欄です。');
    //     } else if(newText !== null) {
    //         this.edit(id, newText);
    //     }
    // },
    // edit(id, text) {
    //     var editIndex = '';
    //     this.list.some(function (value, index) {
    //         if (value.id === id) {
    //             editIndex = index;
    //         }
    //     });
    //     this.list[editIndex].text = text;
    // }
    // },

    toggleIsDone(id) {
      const index = this.getIndexBy(id);
      this.todos[index].isDone = !this.todos[index].isDone;
    },
    getIndexBy(id) {
      const filteredTodo = this.todos.filter(todo => todo.id === id)[0];
      const index = this.todos.indexOf(filteredTodo);
      return index;
    }
  },
  computed: {
    doneTodo() {
      return this.todos.filter(todo => todo.isDone === true);
     },
    }
  }

</script>

<style>


.container {
    margin: 0px;
    padding: 0px;
    font-size: 20px;
}

.main_contents {
  max-width: 70%;
  /* background-color: #CCFFCC; */
  margin:0 0 0 auto;
}

.item1 {
  margin: 20px;
  padding: 20px;
}

.item2 {
  margin: 10px;
  padding: 10px;
}

.input-text{
  margin: 15px;
  padding: 20px;
}

.button button--green {
  margin: 20px;
  padding: 10px;
}

/* The sidebar menu */
.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 160px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 10; /* Stay on top */
  top: 20; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
}

/* The navigation menu links */
.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}

/* Style page content */
.main {
  margin-left: 160px; /* Same as the width of the sidebar */
  padding: 0px 10px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

span.done {
  text-decoration: line-through;
}


</style>
