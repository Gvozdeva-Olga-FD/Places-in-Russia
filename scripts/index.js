  import Card from "./Card.js";
  import FormValidator from "./FormValidator.js";
  import Popup from "./Popup.js";
  import Section from "./Section.js";
  //import UserInfo from "./UserInfo.js";
  //import PopupWithImage from "./PopupWithImage.js"

  const profileName = document.querySelector(".profile__name");
  const profileOccupation = document.querySelector(".profile__occupation");
  const buttonNameChange = document.querySelector(".profile__button-name-change");
  const buttonAddPlace = document.querySelector(".profile__button-add-place");
  const popupChangeName = document.querySelector('.popup_name-change');
  const popupAddPlace = document.querySelector('.popup_add-place');
  const formDetails = document.forms.persDetails;
  const popupName = formDetails.querySelector(".popup__content_type_name");
  const popupOccupation = formDetails.querySelector(".popup__content_type_occupation");
  const formAddPlace = document.forms.addPlace;
  const elements = document.querySelector('.elements');
  const popupFullPhoto = document.querySelector('.popup_full-img');
  const popupImage = document.querySelector('.popup__image');
  const popupFigcaption = document.querySelector('.popup__figcaption');

/*
  const personalDetails = {
    profileName: '.profile__name',
    profileOccupation: '.profile__occupation'
  }

  class Testing{
    constructor({data}){
      this._profileName = document.querySelector(data.profileName);
      this._profileOccupation = document.querySelector(data.profileOccupation);
    }

    testfunc(){
      const returnDetails = {
        name: this._profileName.textContent,
        occupation: this._profileOccupation.textContent
      }
      return returnDetails
    }
  }

  const testingClass = new Testing({data: personalDetails});

*/

  const initialCards = [
    {
      name: 'Кольский полуостров',
      link: 'images/kola-peninsula.jpg'
    },
    {
      name: 'Ладожское озеро',
      link: 'images/ladozhskoe-ozero.jpg'
    },
    {
      name: 'Плато-Путорана',
      link: 'images/plato-putorana.jpg'
    },
    {
      name: 'Рускеала',
      link: 'images/ruskeala.jpg'
    },
    {
      name: 'Соловецкие острова',
      link: 'images/solovky.jpg'
    },
    {
      name: 'Камчатка',
      link: 'images/kamchatka.jpg'
    }
  ]; 

  const selectors = {
    nameElement: '.element__name',
    photoElement: '.element__photo',
    likeElement: '.element__like',
    deleteElement: '.element__delete',
    element: '.element',
  }

  const validateSelectors = {
    formSelectors: '.popup__form',
    inputSelectors: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive', 
    errorInput: 'popup__input_error',
    errorClass: 'popup__message-error_active'
  }

  function handleCardClick(name, link){
    popupImage.src = link;
    popupFigcaption.textContent = name;
    popupImage.alt = popupFigcaption.textContent;
    createPopupFullImg.openPopup();
    //вписать сюда PopupWithImage, остальное удалить или куда
  }

  function createNewCard(item){
    const card = new Card(item, '#element-template', selectors, handleCardClick);
    const cardElement = card.generateCard();
    return cardElement
  }

const createCardStaticList = new Section({
  items: initialCards,
  renderer: (elem) => {
    createNewCard(elem);
    createCardStaticList.addItem(createNewCard(elem));
  }
}, elements);

createCardStaticList.renderItems();


  const formValidatorPlace = new FormValidator(validateSelectors, '.popup_add-place');
  formValidatorPlace.enableValidation();

  const formValidatorName = new FormValidator(validateSelectors, '.popup_name-change');
  formValidatorName.enableValidation();

  function handleFormSubmitPlace(evt) {

    evt.preventDefault();
  
    const placeName = this.popupPlaceName.value;
    const placeLink = this.popupPlaceLink.value;
  
    const title = {
      name: placeName,
      link: placeLink
    }
  
    if(!(isValidUrl(title.link))){
      title.link = 'images/not-photo.jpg'
    }
  
    elements.prepend(createNewCard(title));
  
    evt.target.reset();
  
    createPopupAddPlace.closePopup();    

  }    

const createPopupAddPlace = new Popup(popupAddPlace);
const createPopupProfileEdit = new Popup(popupChangeName);
const createPopupFullImg = new Popup(popupFullPhoto);

function openPopupAddPlace(){
  document.forms.addPlace.reset();
  formValidatorPlace.resetOpnForm();

  createPopupAddPlace.openPopup();

}

function openPopupProfileEdit (){
  popupName.value = profileName.textContent;
  popupOccupation.value = profileOccupation.textContent;

  createPopupProfileEdit.openPopup();
}

function isValidUrl(url) {
  const pattern = /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/.*)*$/;
  return pattern.test(url);
}

function handleFormSubmitDetails(evt) {
  evt.preventDefault(); 
  profileName.textContent = popupName.value;
  profileOccupation.textContent = popupOccupation.value;

  createPopupProfileEdit.closePopup();
}

formAddPlace.addEventListener("submit", handleFormSubmitPlace);
formDetails.addEventListener("submit", handleFormSubmitDetails);

buttonNameChange.addEventListener('click', openPopupProfileEdit);
buttonAddPlace.addEventListener('click', openPopupAddPlace);

