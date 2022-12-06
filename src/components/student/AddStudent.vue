<template>
 <el-dialog
  title="Add Student"
  v-model="this.oppen"
  width="30%"
  destroy-on-close
  :before-close="handleClose"
  center
 >
  <span>
   <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
   >
    <el-form-item label="Index" prop="index">
     <el-input v-model="ruleForm.index" type="text" autocomplete="off" />
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
  </span>
 </el-dialog>
</template>

<script>
import { mapStores } from "pinia";
import { useStudentsStore } from "../../store/index";
export default {
 props: ["open"],
 emits: ["close"],
 data() {
  return {
   oppen: this.open,
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
 computed: {
  ...mapStores(useStudentsStore),
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
    const user = this.studentsStore.userExists(value);
    if (user) {
     return callback(new Error("Index is already in use"));
    } else {
     callback();
    }
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
   this.$emit("close");
  },
  submitForm(form) {
   form.validate((valid) => {
    if (valid) {
     this.studentsStore.addStudent(this.ruleForm);
     this.handleClose();
    } else {
     return false;
    }
   });
  },
 },
 watch: {
  open() {
   this.oppen = this.open;
  },
 },
};
</script>
