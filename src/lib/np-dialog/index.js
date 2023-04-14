import template from './template.html'
import './style.css'
import Mask from '../np-mask'

/**
 * @onClose     Function    关闭的回调
 * @onConfirm   Function    确认的回调
 * @onCancel    Function    取消的回调
 * @mask        Boolean     是否显示遮罩
 * @content     String      正文内容
 * @opacity     Number      遮罩的透明度
 * @confirmText String      确认文字
 * @confirm     Boolean     是否显示确认
 * @cancel      Boolean     是否显示取消
 */
class npDialog{
    onClose;
    onConfirm;
    onCancel;
    mask = true;
    content = '正文内容';
    opacity = .6;
    confirmText = '确认';
    cancelText = '取消'
    confirm = true
    cancel = true
    
    constructor(){

    }
    open(data){
        if(data) for(const key in data) this[key] = data[key]
        if(this.mask) {
            this.maskNode = new Mask();
            this.maskNode.open({
                onClose:()=>{
                    this.close()
                    this.onClose && this.onClose()
                },
                opacity:this.opacity
            })
        }
        this._init();
        document.body.append(this.root)
    }
    close(){
        this.mask && this.maskNode.close()
        this.root.setAttribute('disappear','true')
        setTimeout(()=>this.root.remove(),200)
    }
    _init(){
        if(this.root) this.root.remove()
        this.root = new DOMParser().parseFromString(template,'text/html').body.childNodes[0]
        const title = this.root.querySelector('.np-dialog-title')
        const content = this.root.querySelector('.np-dialog-content')
        const closeBtn = this.root.querySelector('.np-dialog-closeBtn')
        const cancelBtn = this.root.querySelector(".np-dialog-handle-cancelBtn")
        const confirmBtn = this.root.querySelector(".np-dialog-handle-confirmBtn")

        if(this.html){
            content.innerHTML = this.html
        }else{
            content.innerText = this.content
        }

        if(this.confirmText) confirmBtn.innerText = this.confirmText
        if(this.cancelText) cancelBtn.innerText = this.cancelText
        
        closeBtn.onclick = e=>{
            this.close()
            this.onClose && this.onClose()
        }
        cancelBtn.onclick = e=>{
            this.close()
            this.onCancel && this.onCancel()
        }
        confirmBtn.onclick = e=>{
            this.close()
            this.onConfirm && this.onConfirm()
        }
        if(!this.confirm) confirmBtn.remove()
        if(!this.cancel) cancelBtn.remove()

    }
}

export default npDialog