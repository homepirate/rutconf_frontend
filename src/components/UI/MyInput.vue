<template>
    <input :value="modelValue" @input="updateInput" class="input" type="text">
  </template>
  
  <script>
  export default {
    name: 'my-input',
    props: {
      modelValue: [String, Number]
    },
    methods: {
      updateInput(event) {
        this.$emit('update:modelValue', event.target.value)
      }
    }
  }
  </script>
  
  <style scoped>
  .input {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 15px;
    color: white;
    font-size: 18px;
  }
  
  </style>