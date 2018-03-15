/**
 * 观察者
 */
class Watcher{
    constructor(vm,node){
        this.node = node;
    }
    update(newVal,oldVal){
        if(this.node.nodeType==3){
            this.node.nodeValue = this.node.nodeValue.replace(oldVal,newVal);
        }else{
            this.node.value = newVal;
        }
    }
}

export default Watcher;
export {Watcher};