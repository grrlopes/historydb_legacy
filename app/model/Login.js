Ext.define('hdb.model.Login', {
    extend: 'Ext.data.Model',
    schema: {
        namespace: 'hdb.model'
    },
    fields: [
        { name: '_id', type: 'string' },
        { name: 'usuario', type: 'string' },
        { name: 'level', type: 'string' },
        { name: 'logado', type: 'string' },
        { name: 'lastlogin', type: 'date' },
    ]
});