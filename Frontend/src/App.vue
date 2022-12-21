<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import Card from "./components/Card.vue";
import NewNote from "./components/newNote.vue";

const showModal = ref(false);
const showSidebar = ref(false);

const pickedFilter = ref([]);
const pickedSort = ref("noSort");

const notes = ref([]);

watch(pickedFilter, (newValue, oldValue) => {
  if (newValue.length === 3) {
    pickedFilter.value = [];
  }
});

const listNotes = computed(() => {
  if (pickedSort.value === "sortPriority") {
    return notes.value
      .filter(
        (note) =>
          pickedFilter.value == 0 ||
          pickedFilter.value.includes(note.priority.toString())
      )
      .sort((a, b) => (a.priority > b.priority ? 1 : -1));
  }
  if (pickedSort.value === "sortWeekly") {
    return notes.value
      .filter(
        (note) =>
          pickedFilter.value == 0 ||
          pickedFilter.value.includes(note.priority.toString())
      )
      .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  }
  if (pickedSort.value === "noSort") {
    return notes.value.filter(
      (note) =>
        pickedFilter.value == 0 ||
        pickedFilter.value.includes(note.priority.toString())
    );
  }
});

const refreshNotes = () => {
  axios
    .get("http://localhost:3000/notes")
    .then((res) => (notes.value = res.data))
    .catch((err) => console.log(err));
};

const sortNotes = () => console.log(pickedSort.value);

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
    <aside
      class="align-center flex h-screen flex-col justify-center space-y-1 bg-slate-200"
      v-if="showSidebar"
    >
      <div class="mx-auto my-4">
        <div class="flex flex-col">
          <p class="w-56 text-xl font-bold">Filtrar por prioridades</p>
          <div class="flex justify-between">
            <div class="flex">
              <p class="w-4 text-sm font-bold">1</p>
              <input
                type="checkbox"
                v-model.number="pickedFilter"
                name="filter"
                value="1"
                id="priority1"
              />
            </div>
            <div class="flex">
              <p class="w-4 text-sm font-bold">2</p>
              <input
                type="checkbox"
                v-model.number="pickedFilter"
                name="filter"
                value="2"
                id="priority2"
              />
            </div>
            <div class="flex">
              <p class="w-4 text-sm font-bold">3</p>
              <input
                type="checkbox"
                v-model.number="pickedFilter"
                name="filter"
                value="3"
                id="priority3"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mx-auto my-4">
        <div class="flex">
          <p class="w-56 text-lg font-bold">Ordenar por prioridades</p>
          <input
            type="radio"
            v-model="pickedSort"
            @change="sortNotes()"
            name="sort"
            value="sortPriority"
            id="sortPriority"
          />
        </div>
        <div class="flex">
          <p class="w-56 text-lg font-bold">Ordenar por fecha</p>
          <input
            type="radio"
            v-model="pickedSort"
            @change="sortNotes()"
            name="sort"
            value="sortWeekly"
            id="sortWeekly"
          />
        </div>
        <div class="flex">
          <p class="w-56 text-lg font-bold">Sin ordenar</p>
          <input
            type="radio"
            v-model="pickedSort"
            @change="sortNotes()"
            name="sort"
            value="noSort"
            id="noSort"
          />
        </div>
      </div>
    </aside>
    <div class="w-full bg-slate-100 p-3">
      <header>
        <button @click="showSidebar = !showSidebar">-</button>
        <h1>Notes</h1>
        <button @click="showModal = true">+</button>
      </header>
      <div class="cards-container overflow-auto">
        <Card
          @refresh-notes="refreshNotes"
          v-for="(note, index) in listNotes"
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
  display: flex;
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

aside {
  width: 400px;
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
  align-content: flex-start;
  flex-wrap: wrap;
  height: calc(100vh - 170px);
}
</style>
