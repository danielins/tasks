var api = require('../api');

module.exports = (app) => {

  app.route('/tasks').get(api.tasks);

}
