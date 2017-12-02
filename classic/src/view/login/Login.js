Ext.define('hdb.view.login.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.loginview',

    requires: [
        'hdb.view.login.LoginController',
        'Ext.form.Panel'
    ],

    controller: 'loginviewctrl',

    bodyPadding: 10,
    resizable: false,
    title: 'Credencial',
    closable: false,
    autoShow: true,

    items: {
        xtype: 'form',
        items: [{
            xtype: 'textfield',
            name: 'user',
            fieldLabel: 'Usuário',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'pass',
            inputType: 'password',
            fieldLabel: 'Senha',
            allowBlank: false
        }, {
            xtype: 'displayfield',
            hideEmptyLabel: false
        }],
        buttons: [{
            text: 'Logar',
            formBind: true,
            listeners: {
                click: 'onLogin'
            }
        }]
    }
});