<template>
 <router-view></router-view>
 <students-table :students="this.studentsStore.getStudents"></students-table>
</template>

<script>
// import { mapGetters } from "vuex";
import { mapStores } from "pinia";
import { useStudentsStore } from "../store/index";
import StudentsTable from "../components/student/StudentTable.vue";
export default {
 components: {
  StudentsTable,
 },
 computed: {
  ...mapStores(useStudentsStore),
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
