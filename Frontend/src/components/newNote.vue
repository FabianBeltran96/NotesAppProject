<script setup>
import { reactive, ref } from "vue";
import axios from "axios";

const newNote = reactive({ title: "", content: "", priority: 1 });
const errorMessage = ref("");

const emit = defineEmits(["refreshNotes", "closeModal"]);

const addNote = () => {
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
      emit("closeModal");
      emit("refreshNotes");
    })
    .catch((err) => console.log(err));
};
</script>

<template>
  <div class="overlay">
    <div class="modal">
      <div class="inputs">
        <input
          class="focus:shadow-outline w-3/4 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          v-model="newNote.title"
          type="text"
        />
        <input
          class="focus:shadow-outline w-1/5 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          v-model="newNote.priority"
          type="number"
        />
      </div>
      <textarea
        class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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
</template>

<style>
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
