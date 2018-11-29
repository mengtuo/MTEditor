import MTEditor from './MTEditor';
import './mixin/mixin'
MTEditor.install = function(Vue){
    Vue.component(MTEditor.name,MTEditor)
}
export default MTEditor;