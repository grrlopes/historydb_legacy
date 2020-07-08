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
    requires: [
        'hdb.config.Config',
    ],
    proxy: {
        type: 'rest',
        api: {
            read: hdb.config.command
        },
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
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