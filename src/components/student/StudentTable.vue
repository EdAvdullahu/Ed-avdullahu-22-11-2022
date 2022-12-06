<template>
 <delete-student
  v-if="deleteIsOpen"
  :open="deleteIsOpen"
  :index="studentIndex"
  @close="closeDelete"
 ></delete-student>
 <!-- <edit-student
  v-if="editIsOpen"
  :studentIndex="studentIndex"
  @close="closeEdit"
 ></edit-student> -->
 <add-student
  :open="addIsOpen"
  @close="handleAdd"
  v-if="addIsOpen"
 ></add-student>
 <el-button class="mt-4" style="width: 10%" @click="handleAdd"
  >Add Student</el-button
 >
 <el-table
  :data="filterTableData"
  :default-sort="{ prop: 'name', order: 'descending' }"
  style="width: 100%"
 >
  <el-table-column prop="index" label="Index" sortable />
  <el-table-column prop="name" label="Name" sortable />
  <el-table-column prop="doB" label="Date of Birth" />
  <el-table-column prop="municipality" label="Municipality" />
  <el-table-column align="right">
   <template #header>
    <el-input v-model="search" size="small" placeholder="Type to search" />
   </template>
   <template #default="scope">
    <el-button size="small" class="button">
     <router-link
      :to="{ name: 'edit-student', params: { studentIndex: scope.row.index } }"
     >
      Edit
     </router-link>
    </el-button>
    <el-button size="small" type="danger" @click="handleDelete(scope.row.index)"
     >Delete</el-button
    >
   </template>
  </el-table-column>
 </el-table>
</template>

<script>
import DeleteStudent from "./DeleteStudent.vue";
// import EditStudent from "./EditStudent.vue";
import AddStudent from "./AddStudent.vue";
export default {
 props: {
  students: {
   type: Array,
   required: true,
  },
 },
 components: {
  DeleteStudent,
  AddStudent,
 },
 data() {
  return {
   search: "",
   editIsOpen: false,
   deleteIsOpen: false,
   addIsOpen: false,
   studentIndex: "",
   student: {},
  };
 },
 computed: {
  filterTableData() {
   return this.students.filter(
    (data) =>
     !this.search ||
     data.name.toLowerCase().includes(this.search.toLowerCase()) ||
     data.municipality.toLowerCase().includes(this.search.toLowerCase()) ||
     data.index.includes(this.search)
   );
  },
 },
 methods: {
  handleDelete(index) {
   this.deleteIsOpen = true;
   this.studentIndex = index;
  },
  closeDelete() {
   this.studentIndex = "";
   this.deleteIsOpen = false;
  },
  handleAdd() {
   this.addIsOpen = !this.addIsOpen;
  },
 },
};
</script>

<style scoped>
a {
 text-decoration: none;
 color: black;
 width: 100%;
 height: 100%;
 margin: 0;
 padding: 1rem 0.5rem;
}
.button {
 padding: 0;
 margin: 0;
}
</style>
