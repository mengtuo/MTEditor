## vue rich text editor
    vue富文本编辑器

## install plugin

```
npm install --save mteditor
```
## register plugin
register plugin in main.js
```
import MTEditor from 'MTEditor'
Vue.use(MTEditor);
```
## useage
```   
1. first useage
This will show all the features,default
<mt-editor v-model="message"></mt-editor>
data: {
    message: ''
}

```

```
2. second usesage
This will configure the corresponding function according to your needs.
All configurations
[
    {"command":"bold","title":"加粗"},
    {"command":"italic","title":"斜体"},
    {"command":"underline","title":"下划线"},
    {"command":"strikethrough","title":"删除线"},
    {"command":"justifyLeft","title":"居左"},
    {"command":"justifyCenter","title":"居中"},
    {"command":"justifyRight","title":"居右"},
    {"command":"justifyFull","title":"两侧"},
    {"command":"InsertUnorderedList","title":"无序列表"},
    {"command":"insertOrderedList","title":"有序列表"},
    {"command":"superscript","title":"上标"},
    {"command":"subscript","title":"下标"},
    {"command":"code","title":"代码"},
    {"command":"removeFormat","title":"擦除"},
    {"command":"undo","title":"撤销"},
    {"command":"redo","title":"重做"},
    {"command":"image","title:'图片'},
    {"command":"table",title:'表格'},
    {"command":"link",title:'链接'}
]

useage

<mt-editor v-model="message" :config="config"></mt-editor>
data: {
    message: '',
    config:[
        {"command":"bold","title":"加粗"},
        {"command":"italic","title":"斜体"},
        {"command":"underline","title":"下划线"},
        {"title":"居左"},
        {"command":"InsertUnorderedList"},
        {"command":"table"}
    ] 
}

```