<template>
    <transition-group name="user-list">
        <user-item v-for="user in userList" :streamManager="user" :key="user" />
    </transition-group>
</template>


<script>
import UserItem from "@/components/UserItem.vue"
export default {
    components: { UserItem },
    props: {
        userList: {
            type: Array,
            required: true,
        },
    },
    // data() {
    //     return {
    //         streamList: [],
    //     },
    // },
    // mounted(){
    //     for (user in this.userList){

    //     }
    // }
};
</script>