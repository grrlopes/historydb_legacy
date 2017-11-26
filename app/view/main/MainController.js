Ext.define('hdb.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewctrl',
    requires: [
        'hdb.view.main.MainFormWin',
        'hdb.view.main.MainNovoForm'
    ],

    onNovoForm: function(){
        var win = Ext.create('hdb.view.main.MainNovoForm');
    },

    onCadastraForm: function(btn, e, eOpts){
        var win = btn.up('window'),
            form = win.down('form'),
            store = Ext.ComponentQuery.query('maingridview')[0].getStore(),
            //store = this.getViewModel().getStore('MainNovoCadStore'),
            //store = this.getViewModel().getStore('MainListStore'),
            valor = form.getForm().getValues();
            store.insert(0, valor);
            store.sync();
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

    onTeste: function(){
        Ext.getCmp('pesquisa').setValue('');
    },

    onEditForm: function(btn, e, eOpts){
        var win = btn.up('window'),
            form = win.down('form'),
            store = Ext.ComponentQuery.query('maingridview')[0].getStore(),
            record = form.getRecord(),
            valor = form.getValues();
        record.set(valor);
        store.sync();
    },

    onSelect: function (grid, record, index, eOpts){
        var win = Ext.create('hdb.view.main.MainFormWin');
        var store = Ext.data.StoreManager.lookup('mainFormgridstoreId');
        win.setTitle('Informação do sistema - '+record.get('sistema'));
        var form = win.down('form');
        form.loadRecord(record);
        store.load({
            params:{_id: record.get('_id'), dados: 'formGrid'}
        });
    }
})