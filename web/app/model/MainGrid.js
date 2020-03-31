Ext.define('hdb.model.MainGrid', {
    extend: 'Ext.data.Model',
    schema: {
        namespace: 'hdb.model'
    },
    fields: [
        { name: '_id', type: 'string' },
        { name: 'autor', type: 'string' },
        { name: 'sistema', type: 'string' },
        { name: 'funcao', type: 'string' },
        { name: 'comando', type: 'string' },
        { name: 'data', type: 'date' }
    ]
});