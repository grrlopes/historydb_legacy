Ext.define('hdb.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewctrl',
    requires: [
        'hdb.view.main.MainFormWin'
    ],

    onNovoClick: function(){
        //store = this.getViewModel().getStore('MainListStore');
        //store.sync();
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
        store.load();
    },

    onSelect: function (grid, record, index, eOpts){
        var win = Ext.create('hdb.view.main.MainFormWin');
        win.setTitle('Informação do sistema - '+record.get('sistema'));
        var form = win.down('form');
        form.loadRecord(record);
    }
})