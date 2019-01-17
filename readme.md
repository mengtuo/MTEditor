# vue富文本编辑器

## 安装组件

```
npm install --save mteditor
```
## 注册组件
在main.js里配置
```
import MTEditor from 'MTEditor'
Vue.use(MTEditor);
```
## 使用方式

#### 第一种使用方式
```   
直接使用会显示所有富文本的所有功能
<mt-editor v-model="message"></mt-editor>
data: {
    message: ''
}

```
#### 第二种使用方式
可以根据需要,对富文本的功能进行配置
```
所有功能的配置信息
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

使用方式

<mt-editor v-model="message" :config="config"></mt-editor>
data: {
    message: '',
    config:[
        {"command":"bold","title":"加粗"},
        {"command":"italic","title":"斜体"},
        {"command":"underline","title":"下划线"},//可以同时传递命令和title
        {"title":"居左"}, //可以单独传递title
        {"command":"InsertUnorderedList"},//可以单独传递命令
        {"command":"table"}
    ] 
}

```

### Keywords

简单的vue富文本编辑器