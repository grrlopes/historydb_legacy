Ext.define('hdb.view.main.MainGridView', {
    extend: 'Ext.grid.Panel',
    xtype: 'row-editing',
    alias: 'widget.maingridview',

    title: 'HistoryDB',

    bind: {
        store: '{MainListStore}'
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
        align: 'center'
    }, {
        header: 'Sistema',
        dataIndex: 'sistema',
        dirtyText: 'Sistema será alterado',
        flex: 1,
        align: 'center',
        editor: {
            allowBlank: false,
        }
    }, {
        header: 'Função',
        dataIndex: 'funcao',
        dirtyText: 'E-mail será alterado',
        flex: 1,
        align: 'center',
        editor: {
            allowBlank: false,
        }
    },{
        header: 'Comando',
        dataIndex: 'comando',
        dirtyText: 'Comando será alterado',
        align: 'center',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    },{
        header: 'Data',
        dataIndex: 'data',
        align: 'center',
        flex: 1,
        xtype: 'datecolumn',
        format: 'd-m-Y H:i' 
    }],

    tbar: [{
        text: 'Novo',
        handler: 'onNovoClick'
    }, {
        text: 'Remover',
        handler: 'onRemoveClick',
        disabled: true
    },'->',{
        xtype: 'toolbar',
        border: false,
        items: [{
            id: 'pesquisa',
            xtype: 'textfield',
            triggers: {
                foo: {
                    cls: 'x-form-clear-trigger',
                    handler: function() {
                        console.log('foo trigger clicked');
                    }
                }
            },
            name: 'pesquisa',
            emptyText: 'Pesquisa',
            handler: 'onTeste'
            /*
            onTriggerClick: function(field, trigger, e){
              Ext.getCmp('pesquisa').setValue('');
            },
            */            
        }]
    }],

    dockedItems: [{
        xtype: 'pagingtoolbar',
        //store: productStore,
        dock: 'bottom',
        displayInfo: true
    }]

});