/**
 * 观察者模式
 */
class Observe{
    constructor(){
        this.subs = [];
    }
    addSub(sub){
        this.subs.push(sub);
    }
    notify(newVal,oldVal){
        this.subs.forEach((sub)=>{
            sub.update(newVal,oldVal);
        });
    }
}
Observe.tmp = null;//作为全局变量，用于在defineReactive中判断是否添加订阅

export default Observe;
export {Observe};