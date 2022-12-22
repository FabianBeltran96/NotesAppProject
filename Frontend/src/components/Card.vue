<script setup>
import axios from "axios";
import { ref, computed } from "vue";

const editMode = ref(false);

const priorityColor = computed(() => {
  if (props.note.priority === 1) return `bg-green-400`;
  if (props.note.priority === 2) return `bg-orange-400`;
  if (props.note.priority === 3) return `bg-red-400`;
});

const emit = defineEmits(["refreshNotes"]);

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const btnChangeMode = (id) => {
  if (editMode.value) {
    editNote(id);
  }

  editMode.value = !editMode.value;
};

const editNote = (id) => {
  axios
    .put(`http://localhost:3000/notes/${id}`, {
      title: props.note.title,
      priority: props.note.priority,
      content: props.note.content,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
const deleteNote = (id) => {
  axios
    .delete(`http://localhost:3000/notes/${id}`)
    .then((res) => emit("refreshNotes"))
    .catch((err) => console.log(err));
};
</script>

<template>
  <article
    class="relative m-2 flex h-80 w-80 flex-col justify-between rounded-md bg-slate-300 p-3 shadow-lg"
  >
    <span class="absolute inset-x-0 bottom-0 h-2" :class="priorityColor"></span>
    <div class="flex justify-between">
      <h2 v-if="!editMode" class="w-64 text-xl font-bold text-gray-900">
        {{ note.title }}
      </h2>
      <input
        v-if="editMode"
        v-model="note.title"
        class="w-64 text-xl font-bold text-gray-900"
      />
      <p class="w-8" v-if="!editMode">{{ note.priority }}</p>
      <input class="w-8" v-if="editMode" v-model.number="note.priority" />
    </div>
    <p v-if="!editMode" class="h-32 w-full bg-blue-50 p-2">
      {{ note.content }}
    </p>
    <textarea
      v-if="editMode"
      v-model="note.content"
      class="h-32 w-full bg-blue-50 p-2"
    />
    <div class="flex items-center justify-between">
      <p>{{ note.id }}</p>
      <div>
        <p class="text-sm">
          {{ new Date(note.createdAt).toLocaleDateString() }}
        </p>
        <p class="text-sm">
          {{ new Date(note.updateAt).toLocaleDateString() }}
        </p>
      </div>
      <div>
        <button
          class="mx-2 rounded bg-orange-300 py-2 px-4 font-bold text-white hover:bg-orange-700"
          @click="btnChangeMode(note.id)"
        >
          💾
        </button>
        <button
          class="rounded bg-red-300 py-2 px-4 font-bold text-white hover:bg-red-700"
          @click="deleteNote(note.id)"
        >
          ❌
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped></style>
