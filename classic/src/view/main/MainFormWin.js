Ext.define('hdb.view.main.MainFormWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.mainformwin',
    requires: [
        'hdb.view.main.MainFormGrid'
    ],

    controller: 'mainviewctrl',

    viewModel: {
        type: 'MainViewModel'
    },

    viewConfig: {
        enableTextSelection: true
    },

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
            title: 'Comando',
            items: [{
                width: 675,
                height: 390,
                xtype: 'form',
                defaults: {
                    labelAlign: 'top'
                },
                items: [{
                    xtype: 'hidden',
                    name: '_id'
                },{
                    xtype: 'hidden',
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
                    allowBlank: false
                },{
                    xtype: 'htmleditor',
                    name: 'comando',
                    fieldLabel: 'Comando',
                    autoHeight: true,
                    height: 370,
                    resizable: true,
                    allowBlank: false
                }],
                buttons: [{
                    text: 'Salvar',
                    formBind: true,
                    handler: 'onEditForm'
                }]
            }]
        },{
            title: 'Histórico',
            items: [{
                defaults: {
                    labelAlign: 'top'
                },
                items: [{
                    xtype: 'mainformgrid'
                }]
            }]
        }]
    }]
});