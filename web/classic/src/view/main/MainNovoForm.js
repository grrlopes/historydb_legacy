Ext.define('hdb.view.main.MainNewForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.mainnewform',

    controller: 'mainviewctrl',

    title: 'New register',
    width: 710,
    height: 600,
    maxWidth: 1200,
    maxHeight: 800,
    minWidth: 500,
    minHeight: 300,

    bodyPadding: 1,
    resizable: true,
    closable: true,
    autoShow: true,
    autoDestroy: true,
    destroyAction: 'hide',
    modal: true,
    layout: 'fit',

    viewModel: {
        type: 'MainViewModel'
    },

    items: [{
        width: 675,
        height: 400,
        xtype: 'form',
        defaults: {
            labelAlign: 'top'
        },
        items: [{
            xtype: 'textfield',
            name: 'title',
            fieldLabel: 'Title',
            width: 500,
            allowBlank: false
        },{
            xtype: 'textfield',
            name: 'definition',
            fieldLabel: 'Definition',
            width: 500,
            allowBlank: false
        },{
            xtype: 'htmleditor',
            name: 'command',
            fieldLabel: 'Command',
            height: 410,
            autoHeight: true,
            resizable: true,
            allowBlank: false
        }],
        buttons: [{
            text: 'Create',
            formBind: true,
            handler: 'onRegisterForm'
        }]
    }]
})