<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
const showModal = ref(false);
const newNote = reactive({ title: "", content: "", priority: 1 });
const errorMessage = ref("");

const notes = ref([]);

const refreshNotes = () => {
  axios
    .get("http://localhost:3000/notes")
    .then((res) => {
      notes.value = res.data;
    })
    .catch((err) => console.log(err));
};

const addNote = () => {
  if (newNote.content.length < 10) {
    return (errorMessage.value = "Error Msg: Short Msg");
  }

  axios
    .post("http://localhost:3000/notes", {
      title: newNote.title,
      content: newNote.content,
      priority: newNote.priority,
    })
    .then((res) => {
      errorMessage.value = "";
      newNote.title = "";
      newNote.content = "";
      newNote.priority = 1;
      showModal.value = false;
      refreshNotes();
    })
    .catch((err) => console.log(err));
};

const deleteNote = (id) => {
  console.log(id);
  axios
    .delete("http://localhost:3000/notes/" + id)
    .then((res) => refreshNotes())
    .catch((err) => console.log(err));
};

onMounted(refreshNotes);
</script>

<template>
  <main>
    <div class="overlay" v-if="showModal">
      <div class="modal">
        <div class="inputs">
          <input class="title" v-model="newNote.title" type="text" />
          <input class="priority" v-model="newNote.priority" type="text" />
        </div>
        <textarea
          v-model.trim="newNote.content"
          name="note"
          id="note"
          cols="30"
          rows="10"
        ></textarea>
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <button @click="addNote">Add Note</button>
        <button @click="showModal = false">Close</button>
      </div>
    </div>
    <div class="container">
      <header>
        <h1>Notes</h1>
        <button @click="showModal = true">+</button>
      </header>
      <div class="cards-container">
        <div class="card" v-for="(note, index) in notes" :key="index">
          <h2>{{ note.title }}</h2>
          <p class="main-text">{{ note.content }}</p>
          <div class="card-footer">
            <p>{{ note.id }}</p>
            <p class="date">{{}}</p>
            <i @click="deleteNote(note.id)">X</i>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  width: 100vw;
}

.container {
  max-width: 1000px;
  padding: 10px;
  margin: 0 auto;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-weight: bold;
  margin-bottom: 25px;
  font-size: 75px;
}

header button {
  border: none;
  padding: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: rgb(21, 20, 20);
  border-radius: 100%;
  color: white;
  font-size: 20px;
}

.card {
  width: 225px;
  height: 225px;
  background-color: rgb(237, 182, 44);
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
  margin-bottom: 20px;
}

.date {
  font-size: 12.5px;
  font-weight: bold;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
}

.card-footer {
  display: flex;
  justify-content: space-around;
  align-content: center;
}

.card-footer i {
  cursor: pointer;
  background: aliceblue;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  text-align: center;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.77);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 750px;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.modal input {
  height: 24px;
  font-size: 20px;
  margin-bottom: 20px;
}

.inputs {
  display: flex;
  justify-content: space-between;
}
.title {
  width: 75%;
}

.priority {
  width: 20%;
}

.modal button {
  padding: 10px 20px;
  font-size: 20px;
  width: 100%;
  background-color: blueviolet;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 15px;
}

.modal .close {
  background-color: rgb(193, 15, 15);
  margin-top: 7px;
}

.modal p {
  color: rgb(193, 15, 15);
}
</style>
