<template>
 <delete-student
  :open="deleteIsOpen"
  :index="this.studentIndex"
  @close="cancelDelete"
 ></delete-student>
 <edit-student
  :open="editIsOpen"
  :studentIndex="this.studentIndex"
  @close="cancelEdit"
 ></edit-student>
 <table class="table table-striped table-hover" id="sortTable">
  <thead>
   <tr>
    <th scope="col">Index</th>
    <th scope="col">Name</th>
    <th scope="col">Date of birth</th>
    <th scope="col">Municipality</th>
    <th scope="col">Actions</th>
   </tr>
  </thead>
  <tbody class="table-group-divider">
   <tr v-for="student in students" :key="student.index">
    <td>{{ student.index }}</td>
    <td>{{ student.name }}</td>
    <td>{{ student.doB }}</td>
    <td>{{ student.municipality }}</td>
    <td>
     <button @click="editStudent(student.index)" class="btn btn-secondary">
      Edit
     </button>
     <button @click="deleteStudent(student.index)" class="btn btn-secondary">
      Delete
     </button>
    </td>
   </tr>
  </tbody>
 </table>
</template>

<script>
import DeleteStudent from "./DeleteStudent.vue";
import EditStudent from "./EditStudent.vue";
export default {
 components: {
  DeleteStudent,
  EditStudent,
 },
 props: {
  students: {
   type: Array,
   required: true,
  },
 },
 emits: ["reload"],
 data() {
  return {
   editIsOpen: false,
   deleteIsOpen: false,
   studentIndex: "",
  };
 },
 methods: {
  editStudent(studentIndex) {
   this.studentIndex = studentIndex;
   this.editIsOpen = true;
  },
  cancelEdit() {
   this.studentIndex = "";
   this.editIsOpen = false;
   this.$emit("reload");
  },
  deleteStudent(studentIndex) {
   this.studentIndex = studentIndex;
   this.deleteIsOpen = true;
  },
  cancelDelete() {
   this.deleteIsOpen = false;
   this.studentIndex = "";
   this.$emit("reload");
  },
 },
};
</script>
