<template>
    <div id="addTable">
         <i class="fa fa-table" 
            onmousedown="event.preventDefault();" 
            title="插入表格"
            @click="show=!show"    
        >
        </i>
        <div v-show="show"  @click.stop class="newTable">
            <div class="typeIn">
                行:<input type="text" style="width:30px" v-model="row">
                列: <input type="text" style="width:30px" v-model="column">
                <button class="btn primary" style="width:40px;height:20px;margin-left:10px" @click="insertTable">确定</button>
            </div>
            <div class="tableList">
                <table>
                    <tr v-for="(row,key) in 10" :key="key">
                        <td v-for="(column,index) in  10" :key="index" 
                            @mouseover="selectTd(row,column,$event)"
                            @click="insertTable"
                            ref="mytd"
                        ></td>
                    </tr>
                </table>
            </div>
        </div>
         <ul id="menu" v-show="showMenu">
             <li @click="backupRange(),insertTable()">快速插入表格</li>
             <li @mouseover="showAddMenu=true"
                @mouseout="showAddMenu=false"
                >
                    新增操作
                    <i class="fa fa-chevron-right"></i>
                <transition name="slideout">
                 <ul v-show="showAddMenu" class="addOperator">
                    <li @click="addNewOne(0,$event)">在前面添加一行</li>
                    <li @click="addNewOne(1,$event)">在后面添加一行</li>
                    <li @click="addNewOne(2,$event)">在前面添加一列</li>
                    <li @click="addNewOne(3,$event)">在后面添加一列</li>
                 </ul>
                </transition>
             </li>
            
            <li @mouseover="showDeleteMenu=true"
                @mouseout="showDeleteMenu=false"
            >删除操作
                <i class="fa fa-chevron-right"></i>
                <transition name="slideout">
                <ul class="deleteOperator" v-show="showDeleteMenu">
                    <li @click="deleteOne(0,$event)">删除当前行</li>
                    <li @click="deleteOne(1,$event)">删除前一行</li>
                    <li @click="deleteOne(2,$event)">删除后一行</li>
                    <li @click="deleteOne(3,$event)">删除前一列</li>
                    <li @click="deleteOne(4,$event)">删除后一列</li>
                </ul>
                </transition>
            </li>
            
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            row: 5,
            column:5,
            showMenu: false,
            tapTd: {},//右键选中元素的
            tapIndex: 0,//选中的元素的下标
            tapTr: {},
            rowIndex: 0,
            showDeleteMenu:false,
            showAddMenu: false,
        }
    },
    methods:{
        // 清空所有选中的颜色
        resetAll(){
            var mytd = this.$refs.mytd;
            mytd.forEach((item)=>{
                item.style.background = "white";
            });
            this.handleClose();
        },
        insertTable(){
            var innerDom = this.range.extractContents();
            var table = document.createElement("table");
            table.className = "insertTable"
            table.setAttribute("cellspacing",0);
            table.setAttribute("border",0);
            table.onmousedown = (e)=>{
                this.tapTr = e.target.parentElement;
                 switch(e.button){
                    case 2: 
                        this.showMenu = true;
                        this.tapTd = e.target;
                        this.tapTr = e.target.parentElement;
                        this.tapIndex = Array.from(this.tapTr.children).indexOf(e.target);
                        break;
                }
            }
            var rs = '';
            for(let i=0;i<this.row;i++){
                var tr = document.createElement("tr");
                for(let j=0;j<this.column;j++){
                    var td = document.createElement("td");
                    td.style.cssText = `flex:1;line-height:40px`;
                    td.innerHTML = "&nbsp;"
                    tr.appendChild(td);
                }
                table.appendChild(tr);

            }
            table.append(innerDom);
            this.range.insertNode(table);
            this.adjustList('.insertTable');
            this.resetAll();
        },
        comfirmSelected(row,column,event){
            this.selectTd(row,column,event);
        },
        selectTd(row,column,event){
            var target = event.target;
            target.style.background="lightcyan";
            if(target.parentElement.nextElementSibling){
               this.nextElement(target.parentElement);
            }
            if(target.parentElement){
                this.preElement(target.parentElement,column)
            }
            this.row = row;
            this.column = column;
        },
        preElement(ele,i){
            var children = Array.from(ele.children);
            children.slice(0,i).forEach((item)=>{
                item.style.background = "lightcyan";
            })
            children.slice(i,children.length).forEach((item)=>{
                item.style.background = "white";
            })
            if(!ele.previousElementSibling){
                return;
            }else{
                this.preElement(ele.previousElementSibling,i);
            }
        },
        nextElement(ele){
            var children = Array.from(ele.children);
            children.slice(0,children.length).forEach((item)=>{
                item.style.background = "white";
            })
            if(!ele.nextElementSibling){
                return;
            }else{
                this.nextElement(ele.nextElementSibling);
            }
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
        }
    },
    mounted(){
        var contextmenu=document.getElementById('menu');
        document.oncontextmenu = function(ev){
            var oEvent=ev||event;
            //一定要加px，要不然chrom不认
            contextmenu.style.position = "absolute";
            contextmenu.style.top=oEvent.clientY+10+'px';
            contextmenu.style.left=oEvent.clientX+'px';
            contextmenu.style.display='block';
            return false;
        }
        document.onclick = function(){
            contextmenu.style.display = 'none';
        }
    }
}
</script>
<style scoped>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .newTable{
        position: relative;
        width: 200px;
        height: 250px;
        top: 10px;
        box-shadow: 0px 0px 2px 2px lightgray;
        background: white;
    }
    .typeIn{
        width: 100%;
        height: 30px;
    }
    .tableList{
        width: 100%;
        height: 170px;
    }
    .tableList table{
        width: 100%;
        height: 100%;
    }
    .tableList table tr td {
        border: 1px solid lightblue;
    }
    #menu {
        list-style: none;
        margin: 0;
        background: rgb(250, 250, 250);
        font-size: 12px;
        border: 1px solid lightgray;
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
    .deleteOperator,.addOperator {
        margin-left: 100px;
        margin-top: -30px;
        border: 1px solid lightgray;
        width: 100px;
        background: white;
    }
    .slideout-enter-active,.slideout-leave-active {
        transition: all .5s;
    }
    .slideout-enter,.slideout-leave-to {
        transform: translateX(-50px);
        opacity: 0;
    }
</style>
