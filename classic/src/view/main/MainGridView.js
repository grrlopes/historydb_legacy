Ext.define('hdb.view.main.MainGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.maingridview',
    title: 'HistoryDB',

    bind: {
        store: '{MainListStore}'
    },

    controller: 'mainviewctrl',

    viewModel: {
        type: 'MainViewModel' 
    },

    columns: [{
        header: 'Sistema',
        dataIndex: 'sistema',
        width: 200,
        align: 'center'
    }, {
        header: 'Função',
        dataIndex: 'funcao',
        width: 200,
        align: 'center'
    },{
        header: 'Comando',
        dataIndex: 'comando',
        align: 'left',
        flex: 1,
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

    listeners: {
        rowdblclick: 'onSelect'
    },

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