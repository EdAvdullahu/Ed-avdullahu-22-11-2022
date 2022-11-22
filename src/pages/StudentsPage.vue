<template>
 <add-student :open="this.addIsOpen" @close="cancelAdd"></add-student>
 <div class="inputs-holder">
  <input type="text" placeholder="search..." v-model="search" />
  <button class="btn btn-secondary" @click="addStudent">Add</button>
 </div>
 <students-table
  @reload="reloadContent"
  :students="this.studentsList"
 ></students-table>
</template>

<script>
import { mapGetters } from "vuex";
import StudentsTable from "../components/student/StudentTable.vue";
import AddStudent from "../components/student/AddStudent.vue";
export default {
 components: {
  StudentsTable,
  AddStudent,
 },
 data() {
  return {
   students: this.$store.getters.students,
   studentsList: this.$store.getters.students,
   addIsOpen: false,
   search: "",
  };
 },
 watch: {
  ...mapGetters["students"],
  search() {
   this.studentsList = this.students.filter(
    (x) =>
     x.name.toLowerCase().includes(this.search) ||
     x.municipality.toLowerCase().includes(this.search) ||
     x.index.includes(this.search)
   );
  },
 },
 methods: {
  addStudent() {
   this.addIsOpen = true;
  },
  cancelAdd() {
   this.reloadContent();
   this.addIsOpen = false;
  },
  reloadContent() {
   this.studentsList = this.$store.getters.students;
  },
 },
};
</script>

<style scoped>
.inputs-holder {
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 padding: 2rem;
}
</style>
