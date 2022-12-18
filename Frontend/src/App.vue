<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import Card from "./components/Card.vue";
import NewNote from "./components/newNote.vue";

const showModal = ref(false);
const notes = ref([]);

const refreshNotes = () => {
  axios
    .get("http://localhost:3000/notes")
    .then((res) => (notes.value = res.data))
    .catch((err) => console.log(err));
};

const closeModal = () => (showModal.value = false);

onMounted(refreshNotes);
</script>

<template>
  <main>
    <NewNote
      @refresh-notes="refreshNotes"
      @close-modal="closeModal"
      v-if="showModal"
    />
    <div class="container mx-auto h-full bg-slate-100 p-3">
      <header>
        <h1>Notes</h1>
        <button @click="showModal = true">+</button>
      </header>
      <div class="cards-container">
        <Card
          @refresh-notes="refreshNotes"
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
.cards-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
