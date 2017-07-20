Ext.define('hdb.view.main.MainView', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainview',
    requires: [
        'hdb.view.main.MainController',
        'hdb.view.main.MainGridView',
        'Ext.panel.Panel',
        'Ext.button.Button'
    ],

    controller: 'mainview',
    viewModel: {
        type: ''
    },

    layout: 'fit',
    defaults: {
        margin: {
            top: 5, left: 5,
            right: 5, bottom: 5
        }
    },

    items: [{
        region: 'center',              
        border: false,
        defaults: {
            //layout: 'fit'
        },
        xtype: 'maingridview'
    }]
});