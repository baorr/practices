/**
 * 设置访问器属性
 */
import Observe from 'observe';
class DefineReactive{
    constructor(vm,data){
        this.init(vm,data);
    }
    init(vm,data){
        this.defineProps(vm,data);
    }
    defineProps(vm,data){
        Object.keys(data).forEach((key)=>{
            isObject(data[key])?this.defineProps(vm,data[key]):this.defineProp(data,key);
        });
    }
    defineProp(data,key){
        let value = data[key],
            observer = new Observe();
        Object.defineProperty(data,key,{
            get:()=>{
                //如果是劫持模板节点时发现需要订阅相关属性（通过Observe.tmp判断），则添加订阅；否则只是普通获取属性值
                if(Observe.tmp){
                    observer.addSub(Observe.tmp);
                    Observe.tmp = null;
                }
                console.log(`get:${key}->${value}`);
                return value;
            },
            set:(newVal)=>{
                if(newVal!=value){
                    observer.notify(newVal,value);
                    value = newVal;
                }
                console.log(`set:${key}->${value}`);
            }
        });
    }
}

function isObject(sth){
    return String.prototype.toString.apply(sth)=='[object Object]';
}

export default DefineReactive;
export {DefineReactive};