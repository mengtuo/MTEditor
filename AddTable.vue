<template>
    <div id="addTable">
         <i class="fa fa-table" 
            onmousedown="event.preventDefault();" 
            title="插入表格"
            @click.stop="show=!show,richEditBlur()"    
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
    </div>
</template>
<script>
export default {
    props: ['range'],
    data(){
        return {
            row: 5,
            column:5,
            isTable: false
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
            table.appendChild(innerDom);
            this.range.insertNode(table);
            // this.adjustList('.insertTable');
            this.resetAll();
            table.parentElement.onmousedown = (e)=>{
                switch(e.button){
                    case 2: 
                        this.isTable = false;
                        break;
                }
            }

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
    },

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
   
</style>
