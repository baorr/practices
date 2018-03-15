import Compile from 'compile';
import Observe from 'observe';
import DefineReactive from 'defineReactive';

class Mvvm{
    constructor(opt){
        this.el = opt.el||'';
        this.data = opt.data||{};
        this.rootNode = document.getElementById(this.el);
        this.rootNode && this.init();
    }
    init(){
        new DefineReactive(this,this.data);
        let df = new Compile(this,this.rootNode);
        this.rootNode.appendChild(df);
    }
}

export default Mvvm;
