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
<mt-editor v-model="message"></mt-editor>

data: {
    message: ''
}
```