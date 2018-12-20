<template>
    <div id="imageMenu">
        <ul>
            <li>设置图片宽高</li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            imgMenu: []
        }
    }
}
</script>

<style scoped>
    ul {
        list-style:none;
    }
    #imageMenu {
        list-style: none;
        margin: 0;
        background: rgb(250, 250, 250);
        font-size: 12px;
        border: 1px solid lightgray;
        display: none;
    }
    #imageMenu ul li {
        height: 30px;
        line-height: 30px;
        width: 100px;
        text-align: center;
    }
</style>
