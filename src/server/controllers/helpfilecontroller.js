module.exports = {
  getHelpfiles: function(client, callback) {
    const queryString = `select category, json_agg( json_build_object('name', name, 'bucket', bucket, 'contents', contents)) as entries from helpfiles group by category order by category asc`;
    client.query(queryString, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data.rows)
      }
    })
  },

  search: function(client, input="", callback) {
    let  searchString = input.replace(/\W/g, '').toLowerCase();
    const queryString = `select category, json_agg( json_build_object('name', name, 'bucket', bucket, 'contents', contents)) as entries from helpfiles where lower(contents) like '%%${searchString}%%' group by category`;
    client.query(queryString, (err, data) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, data.rows)
      }
    })
  },

  getBuckets: function(client, callback) {
    const queryString = `select distinct bucket, true as selected from helpfiles`
    client.query(queryString, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data.rows)
      }
    })
  }
}
