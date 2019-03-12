<template>
    <div id="AddCode">
        <i class="fa fa-code"  
        onmousedown="event.preventDefault();" 
        title="插入链接"
        @click.stop="show=!show,test()"
        ></i>
         <transition name="addCode" >
             <div v-show="show" class="addCode" @click.stop>
                 <div class="addCodeHeader">
                      <span style="color:black">插入代码</span>
                      <span @click="handleClose">&times;</span>
                 </div>
                 <div class="languageType">
                     <span>语言</span>&nbsp;
                     <select v-model="language">
                         <option v-for="(item,key) in languages" :key="key" :value="item">
                             {{item}}
                         </option>
                     </select>
                 </div>
                 <div class="codePanel">
                     <textarea name="" id="" cols="30" rows="10" v-model="code">

                     </textarea>
                 </div>
                 <div class="addCodeFoot">
                     <button class="btn primary" @click="insertCode">确定</button>
                 </div>
             </div>
         </transition>
    </div>
</template>

<script>
// {"commad":"code","class":"fa fa-code","title":"代码"},
import hljs from 'highlight.js'

export default {
    props:['range'],
    data(){
        return {
            show:false,
            languages:[
                "Apache",
                "Bash", 
                "C#",
                "C++",  
                "CSS",
                "CoffeeScript",
                "Diff",
                "HTML", 
                "XML",
                "HTTP",
                "Ini", 
                "TOML", 
                "JSON",
                "Java",
                "JavaScript",
                "Makefile",
                "Markdown",
                "Nginx",
                "Objective-C",
                "PHP",
                "Perl",
                "Properties",
                "Python",
                "Ruby",
                "SQL",
                "Shell",
                "Session"
            ],
            language:'Java',
            code:''
        }
    },
    methods:{
        handleClose(){
            this.show=false;
             this.code = '';
        },
        test(){
            console.log("点击");
        },
        insertCode(){
            var code = this.code.replace(/\</g,'&lt;').replace(/\>/g,'&gt;');
             /**
              * 创建一个code标签
              */
            var innerDom = this.range.extractContents();
            var preDom = document.createElement("pre");
            var codeDom = document.createElement("code");
            codeDom.className = this.language;
            codeDom.innerHTML = code;
            preDom.appendChild(codeDom);
            preDom.append(innerDom);
            this.range.insertNode(preDom);
            console.log(this.$parent.code);
            this.$parent.code += preDom.innerHTML;
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });
            this.handleClose();
            
        }
    }
}
</script>

<style scoped>
 .addCode-enter-active,.addCode-leave-active {
        transition: all .2s;
    }
    .addCode-enter,.addCode-leave-to {
        transform: scale(0.2);
        opacity: 0;
    }
     .addCode {
        width: 500px;
        height: 300px;
        background: white;
        padding: 5px;
        box-shadow: 0px 0px 2px 2px rgb(189, 189, 189);
        position: relative;
        top: 10px;
    }
    .addCodeHeader {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        padding: 5px;
        box-sizing: border-box;
        border-bottom: 1px solid lightgray;
        font-weight: 900;
    }
    .languageType{
        width: 100%;
        height: 40px;
        text-align: left;
        margin:5px;
    }
    .languageType>select{
        outline: none;
    }
    .codePanel{
        width: 100%;
        height: 160px;
    }
    .codePanel>textarea{
        width: 100%;
        height: 100%;
        outline: none;
        padding: 5px;
        box-sizing: border-box;
        resize: none;
    }
    .addCodeFoot{
        width: 100%;
        height: 45px;
        margin-top: 5px;
        text-align: right;
    }
    /* .addCodeFoot>button{
        width: 70px;
        height: 40px;
        border: 1px solid lightgray;
        border-radius: 5px;
        outline: none;
    } */
</style>
