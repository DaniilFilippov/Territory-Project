<template>
    <button class="btn">
        <slot> <!--Все что будет записывать между MyButton уходит в SLOT-->

        </slot>
    </button>
</template>
<script>
export default {
    name: 'my-button'
}
</script>
<style>
    .btn {
        align-self: flex-start;
        margin-top: 10px;
        padding: 10px 10px;
        background: none;
        border: 2px solid rgb(18, 131, 9);
    }
    .btn:hover {
        background: green;
        color: white;
    }.btn:active {
        background: rgb(255, 255, 255);
        color: green;
    }
</style>