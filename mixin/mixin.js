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

        }
    },
    watch: {
        show(value){
            if(value){
                console.log("备份");
                this.backupRange();
            }
        }
    }
})