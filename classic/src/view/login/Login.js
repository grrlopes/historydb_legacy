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
            layout: 'fit'
        },
        items: [{
            title: 'Login',
            items: [{
                width: 375,
                height: 190,
                xtype: 'form',
                defaults: {
                    labelAlign: 'top'
                },
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
            title: 'Cadastro',
            items: [{
                width: 375,
                height: 250,
                xtype: 'form',
                defaults: {
                    labelAlign: 'top'
                },
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
                    fieldLabel: 'Confirme senha',
                    allowBlank: false
                }],
                buttons: [{
                    text: 'Cadastro',
                    formBind: true,
                    listeners: {
                        click: 'onCadastro'
                    }
                }]
            }]
        }]
    }]
});