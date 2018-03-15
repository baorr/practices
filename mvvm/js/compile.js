/**
 * 劫持节点到documentFragment中
 * 并绑定相关事件，填充相关数据
 */
import Observe from 'observe';
import Watcher from 'watcher';
class Compile{
    constructor(vm,node){
        return this.compile(vm,node);
    }
    compile(vm,node){
        let df = document.createDocumentFragment(),
            child;
        while(child = node.firstChild){
            switch(child.nodeType){
                case 1:this.cpNode(vm,child);break;
                case 3:this.cpText(vm,child);break;
            }
            
            df.appendChild(child);
        }
        return df;
    }
    cpNode(vm,node){
        let attrs = node.attributes;
        Array.from(attrs).forEach((attr)=>{
            if(!/^v-.+/){
                // 不是指令属性，直接返回
                return;
            }
            if(/^v-modal$/.test(attr.nodeName)){
                node.addEventListener('input',(e)=>{
                    vm.data[attr.nodeValue] = e.target.value;
                });
                //此处input添加订阅后，会在input输入后，又重新赋值一遍，可优化
                if(node.tagName.toLowerCase()=='input'){
                    Observe.tmp = new Watcher(vm,node);
                    node.value = vm.data[attr.nodeValue];
                }
            }
            node.removeAttributeNode(attr);
        });
    }
    cpText(vm,node){
        let reg = /\{(.+)\}/g,
            nodeValue = node.nodeValue;
        if(reg.test(nodeValue)){
            node.nodeValue = nodeValue.replace(reg,(all,$1)=>{
                Observe.tmp = new Watcher(vm,node);
                return vm.data[$1];//填值，主要是触发get方法，添加订阅（在闭包中）
            });
        }
    }
}

export default Compile;
export {Compile};