Ext.define('hdb.store.MainFormGridStore',{
    extend: 'Ext.data.Store',
    alias: 'store.mainFormgridstore',
    model: 'hdb.model.MainGrid',
    autoLoad: false,
    autoSync: false,
    storeId: 'mainFormgridstoreId',
    sorters: [{
        property: 'data',
        direction: 'desc'
    }],
    proxy: {
        type: 'rest',
        api: {
            read: 'php/maingrid/getFormGrid.php'
        },
        reader: {
            type: 'json',
            rootProperty: 'dados'
        },
        actionMethods: {
            read: 'GET'
        }
    }
})