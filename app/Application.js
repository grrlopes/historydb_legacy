/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('hdb.Application', {
    extend: 'Ext.app.Application',
    
    name: 'hdb',

    requires: [
        'hdb.view.login.Login',
        'hdb.view.main.MainView'
    ],

    stores: [
        
    ],
    
    launch: function (){
        var loggedIn;

        loggedIn = localStorage.getItem("hdbDrama");

        Ext.create({        
            xtype: loggedIn ? 'mainview' : 'mainview'
        });
    }
});
