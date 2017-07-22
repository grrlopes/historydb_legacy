Ext.define('hdb.model.MainGrid', {
    extend: 'Ext.data.Model',
    fields: [
        { name: '_id', type: 'int' },
        { name: 'autor', type: 'string' },
        { name: 'sistema', type: 'string' },
        { name: 'funcao', type: 'string' },
        { name: 'comando', type: 'string' },
        { name: 'data', type: 'date' }
    ]
});