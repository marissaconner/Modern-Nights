module.exports = {
  getHelpfiles: function(client, callback) {
    const query = 'select array(select distinct category from helpfiles_help where staff_only is not true) as categories';
    client.query(query, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data.rows[0])
      }
    })
  }
}
