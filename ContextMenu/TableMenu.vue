<template>
<ul id="menu" v-show="showMenu">
             <li @mouseover="showAddMenu=true"
                @mouseout="showAddMenu=false"
                >新增操作
                <i class="fa fa-chevron-right"></i>
                <transition name="slideout">
                 <ul v-show="showAddMenu" class="addOperator">
                    <li v-for="(item,key) in addMenus" :key="key" @click="addNewOne(key,$event)">{{item}}</li>
                 </ul>
                </transition>
             </li>
            
            <li @mouseover="showDeleteMenu=true" @mouseout="showDeleteMenu=false"
            >删除操作
                <i class="fa fa-chevron-right"></i>
                <transition name="slideout">
                <ul class="deleteOperator" v-show="showDeleteMenu">
                    <li v-for="(item,key) in deleteMenus" :key="key" @click="deleteOne(key,$event)">{{item}}</li>
                </ul>
                </transition>
            </li>
            <li  @mouseover="showTrStyle=true" @mouseout="showTrStyle=false">表格底纹
                <transition name="slideout">
                <ul class="trStyle" v-show="showTrStyle">
                    <li>表格隔行变色
                        <ul class="colorUL" id="colorUL">
                            <li @click.stop="setOddColor">奇数行颜色 
                                <i class="fa fa-square" :style="{color:oddColorObj.color}" @click.stop="showPiker('odd')"></i>
                            </li>
                            <li @click.stop="setEvenColor">偶数行颜色 
                                <i class="fa fa-square" :style="{color:evenColorObject.color}" @click.stop="showPiker('even')"></i></li>
                            <colorpicker v-if="showColorPicker" :colorObj="colorObj" @changeColor="changeColor"/>
                        </ul>
                    </li>
                </ul>
                </transition>
            </li>
        </ul>
</template>
<script>
import colorpicker from '../colorpicker'
export default {
    props: ['showMenu',"tapTd","tapTr","tapIndex"],
    components: {colorpicker},
    data(){
        return {
            addMenus: ['在前面添加一行','在后面添加一行','在前面添加一列','在后面添加一列'],
            deleteMenus: ['删除当前行','删除前一行','删除后一行','删除前一列','删除后一列','删除表格'],
            showTrStyle:false,
            showDeleteMenu:false,
            showAddMenu: false,
            showColorPicker:false,
            colorObj: {},
            oddColorObj: {color:'lightgray'},
            evenColorObject:{color:'lightcyan'}
        }
    },
    methods: {
        showPiker(type){
            this.showColorPicker = !this.showColorPicker;
            if(type==='odd' && this.showColorPicker===true){
                this.colorObj = this.oddColorObj;
            }
            if(type==='even' && this.showColorPicker===true){
                this.colorObj = this.evenColorObject;
            }
        },
        changeColor(){

        },
        addNewOne(index,event){
            var tapTr = this.tapTr;
            switch(index){
                case 0: 
                    var newTr = tapTr.cloneNode(true);
                    Array.from(newTr.children).forEach((item)=>{
                        item.innerHTML = "";
                    })
                    tapTr.parentElement.insertBefore(newTr,tapTr)
                    break;
                case 1:
                    var newTr = tapTr.cloneNode(true);
                    Array.from(newTr.children).forEach((item)=>{
                        item.innerHTML = "";
                    })
                    this.insertAfter(newTr,tapTr);
                    break;
                case 2: 
                    // 在前面添加一列
                    this.insertTd('before');
                    break;
                case 3:
                    this.insertTd('after');
                    break;
            }
        },
        insertAfter(newEl, targetEl)
        {
            var parentEl = targetEl.parentNode;
            if(parentEl.lastChild == targetEl)
            {
                parentEl.appendChild(newEl);
            }else
            {
                parentEl.insertBefore(newEl,targetEl.nextSibling);
            }            
        },
        insertTd(direction){
            if(this.tapTr.parentElement.tagName=="TABLE"){
                var table = this.tapTr.parentElement;
                Array.from(table.children).forEach((item)=>{
                    var newTd = document.createElement("td");
                    var children = Array.from(item.children);
                    for(var i=0;i<children.length;i++){
                        if(this.tapIndex==i){
                            var oldEle = children[i];
                            if(direction==="before"){
                                item.insertBefore(newTd,oldEle);
                            }else{
                                this.insertAfter(newTd,oldEle)
                            }
                            break;
                        }

                    }
                })
            }
        },
        // 删除操作
        deleteOne(index,event){
            switch(index){
                case 0:
                    this.tapTr.parentElement.removeChild(this.tapTr);
                    break;
                case 1: 
                    if(this.tapTr.previousElementSibling){
                        this.tapTr.parentElement.removeChild(this.tapTr.previousElementSibling);
                    }
                    break;
                case 2:
                    if(this.tapTr.nextElementSibling){
                        this.tapTr.parentElement.removeChild(this.tapTr.nextElementSibling);
                    } 
                    break;
                case 3:
                    this.operator("before",'deleteColumn');
                    break;
                case 4:
                    this.operator("after",'deleteColumn'); 
                    break;
                case 5: 
                    var table = this.tapTr.parentElement;
                    table.parentElement.removeChild(table);
                    break;
            }
        },
        operator(direction,type){
            if(this.tapTr.parentElement.tagName=="TABLE"){
                var table = this.tapTr.parentElement;
                    Array.from(table.children).forEach((item)=>{
                    var children = Array.from(item.children);
                    for(var i=0;i<children.length;i++){
                        if(type=="deleteColumn"){
                            if(direction=="before"){
                                if(i==this.tapIndex-1){
                                    console.log(children[i]);
                                    item.removeChild(children[i]);
                                    break;
                                }
                            }else{
                                if(i==this.tapIndex+1){
                                    item.removeChild(children[i]);
                                    break;
                                }
                            }
                        }
                    }
                })
            }
        },
        //设置奇数行颜色
        setOddColor(){
            var currentTableChilren = Array.from(this.tapTr.parentElement.children);
            for(var i=0;i<currentTableChilren.length;i++){
                if(i%2==0){
                    var item = currentTableChilren[i];
                    item.style.backgroundColor=this.oddColorObj.color;
                }
            }
        },
        //设置偶数行颜色
        setEvenColor(){
            var currentTableChilren = Array.from(this.tapTr.parentElement.children);
            for(var i=0;i<currentTableChilren.length;i++){
                if(i%2==1){
                    var item = currentTableChilren[i];
                    item.style.backgroundColor=this.evenColorObject.color;
                }
            }
        }
    },
    watch: {
       oddColorObj: {
           //该方法名要保持一致
           handler(newValue, oldValue) {
    　　　　　　console.log("奇数行的样色"+newValue.color)
              this.setOddColor()
    　　　　},
    　　　　deep: true //一定要填写
       },
       evenColorObject: {
           handler(newValue, oldValue) {
    　　　　　　 console.log("偶数行的样色"+newValue.color)
               this.setEvenColor();
    　　　　},
    　　　　deep: true
       }
    }
}
</script>
<style scoped>
ul {
    list-style:none;
}
    #menu {
        list-style: none;
        margin: 0;
        background: rgb(250, 250, 250);
        font-size: 12px;
        border: 1px solid lightgray;
        display: none;
    }
    #menu li {
        height: 30px;
        line-height: 30px;
        width: 100px;
        text-align: center;
    }
    #menu li:hover{
        background: lightcyan ;
    }
    .deleteOperator,.addOperator,.trStyle,.colorUL {
        margin-left: 100px;
        margin-top: -30px;
        border: 1px solid lightgray;
        width: 100px;
        background: white;
    }
    .colorUL{
        width: 200px;
    }
    #colorUL li {
        width: 200px;
    }
    .slideout-enter-active,.slideout-leave-active {
        transition: all .5s;
    }
    .slideout-enter,.slideout-leave-to {
        transform: translateX(-50px);
        opacity: 0;
    }
    .oddColor {
        color: lightgray;
    }
    .evenColor {
        color: lightcyan;
    }
</style>
