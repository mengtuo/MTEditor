import MTEditor from './MTEditor';
import './mixin/mixin'
import 'highlight.js/styles/github.css';

MTEditor.install = function(Vue){
    Vue.component(MTEditor.name,MTEditor)
}
export default MTEditor;