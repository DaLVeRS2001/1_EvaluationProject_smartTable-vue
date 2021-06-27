<template>
  <div class="container">
    <button v-if="!clicked" @click="clickedHandle">Добавить</button>
    <form @submit.prevent="addRow" v-if="clicked">
      <div class="formPart">
        <CustomInput
          @inputC="setValue"
          name="id"
          placeholder="id"
          fieldType="number"
          :errorMessage="validations.id.errorM"
        />

        <CustomInput
          @inputC="setValue"
          name="firstName"
          placeholder="firstName"
          fieldType="text"
          :errorMessage="validations.firstName.errorM"
        />
      </div>

      <div class="formPart">
        <CustomInput
          @inputC="setValue"
          name="lastName"
          placeholder="lastName"
          fieldType="text"
          :errorMessage="validations.lastName.errorM"
        />

        <CustomInput
          @inputC="setValue"
          name="email"
          placeholder="email"
          fieldType="email"
          :errorMessage="validations.email.errorM"
        />
      </div>

      <div class="formPart">
        <CustomInput
          @inputC="setValue"
          name="phone"
          placeholder="phone"
          fieldType="number"
          :errorMessage="validations.phone.errorM"
        />

        <div class="field">
          <button>Добавить в таблицу</button>
          <button @click="closePanel">X</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import {
  isRequired,
  onlyLetterValidator,
  phoneValidator,
} from "@/validators/validators";
import CustomInput from "@/components/CustomInput/CustomInput";

export default {
  components: { CustomInput },
  emits: {
    addRow: (val) => typeof val === "object",
  },
  data() {
    return {
      clicked: false,
      form: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      validations: {
        id: { errorM: "" },
        firstName: { errorM: "" },
        lastName: { errorM: "" },
        email: { errorM: "" },
        phone: { errorM: "" },
      },
    };
  },
  methods: {
    clickedHandle() {
      this.clicked = !this.clicked;
    },
    setValue(key) {
      this.form[key.name] = key.value;
    },
    closePanel() {
      this.clicked = false;
      for (let key in this.form) {
        this.form[key] = "";
        this.validations[key].errorM = "";
      }
    },
    addRow() {
      for (let key in this.form) {
        if (!this.form[key].length) {
          this.validations[key].errorM = isRequired(this.form[key]);
        }
      }
      for (let key in this.validations) {
        if (this.validations[key].errorM) return;
      }

      const data = {
        ...this.form,
        description:
          "egestas dolor ipsum aenean vestibulum vestibulum malesuada et placerat elit pulvinar tortor ac sit vitae tincidunt dolor nullam tincidunt velit et nec egestas lectus vestibulum vitae porta at lacus elementum ac pretium",
        address: {
          city: "Chesterfield",
          state: "VT",
          streetAddress: "9302 Ac Dr",
          zip: "87867",
        },
      };
      this.$emit("addRow", data);
      this.closePanel();
    },
  },
  watch: {
    firstName() {},
    lastName() {},
    phone() {},
    form: {
      deep: true,
      handler(value) {
        if (this.clicked) {
          const v = this.validations;
          for (let key in this.validations) {
            v[key].errorM = isRequired(value[key]);
          }
          if (!v.firstName.errorM) {
            v.firstName.errorM = onlyLetterValidator(value.firstName);
          }
          if (!v.lastName.errorM) {
            v.lastName.errorM = onlyLetterValidator(value.lastName);
          }
          if (!v.phone.errorM) {
            v.phone.errorM = phoneValidator(value.phone);
          }
        }
      },
    },
  },
};
</script>
<style scoped>
.formPart {
  display: flex;
}
form {
  display: flex;
}
@media (max-width: 1200px) {
  .formPart {
    display: block;
  }
}
@media (max-width: 540px) {
  form {
    display: block;
  }
}
</style>
