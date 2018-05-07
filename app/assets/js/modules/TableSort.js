import 'bootstrap-table/dist/bootstrap-table.min.css';
import bootstrapTable from 'bootstrap-table';

export default class TableSort {
	constructor(el) {
		$(el).bootstrapTable();
	}
}