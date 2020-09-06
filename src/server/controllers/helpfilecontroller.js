module.exports = {
  getHelpfiles: function(client, callback) {
    const queryString = `select category, json_agg( json_build_object('name', name, 'contents', contents)) as entries from helpfiles group by category order by category asc`;
    client.query(queryString, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data.rows)
      }
    })
  },
  
  getBuckets: function(client, callback) {
    const queryString = `select distinct bucket, false as selected from helpfiles`
    client.query(queryString, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data.rows)
      }
    })
  }
}
