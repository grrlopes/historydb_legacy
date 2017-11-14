Ext.define('hdb.view.main.MainFormGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mainformgrid',

    bind: {
        store: '{MainListStore}'
    },

    viewModel: {
        type: 'MainViewModel'
    },

    columns: [{
        header: 'Autor',
        dataIndex: 'autor',
        width: 100,
        flex: 1,
        dirtyText: 'autor será alterado',
        align: 'center'
    }, {
        header: 'Sistema',
        dataIndex: 'sistema',
        dirtyText: 'Sistema será alterado',
        flex: 1,
        align: 'center'
    }, {
        header: 'Função',
        dataIndex: 'funcao',
        dirtyText: 'E-mail será alterado',
        flex: 1,
        align: 'center'
    },{
        header: 'Comando',
        dataIndex: 'comando',
        align: 'center',
        flex: 1
    },{
        header: 'Data',
        dataIndex: 'data',
        align: 'center',
        flex: 1,
        xtype: 'datecolumn',
        format: 'd-m-Y H:i'
    }]
});