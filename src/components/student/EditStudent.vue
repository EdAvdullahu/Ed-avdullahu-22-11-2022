<template>
 <div v-if="open" class="backdrop" @click="$emit('close')"></div>
 <transition name="modal">
  <dialog open v-if="open">
   <div class="card w-200">
    <div class="card-body">
     <h5 class="card-title">Edit Student</h5>
     <form @submit.prevent="editUser">
      <table>
       <tr>
        <td><label for="index">Index</label></td>
        <td>
         <input type="text" id="index" readonly v-model="index" />
        </td>
       </tr>
       <tr>
        <td><label for="name">Name</label></td>
        <td>
         <input type="text" id="name" v-model="name" />
         <p class="errorMsg" v-if="this.errorList.name !== ''">
          {{ this.errorList.name }}
         </p>
        </td>
       </tr>
       <tr>
        <td><label for="dob">Date of birth</label></td>
        <td>
         <input type="date" v-model="doB" id="dob" />
         <p class="errorMsg" v-if="this.errorList.doB !== ''">
          {{ this.errorList.doB }}
         </p>
        </td>
       </tr>
       <tr>
        <td><label for="municipality">Municipality</label></td>
        <td>
         <input type="text" id="municipality" v-model="municipality" />
         <p class="errorMsg" v-if="this.errorList.municipality !== ''">
          {{ this.errorList.municipality }}
         </p>
        </td>
       </tr>
       <tr>
        <td>
         <button class="btn btn-primary" type="button" @click="$emit('close')">
          Cancel
         </button>
        </td>
        <td><button class="btn btn-primary" type="submit">Save</button></td>
       </tr>
      </table>
     </form>
    </div>
   </div>
  </dialog>
 </transition>
</template>

<script>
export default {
 props: ["open", "studentIndex"],
 emits: ["close"],
 data() {
  return {
   loading: false,
   index: "",
   name: "",
   doB: "",
   municipality: "",
   allowEdit: true,
   errorList: {
    name: "",
    doB: "",
    municipality: "",
   },
  };
 },
 methods: {
  editUser() {
   this.validateData();
   if (this.allowEdit && this.open) {
    const updatedUser = {
     index: this.studentIndex,
     name: this.name,
     doB: this.doB,
     municipality: this.municipality,
    };
    this.$store.dispatch("updateStudents", updatedUser);
    this.$emit("close");
   }
  },
  validateData() {
   if (this.name === "") {
    this.allowEdit = false;
    this.errorList.name = "Please fill the name field.";
   } else if (this.name.split(" ").length === 1) {
    this.allowEdit = false;
    this.errorList.name = "Please enter name and surname.";
   } else {
    this.errorList.name = "";
   }
   if (this.doB === "") {
    this.allowEdit = false;
    this.errorList.doB = "Please fill the Date of Birth field.";
   } else {
    this.errorList.doB = "";
   }
   if (this.municipality === "") {
    this.allowEdit = false;
    this.errorList.municipality = "Please fill the municipality field.";
   } else {
    this.errorList.municipality = "";
   }
   if (
    this.errorList.name === "" &&
    this.errorList.doB === "" &&
    this.errorList.municipality === ""
   ) {
    this.allowEdit = true;
   }
  },
 },
 watch: {
  open() {
   if (this.open) {
    this.errorList = {
     name: "",
     doB: "",
     municipality: "",
    };
    this.loading = true;
    const user = this.$store.getters.getStudentById(this.studentIndex);
    this.index = user.index;
    this.name = user.name;
    this.doB = user.doB;
    this.municipality = user.municipality;
    this.loading = false;
   }
  },
 },
};
</script>
