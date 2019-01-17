<template>
    <div id="imageMenu" @click.stop>
        <ul>
            <li>
                <span>宽:</span>
                <input type="number" v-model.number="imageSize.imageWidth" @keydown.enter="setSize">
            </li>
            <li>
                <span>高:</span>
                <input type="number" v-model.number="imageSize.imageHeight" @keydown.enter="setSize">
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            imgMenu: [],
            imageSize: {
                imageWidth: 0,
                imageHeight:0
            },
        }
    },
    methods: {
        setSize(){
            this.imageSize.imageWidth
            this.$emit('changeImageSize',this.imageSize);
        }
    }
}
</script>

<style scoped>
    ul {
        list-style:none;
        width: 100%;
    }
    #imageMenu {
        list-style: none;
        margin: 0;
        background: rgb(255, 255, 255);
        font-size: 12px;
        box-shadow: 0 0 2px 2px lightgray;
        display: none;
    }
    #imageMenu ul li {
        height: 25px;
        line-height: 25px;
        width: 100px;
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 10px;
    }
    #imageMenu ul li input {
        width: 70px;
    }
</style>
