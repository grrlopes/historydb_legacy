Ext.define('hdb.store.maingrid.MainGrid',{
    extend: 'Ext.data.Store',
    alias: 'store.maingrid',
    model: 'hdb.model.MainGrid',
    autoLoad: true,
    autoSync: false,
    proxy: {
        type: 'rest',
        api: {
            read: 'php/maingrid/getGrid.php'
        },
        reader: {
            type: 'json',
            rootProperty: 'dados'
        },
        writer: {
            type: 'json',
            dateFormat: 'd/m/Y',
            writeAllFields: true
        },
        actionMethods: {
            read: 'GET', update: 'POST'
        }
    }

})