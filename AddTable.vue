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
    </div>
</template>
<script>
export default {
    data(){
        return {
            row: 0,
            column:0
        }
    },
    methods:{
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
            var rs = '';
            for(var i=0;i<this.row;i++){
                rs += `<tr style="height:40px;display:flex;flex-direction:row;" cellspacing=0>`
                for(var j=0;j<this.column;j++){
                    rs += `<td style="flex:1;line-height:40px">&nbsp;</td>`
                }
                rs += '</tr>'
            }
            table.innerHTML = rs;
            table.append(innerDom);
            this.range.insertNode(table);
            console.log(this.range);
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
        }
    }
}
</script>
<style scoped>
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
