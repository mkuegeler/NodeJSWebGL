// Create a row template for a record in a table
var records = [
      { ID: 1, Name: "0001.html", Description: 'Experiment 1', Category: 'basic' },
      { ID: 2, Name: "0002.html", Description: 'Experiment 2', Category: 'basic' },
      { ID: 3, Name: "0003.html", Description: 'Experiment 3', Category: 'basic' },
      { ID: 4, Name: "0004.html", Description: 'Experiment 4', Category: 'basic' },
      { ID: 5, Name: "0005.html", Description: 'Experiment 5', Category: 'basic' },
      { ID: 6, Name: "0006.html", Description: 'Experiment 6', Category: 'basic' },
      { ID: 7, Name: "0007.html", Description: 'Experiment 7', Category: 'basic' },
      { ID: 8, Name: "0008.html", Description: 'Experiment 8', Category: 'basic' },
    ]

var recordTable = new Vue({
  el: '#recordTable',
  data: {
    rows: records
  },
  computed: {
    "columns": function columns() {
      if (this.rows.length == 0) {
        return [];
      }
      return Object.keys(this.rows[0])
    }
  }
});
