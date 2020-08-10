Ext.define('hdb.view.perfil.PerfilController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.perfilviewctrl',
  requires: [
    'hdb.config.Config',
  ],

  init: function () {
    this.getToken();
  },

  onPerfilInfo: function (btn, e, eOpts) {
    var win = btn.up('window'),
      form = win.down('form'),
      values = form.getValues();
    Ext.Ajax.request({
      url: hdb.config.perfilupdate,
      cors: true,
      method: "PUT",
      useDefaultXhrHeader: false,
      headers: {
        'Authorization': 'Bearer ' + this.getViewModel().get('token')
      },
      jsonData: {
        'password': values.password,
        'confirm_password': values.confirm_password
      },
      success: function (conn, response, options, eOpts) {
        var result = Ext.JSON.decode(conn.responseText, true);
        Ext.Msg.show({
          msg: result.message,
          icon: Ext.Msg.INFO,
          closable: false,
          buttons: Ext.Msg.OK,
          fn: function (btn, ev) {
            if (btn === 'ok') {
              form.getForm().reset();
            }
          }
        });
      },
      failure: function (conn, response, options, eOpts) {
        var result = Ext.JSON.decode(conn.responseText, true);
        Ext.Msg.show({
          msg: result.message._custom[0]['msg'],
          icon: Ext.Msg.INFO,
          closable: false,
          buttons: Ext.Msg.OK
        });
      }
    })
  },

  getToken: function () {
    var token = localStorage.getItem('token');
    this.getViewModel().set('token', token);
  },

});
