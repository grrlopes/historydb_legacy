Ext.define('hdb.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewctrl',
    requires: [
        'hdb.config.Config',
    ],
    init: function () {
        this.getToken();
    },

    onNovoForm: function(){
        var win = Ext.create('hdb.view.main.MainNewForm');
    },

    onLogOff: function(button, e, eOpts){
        var me = this;
        Ext.getBody().mask("Logging off...");
        Ext.Ajax.request({
          url: hdb.config.onlogoff,
          method: 'POST',
          headers: {
            'Authorization': 'Bearer '+this.getViewModel().get('token')
          },
          success: function(response){
            var msg = Ext.JSON.decode(response.responseText, true);
            if(response.status == 200){
                me.clearToken()
                me.getView().destroy();
                Ext.widget(
                    'loginview'
                )
                Ext.getBody().unmask();
            }
          }
        });
    },

    onRegisterForm: function(btn, e, eOpts){
        var win = btn.up('window'),
            form = win.down('form'),
            store = Ext.ComponentQuery.query('maingridview')[0].getStore(),
            values = form.getForm().getValues();
        Ext.MessageBox.show({
            icon: Ext.Msg.QUESTION,
            closable: false,
            title: 'Attention',
            msg: 'Is all the information correct ?',
            buttons: Ext.MessageBox.YESNO,
            fn: function(btn, env){
                if(btn == 'yes'){
                    store.insert(0, values);
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
            console.log(record)
        var store = Ext.data.StoreManager.lookup('mainFormgridstoreId');
        store.load({
            params:{_id: record.get('_id')}
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
    },

    getToken: function(){
        var token = localStorage.getItem('token');
        this.getViewModel().set('token', token);
    },

    clearToken: function(){
        localStorage.removeItem("user");
        localStorage.removeItem("userid");
        localStorage.removeItem("token");
        sessionStorage.removeItem("historydb");
    }
})