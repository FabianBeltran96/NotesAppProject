<script setup>
const emit = defineEmits(["deleteNote"]);
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card">
    <h2>{{ note.title }}</h2>
    <p class="main-text">{{ note.content }}</p>
    <div class="card-footer">
      <p>{{ note.id }}</p>
      <p class="date">{{ new Date(note.createdAt).toLocaleDateString() }}</p>
      <i @click="emit('deleteNote', note.id)">X</i>
    </div>
  </div>
</template>

<style scoped>
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
</style>
