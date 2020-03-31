Ext.define('hdb.view.login.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.loginview',

    requires: [
        'hdb.view.login.LoginController',
        'Ext.form.Panel'
    ],

    controller: 'loginviewctrl',

    bodyPadding: 1,
    resizable: false,
    title: 'Credencial',
    closable: false,
    autoShow: true,
    border: false,

    items: [{
        region: 'center',
        xtype: 'tabpanel',
        activeTab: 0,
        split: false,
        border: false,
        defaults: {
            layout: 'fit',
            bodyPadding: 10
        },
        items: [{
            title: 'Login',
            items: [{
                width: 345,
                height: 150,
                xtype: 'form',
                items: [{
                    xtype: 'textfield',
                    name: 'user',
                    fieldLabel: 'Usuário',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    name: 'pass',
                    inputType: 'password',
                    fieldLabel: 'senha',
                    allowBlank: false
                },{
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
            }]
        },{
            title: 'Não tenho cadastro',
            items: [{
                width: 345,
                height: 150,
                xtype: 'form',
                items: [{
                    xtype: 'textfield',
                    name: 'user',
                    fieldLabel: 'Usuário',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    name: 'pass',
                    inputType: 'password',
                    fieldLabel: 'senha',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    name: 'cpass',
                    inputType: 'password',
                    fieldLabel: 'Confirme senha',
                    allowBlank: false
                }],
                buttons: [{
                    text: 'Cadastrar',
                    formBind: true,
                    listeners: {
                        click: 'onNovoLogin'
                    }
                }]
            }]
        }]
    }]
});