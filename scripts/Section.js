class Section{
    constructor({items, renderer}, containerSelector){
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

  
}