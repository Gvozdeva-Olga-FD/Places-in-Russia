class Card{
    constructor(data){
      this._name = data.name;
      this._link = data.link;
    }

    _getTemplate() {
      const cardElement = document
        .querySelector('#element-template')
        .content
        .querySelector('.element')
        .cloneNode(true);
  
      return cardElement;
    }

    _setElementEventListener(){
      this._element.querySelector('.element__photo')
    }

    generateCard() {
      this._element = this._getTemplate();
      this._setElementEventListener();
      this._element.querySelector('.element__name').textContent = this._name;
      this._element.querySelector('.element__photo').src = this._link;
      this._element.querySelector('.element__photo').alt = this._name;
  
      return this._element;
    }
  }
  
  initialCards.forEach((item) => {
    const card = new Card(item);
    const cardElement = card.generateCard();
  
    document.querySelector('.elements').append(cardElement);
  });

