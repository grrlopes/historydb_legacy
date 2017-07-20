Ext.define('hdb.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function(){
        
        localStorage.setItem("hdb", true);

        this.getView().destroy();

        Ext.create({
            xtype: 'mainview'
        });
    }
});