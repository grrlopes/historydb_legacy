Ext.define('hdb.view.main.MainGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.maingridview',
    title: 'HistoryDB',

    header:{
        titlePosition: 0,
        items:[{
            xtype:'button',
            text: localStorage.getItem("historydb"),
            glyph: 'f007@FontAwesome',
            disabled: true
        },{
            xtype: 'button',
            text: 'Logoff',
            glyph: 'f08b',
            handler: 'onLogOff'
        }]
    },

    bind: {
        store: '{MainListStore}'
    },

    controller: 'mainviewctrl',

    viewModel: {
        type: 'MainViewModel' 
    },

    viewConfig : {
      enableTextSelection: true
    },

    columns: [{
        header: 'Sistema',
        dataIndex: 'sistema',
        width: 200,
        align: 'center'
    },{
        header: 'Função',
        dataIndex: 'funcao',
        width: 200,
        align: 'center'
    },{
        header: 'Editor(a)',
        dataIndex: 'autor',
        width: 150,
        align: 'center'
    },{
        header: 'Comando',
        dataIndex: 'comando',
        align: 'left',
        flex: 1
    },{
        header: 'Revisão',
        dataIndex: '',
        width: 80,
        align: 'center'
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
        glyph: 'f055',
        handler: 'onNovoForm'
    },'-',{
        text: 'Remover',
        glyph: 'f056',
        handler: 'onRemoveClick',
        disabled: true
    },'->',{
        xtype: 'toolbar',
        margin: 'left',
        border: false,
        items: [{
          id: 'pesquisa',
          xtype: 'textfield',
          iconCls: 'search',
          name: 'pesquisa',
          emptyText: 'Pesquisa',
          enableKeyEvents: true,
          onTriggerClick: function(field, trigger, e){
            Ext.getCmp('pesquisa').setValue('');
          },
          listeners: {
            change: {
              buffer: 1000,
              fn: function(){
                var page = 1, valores = ['sistema', 'funcao', 'comando', 'autor'], Avalores = new Object();
                function seletor(value){
                  return Ext.ComponentQuery.query('maingridview [itemId='+value+']')[0];
                };
                Ext.Array.each(valores, function(e){
                  if(seletor(e).checked){
                    var value = seletor(e).itemId;
                    Avalores[value] = seletor(e).itemId;
                  }
                });
                Avalores['search'] = Ext.getCmp('pesquisa').getValue();
                Avalores['sort'] = false;
                var store = Ext.ComponentQuery.query('maingridview')[0].getStore();
                store.clearFilter();
                if(Ext.getCmp('pesquisa').getValue() === ''){
                  store.proxy.extraParams = null;
                  store.loadPage(page, Avalores);
                }else{
                  store.proxy.extraParams = Avalores;
                  store.loadPage(page, Avalores);
                }
              }
            }
          }
        }]
      },{
        glyph:'f14a',
        menu: [
          { xtype: 'menucheckitem', text: 'Selecione',
            handler: function(item, e){
              if(item.checked){
                item.setText('Desselecionar');
              }else{
                item.setText('Selecionar');
              }
              var valores = ['sistema','funcao','comando','autor'];
              function seletor(value){
                return Ext.ComponentQuery.query('maingridview [itemId='+value+']')[0];
              };
              Ext.Array.each(valores, function(e){
                if(item.checked){
                  seletor(e).setChecked(true);
                }else{
                  seletor(e).setChecked(false);
                }
              });
            }
          },'-',
          { itemId: 'sistema', xtype: 'menucheckitem', text: 'sistema'},
          { itemId: 'funcao', xtype: 'menucheckitem', text: 'funcao'},
          { itemId: 'comando', xtype: 'menucheckitem', text: 'comando', checked: true},
          { itemId: 'autor', xtype: 'menucheckitem', text: 'autor'}
        ]
      }],

    bbar: [{
        xtype: 'pagingtoolbar',
        bind:{
            store: '{MainListStore}'
        },
        displayInfo: true,
        displayMsg: 'Registros {0} - {1} de {2}',
        emptyMsg: "Nenhum registro encontrado."
    }]

});