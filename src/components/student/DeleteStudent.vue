<template>
 <div v-if="open" class="backdrop" @click="$emit('close')"></div>
 <transition name="modal">
  <dialog open v-if="open">
   <form @submit.prevent="deleteStudent">
    <div class="card w-200">
     <div class="card-body">
      <h5 class="card-title">Delete Student</h5>
      <p class="card-text">
       Do you want to delete student with index: "{{ index }}"
      </p>
      <button @click="$emit('close')" type="button" class="btn btn-primary">
       Cancel
      </button>
      <button type="submit" class="btn btn-primary">Delete</button>
     </div>
    </div>
   </form>
  </dialog>
 </transition>
</template>

<script>
export default {
 props: ["open", "index"],
 emits: ["close"],
 methods: {
  deleteStudent() {
   this.$store.dispatch("deleteStudent", { index: this.index });
   this.$emit("close");
  },
 },
};
</script>
