<template>
    <div class="testIndex">
        <div class="video">
            <div class="movie">

            </div>
            <div v-if="isShowBarrage" class="barrage">
                <span behavior="slide" direction="">1111</span>
                <span behavior="" direction="">1111</span>
                <span behavior="" direction="">1111</span>
            </div>
            <div class="funx">
                <button @click="isShowBarrage=!isShowBarrage">弹幕</button>
                <input type="text" >
                <button>评论</button>
            </div>        
        </div>
        
    </div>
</template>

<script>

export default {
    name:'testIndex',
    data(){
        return{
            isShowBarrage:true,
        }
    },
    created(){

    },
    methods:{
        controlBarrage(){
            
        }
    }
}
</script>

<style lang="scss" scoped>
.video{
    background-color: aquamarine;
    position: relative;
    .movie{
        height: 30rem;
    }
    .barrage{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .func{
        width: 100%;
        height: 3rem;
    }
}
</style>

