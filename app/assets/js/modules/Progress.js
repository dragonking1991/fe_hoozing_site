export default class Progress{
  constructor(el) {
    let value_start = parseInt($('.progress-bar__start strong').html());
    let value_end = parseInt($('.progress-bar__finish strong').html());
    if (value_start < value_end) {
      let newVal = value_start*(100/value_end);
      $('.progress').css('width', newVal+'%');
    }
    $('.btn-support').on('click', function(){
      if (value_start < value_end) {
        value_start += 1;
        $('.progress-bar__start strong').html(value_start);
        progress.updateProgress();
      }
    });
  }
  updateProgress() {
    let value_start = parseInt($('.progress-bar__start strong').html());
    let value_end = parseInt($('.progress-bar__finish strong').html());
    if (value_start <= value_end) {
      let newVal = value_start*(100/value_end);
      $('.progress').css('width', newVal+'%');
    }
  }
}
