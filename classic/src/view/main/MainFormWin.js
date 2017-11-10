Ext.define('hdb.view.main.MainFormWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.mainformwin',
    requires: [
        //'Ext.form.Panel'
    ],
    controller: 'mainviewctrl',
    viewModel: { type: 'MainViewModel' },

    width: 700,
    height: 700,
    maxWidth: 800,
    maxHeight: 500,
    minWidth: 500,
    minHeight: 300,

    bodyPadding: 10,
    resizable: false,
    closable: true,
    autoShow: true,
    autoDestroy: true,
    destroyAction: 'hide',
    modal: true,

    items: [{
        width: 675,
        height: 445,
        xtype: 'form',
        defaults: {
            labelAlign: 'top'
        },
        items: [{
            xtype: 'textfield',
            name: 'autor',
            fieldLabel: 'Autor',
            allowBlank: false,
            readOnly: true
        },{
            xtype: 'textfield',
            name: 'sistema',
            fieldLabel: 'Sistema',
            readOnly: true
        },{
            xtype: 'textfield',
            name: 'funcao',
            fieldLabel: 'Função',
            width: 500,
            allowBlank: false,
        },{
            xtype: 'htmleditor',
            name: 'comando',
            fieldLabel: 'Comando',
            height: 150,
            allowBlank: false,
        }],
        buttons: [{
            text: 'Salvar',
            formBind: false,
            handler: 'onEditForm'
        }]
    }]
});