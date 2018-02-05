export default class ShowNumber{
  constructor(el) {
    let number = $(el).attr('data-gallery').split('');
    $(el).empty();
    for (var i = 0; i < number.length; i++) {
      let html = '<span class="icon-inline icon-' + number[i] + '"></span>';
      $(el).append(html);
    }
  }
}
