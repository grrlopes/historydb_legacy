Ext.define('hdb.view.login.LoginViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.LoginViewModel',
    stores: {
        Login: {
            model: 'hdb.model.Login',
            autoLoad: false,
            autoSync: false,
            proxy: {
                type: 'rest',
                api: {
                    read: 'php/login/getLogin.php',
                },
                reader: {
                    type: 'json',
                    rootProperty: 'dados'
                },
                actionMethods: {
                    read: 'POST'
                }
            }
        }
    }
});