Ext.define('hdb.view.main.MainGridView', {
    extend: 'Ext.grid.Panel',
    xtype: 'row-editing',
    alias: 'widget.maingridview',

    title: 'HistoryDB',

    store: {
        type: ''
    },

    plugins: [{
        ptype: 'rowediting',
        clicksToMoveEditor: 1,
        autoCancel: false
    }],

    columns: [{
        header: 'Autor',
        dataIndex: 'autor',
        width: 100,
        flex: 1,
        dirtyText: 'autor será alterado',
        editor: {
            allowBlank: false
        }
    }, {
        header: 'Sistema',
        dataIndex: 'sistema',
        dirtyText: 'Sistema será alterado',
        flex: 1,
        editor: {
            allowBlank: false,
            vtype: 'sistema'
        }
    }, {
        header: 'Função',
        dataIndex: 'funcao',
        dirtyText: 'E-mail será alterado',
        flex: 1,
        editor: {
            allowBlank: false,
            vtype: 'funcao'
        }
    },{
        header: 'Comando',
        dataIndex: 'comando',
        dirtyText: 'Comando será alterado',
        flex: 1,
        editor: {
            allowBlank: false,
            vtype: 'comando'
        }
    }],

    tbar: [{
        text: 'Novo',
        handler: 'onNovoClick'
    }, {
        text: 'Remover',
        reference: 'removeEmployee',
        handler: 'onRemoveClick',
        disabled: true
    }]
});