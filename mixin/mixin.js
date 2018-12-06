import Vue from 'vue';
Vue.mixin({
    data(){
        return {
            show: false,
            currentSelection:{},
            range: {}
        }
    },
    methods: {
        execCommand:(command,value) => {
		    value? document.execCommand(command, false, value):document.execCommand(command, false, null)
        },
        handleClose(event){
            this.show = false;
        },
         // 保留光标所在位置
         backupRange() {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            this.range = selection.getRangeAt(0);
            console.log(range);
            this.currentSelection = {
                "startContainer": range.startContainer,
                "startOffset": range.startOffset,
                "endContainer": range.endContainer,
                "endOffset": range.endOffset
            }
        },
        restoreRange() {
            if (this.currentSelection) {

                let selection = window.getSelection();
                console.log(selection);
                selection.removeAllRanges();

                let range = document.createRange();

                range.setStart(this.currentSelection.startContainer, this.currentSelection.startOffset);

                range.setEnd(this.currentSelection.endContainer, this.currentSelection.endOffset);

                // 向选区中添加一个区域

                selection.addRange(range);  
            }

        },
         adjustList(typeName) {
            let lists = document.querySelectorAll(typeName);
            console.log(lists);
            for (let i = 0; i < lists.length; i++) {
                let ele = lists[i]; // ol
                let parentNode = ele.parentNode;
                if (parentNode.tagName === 'P' && parentNode.firstChild.tagName==="TABLE") {
                    console.log("table会进来的");
                    parentNode.insertAdjacentElement('beforebegin', ele);
                    // parentNode.remove()
                    this.removeNode(parentNode);
                }
            }    
        },
        test(){
            this.show = false;
        },
        //根据浏览器的不同添加不同的移除方法
        removeNode(obj){
        　　if(this.isIE()||this.isIE11()){
            　　　　obj.removeNode(true);
        　　}else{
            　　　 obj.remove();
            }
        },
        isIE(){
        　　if(!!window.ActiveXObject || "ActiveXObject" in window){
        　　　　return true;
        　　}else{
        　　　　return false;
        　　}
        } ,
        isIE11(){
        　　if((/Trident\/7\./).test(navigator.userAgent)){
            　　　　return true;
            　　}else{
            　　　　return false;
            　　}
            }   
    },
    watch: {
        show(value){
            if(value){
                document.addEventListener("click",this.test)
                this.backupRange();
            }else{
                document.removeEventListener('click',this.test)
            }
        }
    },
    created(){
        // this.backupRange();
    }
})