<template>
    <div class="user">
        <span>{{ user.name }}</span>
    </div>
</template>

<script>
import User from "@/components/User.js";
export default {
    props: {
        user: {
            type: User,
            required: true,
        }
    }
}
</script>

<style scoped>
.user {
    background: rgba(0, 0, 0, 0.4);
    width: 307px;
    height: 35px;
    border-radius: 15px;
    margin: 5px;
}

span {
    font-size: 20px;
    font-family: 'Inter';
    color: white;
    margin: 10px;
}
</style>