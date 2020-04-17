Ext.define('hdb.model.MainGrid', {
    extend: 'Ext.data.Model',
    schema: {
        namespace: 'hdb.model'
    },
    fields: [
        { name: 'id', type: 'string', persist: false },
        { name: '_id', type: 'string' },
        { name: 'author', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'definition', type: 'string' },
        { name: 'command', type: 'string' },
        { name: 'created', type: 'date' },
        { name: 'updated', type: 'date' }
    ]
});