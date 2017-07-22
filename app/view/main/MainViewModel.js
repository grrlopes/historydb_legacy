Ext.define('hdb.view.main.MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.MainViewModel',
    stores: {
        MainListStore: {
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
        },
    /*    MainListPagingStore: {
            model: 'hdb.model.MainGrid',
            autoLoad: true,
            pageSize: 5,
            proxy:
           {
               type: 'rest',
               reader:
               {
                   rootProperty: 'data',
                   type: 'json',
                   totalProperty: 'TotalCount'
               },
               url: '/api/student'
           }
        }
    */
    }
});