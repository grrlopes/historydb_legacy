Ext.define('hdb.view.perfil.PerfilFormWin', {
  extend: 'Ext.window.Window',
  alias: 'widget.perfilformwin',

  controller: 'perfilviewctrl',

  viewModel: {
    type: 'PerfilViewModel'
  },

  width: 310,
  height: 160,

  bodyPadding: 1,
  closable: true,
  autoShow: true,
  autoDestroy: true,
  destroyAction: 'hide',
  modal: true,
  layout: 'fit',
  title: 'Perfil',
  items: [{
    bodyPadding: 5,
    xtype: 'form',
    items: [{
      xtype: 'textfield',
      name: 'password',
      inputType: 'password',
      fieldLabel: 'Password',
      allowBlank: false
    }, {
      xtype: 'textfield',
      name: 'confirm_password',
      inputType: 'password',
      fieldLabel: 'Confirm Password',
      allowBlank: false
    }],
    buttons: [{
      text: 'Change',
      formBind: false,
      listeners: {
        click: 'onPerfilInfo'
      }
    }]
  }]
});
