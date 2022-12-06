<template>
 <el-dialog
  title="Delete"
  :model-value="this.oppen"
  width="30%"
  :before-close="handleClose"
  center
 >
  <span> Are you sure you want to delete student: {{ this.index }}? </span>
  <template #footer>
   <span class="dialog-footer">
    <el-button @click="handleClose">Cancel</el-button>
    <el-button type="primary" @click="deleteStudent"> Confirm </el-button>
   </span>
  </template>
 </el-dialog>
</template>

<script>
import { mapStores } from "pinia";
import { useStudentsStore } from "../../store/index";
export default {
 props: ["open", "index"],
 emits: ["close"],
 data() {
  return {
   oppen: this.open,
  };
 },
 computed: {
  ...mapStores(useStudentsStore),
 },
 methods: {
  deleteStudent() {
   this.studentsStore.deleteStudent({ index: this.index });
   this.$emit("close");
  },
  handleClose() {
   this.$emit("close");
  },
 },
 watch: {
  open() {
   this.oppen = this.open;
  },
 },
};
</script>
