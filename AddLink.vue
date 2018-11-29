<template>
    <div id="link">
        <i class="fa fa-link" 
        onmousedown="event.preventDefault();" 
        title="插入链接"
        @click="show=!show"></i>
        <transition name="link">
            <div  v-show="show" class="linkList">
                <span style="color:black">链接</span>
                <hr>
                <input type="text" placeholder="链接文字" class="linkeAddr" v-model="linkTitle">
                <input type="text" placeholder="链接地址" class="linkeAddr" v-model="linkAddr">
                <div class="footer">
                    <button class="btn danger" @click="handleClose">取消</button>
                    <button class="btn primary" @click="inserLink">确定</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import './css/style.css'
export default {
    data(){
        return {
            linkTitle: '',
            linkAddr: ''
        }
    },
    methods: {
        inserLink(){
            this.restoreRange();
            /**
             * 如果只希望创建链接而不创建文件,则直接执行
             * this.execCommand("CreateLink",this.linkAddr);
             * 否则插入a标签到指定的位置
             */
            if(this.linkTitle.trim()){
                var innerDom = this.range.extractContents();
                var link = document.createElement("a");
                link.setAttribute("href",this.linkAddr);
                link.innerHTML = this.linkTitle;
                link.append(innerDom);
                this.range.insertNode(link);
            }else{
                this.execCommand("CreateLink",this.linkAddr);
            }
            this.handleClose();
        }
    }
}
</script>

<style scoped>
    .link-enter-active,.link-leave-active {
        transition: all .2s;
    }
    .link-enter,.link-leave-to {
        transform: scale(0.2);
        opacity: 0;
    }
    .linkList {
        width: 350px;
        height: 160px;
        background: white;
        padding: 5px;
        box-shadow: 0px 0px 2px 2px rgb(189, 189, 189);
        position: relative;
        left: -150px;
        top: 10px;
    }
    .linkeAddr {
        /* border: none; */
        width: 100%;
        outline: none;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid lightgray;
        margin-top: 20px;
        font-size: 15px;
    }
    .footer{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: right;
    }
</style>
