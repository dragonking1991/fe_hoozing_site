export default class searchGroup {
  constructor(el) {
    var keysearch = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: {
        url: 'assets/js/keysearch.json',
        filter: function(list) {
          return $.map(list, function(keysearch) {
            return { name: keysearch }; });
        }
      }
    });

    keysearch.initialize();

    $('input').tagsinput({
      typeaheadjs: {
        name: 'keysearch',
        displayKey: 'name',
        valueKey: 'name',
        source: keysearch.ttAdapter()
      }
    });

  }
}