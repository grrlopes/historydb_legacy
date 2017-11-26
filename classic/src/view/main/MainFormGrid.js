Ext.define('hdb.view.main.MainFormGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mainformgrid',
    maxHeight: 387,
    autoHeight: true,
    resizable: true,
    viewConfig: {
        enableTextSelection: true,
        float: true,
        disableSelection: true,
        stripeRows: false,
        preserveScrollOnRefresh: true,
        trackOver: false
    },

    viewModel: {
        type: 'MainViewModel'
    },

    store: 'mainFormgridstoreId',
    columns: [{
        header: 'Comando',
        dataIndex: 'comando',
        align: 'left',
        flex: 1
    },{
        header: 'Autor',
        dataIndex: 'autor',
        width: 150,
        align: 'center'
    },{
        header: 'Data',
        dataIndex: 'data',
        align: 'center',
        width: 135,
        xtype: 'datecolumn',
        format: 'd-m-Y H:i'
    }],
    tbar: [{
        text: 'Reload',
        handler: 'onReloadForm'
    }]
});