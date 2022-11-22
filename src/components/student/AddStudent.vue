<template>
 <div v-if="open" class="backdrop" @click="$emit('close')"></div>
 <transition name="modal">
  <dialog open v-if="open">
   <div class="card w-200">
    <div class="card-body">
     <h5 class="card-title">Add Student</h5>
     <form @submit.prevent="addStudent">
      <table>
       <tr>
        <td><label for="index">Index</label></td>
        <td>
         <input type="text" id="index" v-model="index" />
         <p class="errorMsg" v-if="this.errorList.index !== ''">
          {{ this.errorList.index }}
         </p>
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
        <td><button class="btn btn-primary" type="submit">Add</button></td>
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
 props: ["open"],
 emits: ["close"],
 data() {
  return {
   index: "",
   name: "",
   doB: "",
   municipality: "",
   errorList: {
    index: "",
    name: "",
    doB: "",
    municipality: "",
   },
   allowAdd: false,
  };
 },
 methods: {
  addStudent() {
   this.validateData();
   if (this.allowAdd) {
    this.userExists();
   }
   if (this.allowAdd) {
    const newStudent = {
     index: this.index,
     name: this.name,
     doB: this.doB,
     municipality: this.municipality,
    };
    this.$store.dispatch("addStudent", { student: newStudent });
    this.$emit("close");
   }
  },
  validateData() {
   if (this.index.length < 4) {
    this.allowAdd = false;
    this.errorList.index = "Index should be longer than 4 digits";
   } else {
    this.errorList.index = "";
   }
   if (this.name === "") {
    this.allowAdd = false;
    this.errorList.name = "Please fill the name field.";
   } else if (this.name.split(" ").length === 1) {
    this.allowAdd = false;
    this.errorList.name = "Please enter name and surname.";
   } else {
    this.errorList.name = "";
   }
   if (this.doB === "") {
    this.allowAdd = false;
    this.errorList.doB = "Please fill the Date of Birth field.";
   } else {
    this.errorList.doB = "";
   }
   if (this.municipality === "") {
    this.allowAdd = false;
    this.errorList.municipality = "Please fill the municipality field.";
   } else {
    this.errorList.municipality = "";
   }

   if (
    this.errorList.name === "" &&
    this.errorList.doB === "" &&
    this.errorList.municipality === "" &&
    this.errorList.index === ""
   ) {
    this.allowAdd = true;
   }
  },
  userExists() {
   const isUser = this.$store.getters.userExists(this.index);
   if (isUser) {
    this.errorList.index = "This index is already a user";
    this.allowAdd = false;
   } else {
    this.errorList.index = "";
   }

   if (this.errorList.index === "") {
    this.allowAdd = true;
   }
  },
 },
};
</script>

<style>
.backdrop {
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100vh;
 z-index: 10;
 background-color: rgba(0, 0, 0, 0.468);
}
.errorMsg {
 color: #d60929;
 margin: 0 auto;
 margin-bottom: 1rem;
 margin-top: -0.2rem;
 padding: 0;
}
dialog {
 position: fixed;
 top: 20vh;
 width: max-content;
 left: calc(50% - 15rem);
 margin: 0;
 box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
 border-radius: 1.5rem;
 z-index: 100;
 border: none;
 text-align: left;
}

.modal-enter-active {
 animation: modal 0.3s ease-out;
}

.modal-leave-active {
 animation: modal 0.3s ease-in reverse;
}

@keyframes modal {
 from {
  opacity: 0;
  transform: scale(0.8);
 }

 to {
  opacity: 1;
  transform: scale(1);
 }
}
</style>
