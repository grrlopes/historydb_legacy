Ext.define('hdb.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.loginviewctrl',

    onLogin: function(btn, event, Opts){
        var win = btn.up('window'),
            form = win.down('form'),
            me = this,
            valores = form.getForm().getValues();
        Ext.Ajax.request({
            url: 'php/login/getLogin.php',
            params: {
                user: valores.user,
                pass: valores.pass
            },
            success: function(conn, response, options, eOpts){
                var result = Ext.JSON.decode(conn.responseText, true);
                switch(result.msg){
                    case 'valido':
                        localStorage.setItem("historydb", valores.user);
                        sessionStorage.setItem("historydb", result.success);
                        me.getView().destroy();
                        Ext.widget(
                            'mainview'
                        );
                        break;
                    case 'novalido':
                        Ext.Msg.show({
                            msg: 'Senha incorreta!',
                            icon: Ext.Msg.WARNING,
                            closable: false,
                            buttons: Ext.Msg.OK
                        });
                        break;
                    case 'noexiste':
                        Ext.Msg.show({
                            msg: 'Credencial não existe!',
                            icon: Ext.Msg.INFO,
                            closable: false,
                            buttons: Ext.Msg.OK
                        });
                }
            },
            failure: function(conn, response, options, eOpts){
                console.log('falha');
            }
        });
    }
});