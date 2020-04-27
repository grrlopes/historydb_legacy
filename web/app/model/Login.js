Ext.define('hdb.model.Login', {
    extend: 'Ext.data.Model',
    schema: {
        namespace: 'hdb.model'
    },
    fields: [
        { name: '_id', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'lastlogin', type: 'date' }
    ]
});