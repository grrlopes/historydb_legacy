Ext.define('hdb.view.main.MainFormGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mainformgrid',
    height: 510,
    maxHeight: 800,
    autoHeight: true,
    resizable: true,
    viewConfig: {
        enableTextSelection: true,
        float: true,
        disableSelection: false,
        stripeRows: true,
        preserveScrollOnRefresh: true,
        trackOver: false
    },

    viewModel: {
        type: 'MainViewModel'
    },

    store: 'mainFormgridstoreId',
    columns: [{
        header: 'Command',
        dataIndex: 'command',
        align: 'left',
        flex: 1
    },{
        header: 'Author',
        dataIndex: 'author',
        width: 150,
        align: 'center'
    },{
        header: 'Created',
        dataIndex: 'createdAt',
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
