<script setup>
import axios from "axios";
import { computed, onMounted } from "vue";

const priorityColor = computed(() => {
  if (props.note.priority === 1) return `bg-green-300`;
  if (props.note.priority === 2) return `bg-orange-300`;
  if (props.note.priority === 3) return `bg-red-300`;
});

const emit = defineEmits(["refreshNotes"]);
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const deleteNote = (id) => {
  axios
    .delete(`http://localhost:3000/notes/${id}`)
    .then((res) => emit("refreshNotes"))
    .catch((err) => console.log(err));
};
</script>

<template>
  <article
    class="relative m-2 flex h-64 w-64 flex-col justify-between rounded-md bg-slate-300 p-3 shadow-lg"
  >
    <span class="absolute inset-x-0 bottom-0 h-2" :class="priorityColor"></span>
    <div class="flex justify-between">
      <h2 class="b text-xl font-bold text-gray-900">{{ note.title }}</h2>
      <p>{{ note.priority }}</p>
    </div>
    <p class="h-32 w-full bg-blue-50 p-2">{{ note.content }}</p>
    <div class="flex items-center justify-between">
      <p>{{ note.id }}</p>
      <p class="">{{ new Date(note.createdAt).toLocaleDateString() }}</p>
      <button
        class="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        @click="deleteNote(note.id)"
      >
        X
      </button>
    </div>
  </article>
</template>

<style scoped></style>
