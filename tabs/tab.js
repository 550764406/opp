let that,index;
class Tabs {
    constructor(id){
        that = this
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.addBtn');
        this.ul = this.main.querySelector('.nav_tabs ul:first-child');
        this.fsection = this.main.querySelector('.tabs_sections');
        this.init();
    }
    //init
    init(){
        this.updateNode();
        this.add.onclick = this.addTab;
        //获取li的个数
        for(let i =0;i<this.lis.length;i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.lis[i].ondblclick = this.editTab;
            this.lis[i].childNodes[1].onclick = this.deleteTab;
        }
    }
    //更新数据
    updateNode(){
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.spans = this.main.querySelectorAll('span');
    }
    //清除所有的样式
    clearClass(){
        for(let i =0;i<this.lis.length;i++){
            this.lis[i].className = '';
            this.sections[i].className='';
        }
    }
    //切换
    toggleTab(){
        that.clearClass();
        this.className = 'navActive';
        that.sections[this.index].className = 'sectionActive';
    }
    //增加
    addTab(){
        let madom = Math.random();
        let tabNew = '<li class="navActive">新标签<span>×</span></li>';
        let sectionNew = '<section class="sectionActive">新增加内容 '+ madom +'</section>';
        that.ul.insertAdjacentHTML('beforeend', tabNew);
        that.fsection.insertAdjacentHTML('beforeend', sectionNew);
        that.clearClass();
        that.init();
    }
    //删除
    deleteTab(e){
        e.stopPropagation();
        index = this.parentNode.index;
        that.lis[index].remove();
        that.sections[index].remove();
        that.init(); //每次删除完成之后要获取最新的li和section的个数
        //如果有选中的样式，不作切换操作
        if(document.querySelector('.navActive'))return;
        index--;
        that.lis[index] && that.lis[index].click();
    }
    //编辑
    editTab(e){
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = "<input type='text' value='' size='6' />";

    }
}
new Tabs('#tab');