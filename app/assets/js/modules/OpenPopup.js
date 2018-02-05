export default class OpenPopup{
  constructor(el) {

  };

  showPopup(popup) {
    $.magnificPopup.open({
      items: {
        src: popup,
        type: 'inline'
      }
    });
  };

  showAlert(title, content) {};

  showInvalidPhoto(error) {
  };

  showLoader() {
    $('.loader').show();
  };

  hideLoader() {
    $('.loader').fadeOut();
  };
}