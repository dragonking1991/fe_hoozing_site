export default class SortList {
  constructor(el) {
    $(el).jplist({
      itemsBox: '.list-box',
      itemPath: '.thumb-item',
      panelPath: '.jplist-panel',
      storage: 'localstorage',
      storageName: 'mixed-controls-local-storage',
      effect: 'fade',
      redrawCallback: function(collection, $dataview, statuses){

        console.log(statuses)
        // console.log($dataview)
        // console.log(statuses)
      }
    });
  }
}