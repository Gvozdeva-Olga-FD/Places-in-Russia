import Popup from "./Popup.js";

class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit, validationRules){
        super(popupSelector);
        this._submitButton = this._popupSelector.querySelector('.popup__submit')
        this._handleFormSubmit = handleFormSubmit;
        this._validationRules = validationRules;
        this._form = document.forms.addPlace;
      }

      _getInputValues(){

      }

      setEventListeners(){
        super.setEventListeners();
        
        this._submitButton.addEventListener('click', () => this._handleFormSubmit);
      }

      closePopup() {
        super.closePopup();
        this._form.reset();
        this._validationRules.resetOpnForm();

      }
}

export default PopupWithForm