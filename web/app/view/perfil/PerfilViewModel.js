Ext.define('hdb.view.perfil.PerfilViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.PerfilViewModel',
  requires: [
    'hdb.config.Config',
  ],
  stores: {
    PerfilCred: {
      //model: 'hdb.model.Login',
      storeId: 'perfilcred',
      autoLoad: true,
      autoSync: false,
      proxy: {
        type: 'rest',
        api: {
          read: hdb.config.commands,
          update: hdb.config.perfilupdate
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
          read: 'GET', update: 'PUT'
        }
      }
    }
  }
});
