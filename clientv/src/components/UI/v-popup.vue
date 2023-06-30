<template>
    <div class="modal">
        <div class="v-popup">
            <div class="v-popup_header">
                <span>
                    Список территорий
                </span>
                <span>
                    <i class="material-icons" @click="closePopup">X</i>
                </span>
            </div>   
            <div class="v-popup_content">
                <slot></slot>
            </div>
            <div class="v-popup_footer">  
                <my-button @click="closePopup">Закрыть</my-button>
            </div>
        </div>
    </div>
   
</template>

<script>
    export default {
        name: "v-popup",
        props: {

        },
        
        data() {
            return {
                
            }
        },
        methods: {
            closePopup () {
                this.$emit( 'closePopup');
            }          
        }    
    }
</script>

<style>
    .modal{

        position: fixed; top: 50%; left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    .v-popup {
        padding: 10px;

        top: 50px;
        right: 50;
        left: 50;
        width: 400px;
        background: #ffffff;
        box-shadow: 0 0 17px 0 #e7e7e7;
    }
    .v-popup .v-popup_header{
        display: flex;
        justify-content: space-between;
        align-items: right;
    }
    .v-popup  .v-popup_footer {
        display: flex;
        justify-content: center;
        align-items: right; 
    }
    .v-popup .v-popup_content {
        display: flex;
        justify-content: center;
        align-items: center; 
    }

</style>

