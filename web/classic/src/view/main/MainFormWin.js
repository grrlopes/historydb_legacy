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
            title: 'Command',
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
                    name: 'author',
                    fieldLabel: 'Author',
                    allowBlank: false,
                    readOnly: true
                },{
                    xtype: 'textfield',
                    name: 'title',
                    fieldLabel: 'Title',
                    readOnly: true
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
                    autoHeight: true,
                    height: 370,
                    resizable: true,
                    allowBlank: false
                }],
                buttons: [{
                    text: 'Save',
                    formBind: true,
                    handler: 'onEditForm'
                }]
            }]
        },{
            title: 'Track Down',
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