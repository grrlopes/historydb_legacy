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
                    read: 'php/maingrid/getGrid.php',
                    update: 'php/maingrid/setForm.php',
                    create: 'php/maingrid/setNovoCad.php'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'dados'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true,
                    rootProperty: 'dados',
                    encode: true
                },
                actionMethods: {
                read: 'GET', update: 'POST'
                }                 
            }
        },
        MainNovoCadStore: {
            model: 'hdb.model.MainGrid',
            autoLoad: false,
            autoSync: false,
            proxy: {
                type: 'rest',
                api: {
                    create: 'php/maingrid/setNovoCad.php',
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
        }
    }
});