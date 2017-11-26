Ext.define('hdb.view.main.MainNovoForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.mainnovoform',

    controller: 'mainviewctrl',

    title: 'Novo registro',
    width: 710,
    height: 470,
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
            name: 'sistema',
            fieldLabel: 'Sistema',
            width: 500,
            allowBlank: false
        },{
            xtype: 'textfield',
            name: 'funcao',
            fieldLabel: 'Função',
            width: 500,
            allowBlank: false
        },{
            xtype: 'htmleditor',
            name: 'comando',
            fieldLabel: 'Comando',
            autoHeight: true,
            resizable: true,
            allowBlank: false
        }],
        buttons: [{
            text: 'Cadastrar',
            formBind: true,
            handler: 'onCadastraForm'
        }]
    }]
})