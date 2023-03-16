import Popup from "./Popup.js";

class PopupWithImage extends Popup{

    openPopup(){
      super.openPopup();
      console.log('poshel nahuy');
    }
}

export default PopupWithImage