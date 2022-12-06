<template>
 <el-dialog
  title="Edit Student"
  :model-value="this.oppen"
  width="30%"
  :before-close="handleClose"
  center
  :destroy-on-close="true"
  v-if="this.oppen"
 >
  <el-form
   ref="ruleFormRef"
   :model="ruleForm"
   status-icon
   :rules="rules"
   label-width="120px"
   class="demo-ruleForm"
  >
   <el-form-item label="Index" prop="index">
    <el-input
     v-model="ruleForm.index"
     type="text"
     autocomplete="off"
     readonly
    />
   </el-form-item>
   <el-form-item label="Name" prop="name">
    <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
   </el-form-item>
   <el-form-item label="Municipality" prop="municipality">
    <el-input v-model="ruleForm.municipality" type="text" autocomplete="off" />
   </el-form-item>
   <el-form-item label="Date of Birth" prop="doB">
    <el-input v-model="ruleForm.doB" type="date" autocomplete="off" />
   </el-form-item>
   <el-form-item>
    <el-button @click="handleClose">Cancel</el-button>
    <el-button type="primary" @click="submitForm(this.$refs.ruleFormRef)"
     >Submit</el-button
    >
   </el-form-item>
  </el-form>
 </el-dialog>
</template>

<script>
import { mapStores } from "pinia";
import { useStudentsStore } from "../../store/index";
export default {
 props: ["studentIndex"],
 emits: ["close"],
 data() {
  return {
   oppen: true,
   ruleForm: {
    index: "",
    name: "",
    municipality: "",
    doB: "",
   },
   rules: {
    index: [{ validator: this.validateIndex, trigger: "blur" }],
    name: [{ validator: this.validateName, trigger: "blur" }],
    municipality: [{ validator: this.validateMunicipality, trigger: "blur" }],
    doB: [{ validator: this.checkAge, trigger: "blur" }],
   },
  };
 },
 methods: {
  checkAge(rule, value, callback) {
   if (!value) {
    return callback(new Error("Please input a date of birth."));
   } else {
    callback();
   }
  },
  validateIndex(rule, value, callback) {
   if (!value) {
    return callback(new Error("Please input an Index."));
   } else if (value.length !== 4) {
    return callback(new Error("Index should be 4 digits long."));
   } else {
    callback();
   }
  },
  validateName(rule, value, callback) {
   if (!value) {
    return callback(new Error("Please input a Name."));
   } else if (!value.includes(" ")) {
    return callback(new Error("Please enter name and surname"));
   } else {
    callback();
   }
  },
  validateMunicipality(rule, value, callback) {
   if (!value) {
    return callback(new Error("Please input a Municipality."));
   } else {
    callback();
   }
  },
  handleClose() {
   this.$router.go(-1);
  },
  submitForm(form) {
   form.validate((valid) => {
    if (valid) {
     this.studentsStore.editStudent(this.ruleForm);
     this.handleClose();
    } else {
     return false;
    }
   });
  },
 },
 mounted() {
  const user = this.studentsStore.getStudentById(this.studentIndex);
  this.ruleForm.index = user.index;
  this.ruleForm.name = user.name;
  this.ruleForm.doB = user.doB;
  this.ruleForm.municipality = user.municipality;
 },
 computed: {
  ...mapStores(useStudentsStore),
 },
};
</script>
