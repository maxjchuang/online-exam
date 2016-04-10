module.exports = [
  ['get', '/', Controller.home.render],
  ['get', '/login', Controller.auth.render],
  ['post', '/login', Controller.auth.login],
  ['get', '/logout', Controller.auth.logout]
];
