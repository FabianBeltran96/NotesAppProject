<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import Card from "./components/Card.vue";

const showModal = ref(false);
const notes = ref([]);
const newNote = reactive({ title: "", content: "", priority: 1 });
const errorMessage = ref("");

const refreshNotes = () => {
  axios
    .get("http://localhost:3000/notes")
    .then((res) => (notes.value = res.data))
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
  console.log(id, "id");
  axios
    .delete(`http://localhost:3000/notes/${id}`)
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
          <input class="priority" v-model="newNote.priority" type="number" />
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
      </div>
    </div>
    <div class="container p-3 bg-slate-100">
      <header>
        <h1>Notes</h1>
        <button @click="showModal = true">+</button>
      </header>
      <div class="cards-container">
        <Card
          @delete-note="deleteNote"
          v-for="(note, index) in notes"
          :key="index"
          :note="note"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
}

.container {
  margin: 0 auto;
  height: 100%;
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
.cards-container {
  display: flex;
  flex-wrap: wrap;
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
