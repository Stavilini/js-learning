const DomElement = function(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
};

DomElement.prototype.newElement = function() {
    let div;

    if (this.selector[0] === '.') {
        div = document.createElement('div');
        div.className = this.selector.slice(1);
    } else {
        div = document.createElement('p');
        div.id = this.selector.slice(1);
    }


    div.style.height = this.height + 'px';
    div.style.width = this.width + 'px';
    div.style.background = this.bg;
    div.style.fontSize = this.fontSize + 'px';
    document.body.appendChild(div);


    let newText = prompt('insert text');
    let anotherText = document.createTextNode(newText);
    div.appendChild(anotherText);

};

let DomElement1 = new DomElement('.block', 100, 200, 'gray', 38);
let DomElement22 = new DomElement('#divv', 100, 100, 'orange', 50);

DomElement1.newElement();
DomElement22.newElement();