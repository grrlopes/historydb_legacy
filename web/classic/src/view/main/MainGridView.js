Ext.define('hdb.view.main.MainGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.maingridview',
    title: 'HistoryDB',

    initComponent: function(){
      var me = this;
      Ext.applyIf(me, {
        header:{
            titlePosition: 0,
            items:[{
                xtype:'button',
                text: this.getToken(),
                glyph: 'f007@FontAwesome',
                disabled: true,
                margin: 'auto, 5px, auto, auto'
            },{
                xtype: 'button',
                text: 'Exit',
                glyph: 'f08b',
                handler: 'onLogOff'
            }],
          tools: [{
            glyph: 'f143',
            tooltip: 'CLICK !!!',
            callback: function(){}
          }]
        }
      });
      me.callParent(arguments);
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
        header: 'Title',
        dataIndex: 'title',
        width: 200,
        align: 'center'
    },{
        header: 'Definition',
        dataIndex: 'definition',
        width: 200,
        align: 'center'
    },{
        header: 'Edited by',
        dataIndex: 'cmd_author',
        width: 150,
        align: 'center'
    },{
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
    },{
      header: 'Updated',
      dataIndex: 'updatedAt',
      align: 'center',
      width: 135,
      xtype: 'datecolumn',
      format: 'd-m-Y H:i'
  }],

    listeners: {
        rowdblclick: 'onSelect'
    },

    tbar: [{
        text: 'New',
        glyph: 'f055',
        handler: 'onNovoForm'
    },'->',{
        xtype: 'toolbar',
        margin: 'left',
        border: false,
        items: [{
          id: 'pesquisa',
          xtype: 'textfield',
          iconCls: 'search',
          name: 'pesquisa',
          emptyText: 'Search',
          enableKeyEvents: true,
          onTriggerClick: function(field, trigger, e){
            Ext.getCmp('pesquisa').setValue('');
          },
          listeners: {
            change: {
              buffer: 1000,
              fn: function(){
                var page = 1,
                  valores = ['title', 'definition', 'command', 'author'],
                  Avalores = new Object();
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
                var store = Ext.getStore('mainsearch');
                var mainstore = Ext.getStore('mainlists');
                var reconfGrid = Ext.ComponentQuery.query('maingridview')[0];
                store.clearFilter();
                if(Ext.getCmp('pesquisa').getValue() === ''){
                  reconfGrid.bindStore(mainstore)
                  Ext.getCmp('pagBar').bindStore(mainstore);
                  mainstore.proxy.extraParams = Avalores;
                  mainstore.loadPage(page, Avalores);
                }else{
                  reconfGrid.bindStore(store)
                  Ext.getCmp('pagBar').bindStore(store);
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
          { xtype: 'menucheckitem', text: 'Check all',
            handler: function(item, e){
              if(item.checked){
                item.setText('Uncheck all');
              }else{
                item.setText('Check all');
              }
              var valores = ['title','definition','command','author'];
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
          { itemId: 'title', xtype: 'menucheckitem', text: 'title'},
          { itemId: 'definition', xtype: 'menucheckitem', text: 'definition'},
          { itemId: 'command', xtype: 'menucheckitem', text: 'command', checked: true},
          { itemId: 'author', xtype: 'menucheckitem', text: 'author'}
        ]
      }],

    bbar: [{
        id: "pagBar",
        xtype: 'pagingtoolbar',
        bind:{
            store: '{MainListStore}'
        },
        displayInfo: true
    }],

  getToken: function(){
    return localStorage.getItem('username');
  },

});