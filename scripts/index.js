  const profileName = document.querySelector(".profile__name");
  const profileOccupation = document.querySelector(".profile__occupation");
  const buttonNameChange = document.querySelector(".profile__button-name-change");
  const buttonAddPlace = document.querySelector(".profile__button-add-place");
  const popupChangeName = document.querySelector('.popup_name-change');
  const popupAddPlace = document.querySelector('.popup_add-place');
  const formDetails = document.forms.persDetails;
  const popupName = formDetails.querySelector(".popup__content_type_name");
  const popupOccupation = formDetails.querySelector(".popup__content_type_occupation");
  const forms = document.querySelectorAll('.popup__form');
  const popupContainer = document.querySelector('.popup__container');
  const formAddPlace = document.forms.addPlace;
  const popupNamePlace = formAddPlace.querySelector(".popup__content_type_name-place");
  const popupLink = formAddPlace.querySelector('.popup__content_type_link');
  const popupFullPhoto = document.querySelector('.popup_full-img');
  const closeButtons = document.querySelectorAll('.popup__close');
  const submitPopup = document.querySelector('.popup__submit');
  const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
  const elements = document.querySelector('.elements');
  const popups = document.querySelectorAll('.popup');
  const popupImage = document.querySelector('.popup__image');
  const popupFigcaption = document.querySelector('.popup__figcaption');


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
    popupFullPhoto: '.popup_full-img'
  }


  class Card{
    constructor(data, selectors){
      this._name = data.name;
      this._link = data.link;
      this._selectors = selectors;
    }

    _getTemplate() {
      const cardElement = document
        .querySelector('#element-template')
        .content
        .querySelector('.element')
        .cloneNode(true);
  
      return cardElement;
    }

    _addLike(){
      this.classList.toggle('element__like_active');
    }
    _deleteElement(evt){
      evt.target.closest('.element').remove();
    }

    _openPopupFullImg(evt){
      openPopup(popupFullPhoto);
      popupImage.src = evt.target.src;
      popupFigcaption.textContent = evt.target.getAttribute('alt');
      popupImage.alt = popupFigcaption.textContent;
    }

    generateCard() {
      this._element = this._getTemplate();
      const deleteElement = this._element.querySelector(this._selectors.deleteElement);
      const cardLike = this._element.querySelector(this._selectors.likeElement);
      const photoElement = this._element.querySelector(this._selectors.photoElement);
      const nameElement = this._element.querySelector(this._selectors.nameElement);

      nameElement.textContent = this._name;
      photoElement.src = this._link;
      photoElement.alt = this._name;

      cardLike.addEventListener('click', this._addLike);
      deleteElement.addEventListener('click', this._deleteElement);
      photoElement.addEventListener('click', this._openPopupFullImg);
  
      return this._element;
    }

  }
  
  initialCards.forEach((item) => {
    const card = new Card(item, selectors);
    const cardElement = card.generateCard();
  
    // Добавляем в DOM
    document.querySelector('.elements').append(cardElement);
  });

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
  
    const card = new Card(title, selectors);
    const cardElement = card.generateCard();
  
    elements.prepend(cardElement);
  
    evt.target.reset();
  
    const submitPopup = evt.target.closest('.popup');
    
    closePopup(submitPopup);

  }    

// функция открытия попапа

function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

//функция удаления попапа 

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

// функция открытия попапа добавление карточки

function openPopupAddPlace(){
  openPopup(popupAddPlace);
}

// функция открытия попапа изменение данных профиля

function openPopupProfileEdit (){
  openPopup(popupChangeName);
  popupName.value = profileName.textContent;
  popupOccupation.value = profileOccupation.textContent;
}

//функция закрытия попапа по кнопке esc

function closePopupEsc(evt){
  if(evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  } 
}

//проверка введенного url

function isValidUrl(url) {
  const pattern = /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/.*)*$/;
  return pattern.test(url);
}

//функция сабмит для попапа редактирования данных профиля

function handleFormSubmitDetails(evt) {
  evt.preventDefault(); 
  profileName.textContent = popupName.value;
  profileOccupation.textContent = popupOccupation.value;

  const submitPopup = evt.target.closest('.popup');
  closePopup(submitPopup);
}

//слушатели на кнопки сабмит попапов с формами

formAddPlace.addEventListener("submit", handleFormSubmitPlace);
formDetails.addEventListener("submit", handleFormSubmitDetails);

//Слушатели клика на кнопки открывающие формы

buttonNameChange.addEventListener('click', openPopupProfileEdit);
buttonAddPlace.addEventListener('click', openPopupAddPlace);

//слушатели на закрытие попапа

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//слушатели закрытия попапа кликом на оверлей

popups.forEach((elem) => {
  elem.addEventListener('click', (evt) => {
    if(elem === evt.target){
      closePopup(elem);
    }
  })
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive', 
  errorInput: 'popup__input_error',
  errorClass: 'popup__message-error_active'
})

