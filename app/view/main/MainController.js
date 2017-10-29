Ext.define('hdb.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewctrl',
    requires: [
        'hdb.view.main.MainFormWin'
    ],

    onNovoClick: function(){
        console.log('44444dcc');
    },

    onTeste: function(){
        Ext.getCmp('pesquisa').setValue('');
    },

    onEditForm: function(btn, e, eOpts){
        var win = btn.up('window'),
        form = win.down('form');
        console.log(form.getValues());

    },

    onSelect: function (grid, record, index, eOpts){
        var win = Ext.create('hdb.view.main.MainFormWin');
        win.setTitle('Informação do sistema - '+record.get('sistema'));
        var form = win.down('form');
        form.loadRecord(record);
    }
})