Ext.define('hdb.model.Student', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    schema: {
        namespace: 'hdb.model'
    },
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'autor', type: 'string' },
        { name: 'sistema', type: 'string' },
        { name: 'funcao', type: 'string' },
        { name: 'comando', type: 'date' },
        { name: 'data', type: 'string' }
    ]
});