<template>
      <transition-group name="user-list">
        <user-item
          v-for="user in userList"
          :user="user"
          :key="user.name"
        />
      </transition-group>
  </template>


<script>
import UserItem from "@/components/UserItem.vue"
export default {
    components: {UserItem},
  props: {
    userList: {
      type: Array,
      required: true,
    },
  },
};
</script>