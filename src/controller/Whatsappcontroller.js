class WhatsAppController{

    constructor(){
        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }

    loadElements(){
        this.el = {};
        document.querySelectorAll('[id]').forEach(element =>{

            this.el[Format.getCamelCase(element.id)] = element;
        });
    }

    elementsPrototype(){
        Element.prototype.hide = function(){ 
            this.style.display = 'none';
            return this;
        };
        Element.prototype.show = function(){ 
            this.style.display = 'block';
            return this; 
        };
        Element.prototype.toggle = function(){ 
            this.style.display === 'none' ? 'block' : 'none'; 
            return this;
        };

        Element.prototype.on = function (events, fn){
            events.split(' ').forEach(event =>{
                this.addEventListener(event, fn);
            });
            return this;
        }

        Element.prototype.css = function (styles) {
            for(let name in styles){
                this.style[name] = styles[name];
            }
            return this;
        }

        Element.prototype.addClass = function (className) {
            this.classList.add(className);
            return this;
        }

        Element.prototype.removeClass = function (className) {
            this.classList.remove(className);
            return this;
        }

        Element.prototype.toggleClass = function (className) {
            this.classList.toggle(className);
            return this;
        }

        Element.prototype.hasClass = function (className) {
            return this.classList.contains(className);
        }

        HTMLFormElement.prototype.getForm = function(){
            return new FormData(this);
        };

        HTMLFormElement.prototype.toJSON = function(){
            let json = {};
            this.getForm().forEach((value, key) =>{
                json[key] = value;
            });
            return json;
        }
    }

    initEvents(){
        this.el.myPhoto.on('click', ()=>{
            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(()=>{
                this.el.panelEditProfile.addClass('open');
            }, 300);
        });
        
        this.el.btnClosePanelEditProfile.on('click', ()=>{
            this.el.panelEditProfile.removeClass('open');
        });
        
        this.el.btnNewContact.on('click', ()=>{
            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(()=>{
                this.el.panelAddContact.addClass('open');
            }, 300);
        });

        this.el.btnClosePanelAddContact.on('click', ()=>{
            this.el.panelAddContact.removeClass('open');
        })

        this.el.photoContainerEditProfile.on('click', ()=>{
            this.el.inputProfilePhoto.click();
        });

        this.el.inputNamePanelEditProfile.on('keypress', e=>{
            //Enter
            if(e.keyCode == 13){
                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }
        });

        this.el.btnSavePanelEditProfile.on('click', e=>{
            console.log(this.el.inputNamePanelEditProfile.innerHTML);
        });

        this.el.formPanelAddContact.on('submit', e=>{
            e.preventDefault();
            this.el.formPanelAddContact.getForm();
        });
    }

    closeAllLeftPanel(){
        this.el.panelEditProfile.hide();
        this.el.panelAddContact.hide();
    }
}