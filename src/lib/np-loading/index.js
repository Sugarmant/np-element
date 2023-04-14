import template from './template.html'
import './style.css'
import Mask from '../np-mask'

/**
 * @mask        Boolean     是否显示遮罩
 * @opacity     Number      遮罩的透明度
 * @text        String      加载的字
 */
class npLoading{
    mask = true;
    opacity = .6;
    text = "加载中"
    
    constructor(){

    }
    show(data){
        if(data) for(const key in data) this[key] = data[key]
        if(this.mask) {
            this.maskNode = new Mask();
            this.maskNode.open({
                lock:true
            })
        }
        this._init();
        document.body.append(this.root)
    }
    hide(){
        this.mask && this.maskNode.close()
        this.root.setAttribute('disappear','true')
        setTimeout(()=>this.root.remove(),200)
    }
    _init(){
        if(this.root) this.root.remove()
        this.root = new DOMParser().parseFromString(template,'text/html').body.childNodes[0]
        const text = this.root.querySelector('.np-loading-text')
        text.innerText = this.text
        

    }
}

export default npLoading