Ext.define('hdb.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewctrl',

    onNovoForm: function(){
        var win = Ext.create('hdb.view.main.MainNovoForm');
    },

    onLogOff: function(button, e, eOpts){
        var me = this;
        sessionStorage.removeItem("historydb");
        Ext.getBody().mask("Efetuando Logout ...");
        Ext.Ajax.request({
          url: 'php/login/getLogout.php',
          method: 'POST',
          success: function(response){
            var resultado = Ext.JSON.decode(response.responseText, true);
            if(resultado.success){
                me.getView().destroy();
                Ext.widget(
                    'loginview'
                )
                Ext.getBody().unmask();
            }
          }
        });
    },

    onCadastraForm: function(btn, e, eOpts){
        var win = btn.up('window'),
            form = win.down('form'),
            store = Ext.ComponentQuery.query('maingridview')[0].getStore(),
            valor = form.getForm().getValues();
        Ext.MessageBox.show({
            icon: Ext.Msg.QUESTION,
            closable: false,
            title: 'Atenção',
            msg: 'As informações estão corretas ?',
            buttons: Ext.MessageBox.YESNO,
            fn: function(btn, env){
                if(btn == 'yes'){
                    store.insert(0, valor);
                    store.sync();
                    form.reset();
                }
            }
        })
    },

    onReloadForm: function(btn, e, eOpts){
        var win = btn.up('window'),
            form = win.down('form'),
            record = form.getRecord();
        var store = Ext.data.StoreManager.lookup('mainFormgridstoreId');
        store.load({
            params:{_id: record.get('_id'), dados: 'formGrid'}
        });
    },

    onEditForm: function(btn, e, eOpts){
        var win = btn.up('window'),
            form = win.down('form'),
            store = Ext.ComponentQuery.query('maingridview')[0].getStore(),
            record = form.getRecord(),
            value = form.getValues();
        Ext.MessageBox.show({
            icon: Ext.Msg.WARNING,
            closable: false,
            title: 'Edition',
            msg: 'Are you sure You want to save changes ?',
            buttons: Ext.MessageBox.YESNO,
            fn: function(btn, env){
                if(btn == 'yes'){
                    record.set({'_id': value._id, 'command': value.command});
                    store.sync();
                    win.close();
                }
            }
        })
    },

    onSelect: function (grid, record, index, eOpts){
        var win = Ext.create('hdb.view.main.MainFormWin');
        var store = Ext.data.StoreManager.lookup('mainFormgridstoreId');
        win.setTitle('Informação do sistema - '+record.get('sistema'));
        var form = win.down('form');
        form.loadRecord(record);
        store.load({
            params:{_id: record.get('_id')}
        });
    }
})