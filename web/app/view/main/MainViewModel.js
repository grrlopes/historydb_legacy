Ext.define('hdb.view.main.MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.MainViewModel',
    stores: {
        MainListStore: {
            model: 'hdb.model.MainGrid',
            storeId: 'mainlists',
            autoLoad: true,
            autoSync: false,
            pageSize: 5,
            proxy: {
                type: 'rest',
                api: {
                    read: 'http://localhost:8080/api/commands',
                    update: 'http://localhost:8080/api/addcommand?',
                    create: 'php/maingrid/setNovoCad.php'
                },
                headers: {
                    'Authorization': 'Bearer {token}'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true
                },
                actionMethods: {
                read: 'GET', update: 'PUT', write: 'POST'
                }
            },
            remoteFilter: true,
            filterParam: 'query'
        },
        MainNovoCadStore: {
            model: 'hdb.model.MainGrid',
            autoLoad: false,
            autoSync: false,
            proxy: {
                type: 'rest',
                api: {
                    create: 'php/maingrid/setNovoCad.php'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true,
                    rootProperty: 'dados',
                    encode: true
                },
                actionMethods: {
                    update: 'POST'
                }
            }
        },
        MainSearchStore: {
            model: 'hdb.model.MainGrid',
            storeId: 'mainsearch',
            autoLoad: false,
            autoSync: false,
            pageSize: 5,
            proxy: {
                type: 'rest',
                api: {
                    read: 'http://localhost:8080/api/commandsSearch/'
                },
                headers: {
                    'Authorization': 'Bearer {token}'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                actionMethods: {
                read: 'GET',
                }
            },
            remoteFilter: true,
            filterParam: 'query'
        },
    }
});