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
            read: 'http://localhost:8080/api/command'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        actionMethods: {
            read: 'GET'
        }
    }
})