<template>
    <div class="main-rectangle">
        <div class="back-and-input-name">
            <button class="btn-back"></button>
            <my-input style="width: 358px; height: 45px; margin: 5px;"/>
        </div>
    </div>

</template>

<script>

export default {
    name: 'createconf-board',
    components: {
    }
}
</script>

<style scoped>
   .main-rectangle {
        width: 423px;
        height: 186px;
        border-radius: 25px;
        background: rgba(158, 0, 255, 0.3);
    }

    .btn-back{
        margin-left: 5px;
        margin-top: 5px;
        width: 50px;
        height: 50px;


    background: url("@/components/icons/55ovjpq6bo1dpbpq69e2m1lvrq.png");
    }
</style>