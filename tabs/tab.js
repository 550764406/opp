let that;
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
        for(let i =0;i<this.lis.length;i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
        }
    }
    //更新数据
    updateNode(){
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
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
        let tabNew = '<li class="navActive">新标签</li>';
        let sectionNew = '<section class="sectionActive">新增加内容 '+ madom +'</section>';
        that.ul.insertAdjacentHTML('beforeend', tabNew);
        that.fsection.insertAdjacentHTML('beforeend', sectionNew);
        that.clearClass();
        that.init();
    }
    //编辑
}

new Tabs('#tab');