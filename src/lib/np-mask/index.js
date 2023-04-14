import './style.css'
/**
 * @onClose     Function    点击遮罩后的回调
 * @opacity     Number      透明度
 * @lock        Boolean     遮罩是否点击可关闭
 */
class Mask{
    onClose;
    opacity = .6;
    lock = false
    
    constructor(){
        
    }
    mask_init(){
        if(this.maskNode) this.maskNode.remove()
        this.maskNode = document.createElement('div')
        this.maskNode.className = 'np-mask'
        this.maskNode.style.background = `rgba(0,0,0,${this.opacity})`
        if(!this.lock){
            this.maskNode.addEventListener("click",e=>{
                this.close()
                this.onClose && this.onClose()
            })
        }
    }
    open(data){
        if(data) for(const key in data) this[key] = data[key]
        this.mask_init()
        document.body.append(this.maskNode)
    }
    close(){
        this.maskNode.setAttribute('disappear','true')
        setTimeout(()=>this.maskNode.remove(),200)   
    }
}

export default Mask