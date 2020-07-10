Ext.define('hdb.view.main.MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.MainViewModel',
    requires: [
        'hdb.config.Config',
    ],
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
                    read: hdb.config.commands,
                    update: hdb.config.addcommand,
                    create: hdb.config.newregcommand
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
        MainNewCadStore: {
            model: 'hdb.model.MainGrid',
            storeId: 'mainnewcadstore',
            autoLoad: false,
            autoSync: false,
            proxy: {
                type: 'rest',
                api: {
                    create: hdb.config.newRegCommand
                },
                headers: {
                    'Authorization': 'Bearer {token}'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true,
                    //rootProperty: 'data',
                    //encode: true
                },
                actionMethods: {
                    create: 'POST'
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
                    read: hdb.config.commandsSearch
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