Ext.define("hdb.config.Config", {
  alternateClassName: [
    'hdb.config'
  ],
	singleton: true,

  constant: {
    /*
      app/view/main
      MainViewModel
    */
    // MainListStore, MainNewCadStore
    commands: 'http://localhost:8080/api/commands',
    addcommand: 'http://localhost:8080/api/addcommand?',
    newregcommand: 'http://localhost:8080/api/newregcommand',
    // MainSearchStore
    commandsSearch: 'http://localhost:8080/api/commandsSearch/',

    /*
      app/view/login
      LoginController
    */
    onlogin: 'http://localhost:8080/auth/login',

    /*
      Main folder
      Maincontroller
    */
    onlogoff: 'http://localhost:8080/auth/logout',

    /*
      app/store
      MainFormGridStore
    */
    command: 'http://localhost:8080/api/command'
	},
	

  constructor: function () {
		var constant = this.constant;
		return constant;
  }

});