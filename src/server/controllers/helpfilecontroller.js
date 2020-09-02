module.exports = {
  getHelpfiles: function(client, callback) {
    const queryString = `select category, array_agg(name) as entries from helpfiles where bucket='help' group by category order by category asc`;
    client.query(queryString, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data.rows)
      }
    })
  },

   getRulefiles: function(client, callback) {
    const queryString = `select category, array_agg(name) as entries from helpfiles where bucket='rules' group by category order by category asc`;
    client.query(queryString, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data.rows)
      }
    })
  }
}
