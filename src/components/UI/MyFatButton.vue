<template>
    <button class="btn">
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    name: 'my-fat-button',

  }
  </script>
  
  <style scoped>
  .btn {
    
    border-radius: 25px;
    background: rgba(93, 11, 161, 0.7);
    cursor: pointer;
    vertical-align: middle;
    font-size: 18px;
    color: white;
  }
  </style>