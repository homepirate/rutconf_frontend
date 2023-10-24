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
    font-size: 20px;
    font-family: 'Inter';
  }

  .input::placeholder {
    font-family: 'Inter';
    font-weight: bold;
    padding-left: 40px; /* добавление отступа слева */
    color: rgba(255, 255, 255, 0.31); /* изменение цвета плейсхолдера */
}
  
  </style>