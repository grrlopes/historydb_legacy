Ext.define('hdb.view.main.MainGridView', {
    extend: 'Ext.grid.Panel',
    xtype: 'row-editing',
    alias: 'widget.maingridview',

    title: 'HistoryDB',

    store: {
        type: 'maingrid'
    },

    viewModel: { 
        type: 'MainViewModel' 
    },    

    plugins: [{
        ptype: 'rowediting',
        clicksToMoveEditor: 1,
        cancelBtnText: 'Cancelar',
        saveBtnText: 'Salvar',
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
        }
    }, {
        header: 'Função',
        dataIndex: 'funcao',
        dirtyText: 'E-mail será alterado',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    },{
        header: 'Comando',
        dataIndex: 'comando',
        dirtyText: 'Comando será alterado',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    },{
        header: 'Data',
        dataIndex: 'data',
        flex: 1,
        xtype: 'datecolumn',
        format: 'd-m-Y H:i' 
    }],

    tbar: [{
        text: 'Novo',
        handler: 'onNovoClick'
    }, {
        text: 'Remover',
        reference: 'removeEmployee',
        handler: 'onRemoveClick',
        disabled: true
    }],

    dockedItems: [{
        xtype: 'pagingtoolbar',
        //store: productStore,
        dock: 'bottom',
        displayInfo: true
    }]

});