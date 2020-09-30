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
    title: 'HistoryDB',
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
            title: 'Sign In',
            items: [{
                width: 345,
                height: 150,
                xtype: 'form',
                items: [{
                    xtype: 'textfield',
                    name: 'username',
                    fieldLabel: 'Username',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    name: 'password',
                    inputType: 'password',
                    fieldLabel: 'Password',
                    allowBlank: false
                },{
                    xtype: 'displayfield',
                    hideEmptyLabel: false
                }],
                buttons: [{
                    text: 'Sign in',
                    formBind: true,
                    listeners: {
                        click: 'onSignin'
                    }
                }]
            }]
        },{
            title: 'Sign Up',
            items: [{
                width: 345,
                height: 180,
                xtype: 'form',
                items: [{
                    xtype: 'textfield',
                    name: 'email',
                    fieldLabel: 'Email',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: 'Name',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    name: 'surname',
                    fieldLabel: 'Surname',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    name: 'username',
                    fieldLabel: 'Username',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    name: 'password',
                    inputType: 'password',
                    fieldLabel: 'Password',
                    allowBlank: false
                }],
                buttons: [{
                    text: 'Sign Up',
                    formBind: true,
                    listeners: {
                        click: 'onSignup'
                    }
                }]
            }]
        }]
    }]
});
