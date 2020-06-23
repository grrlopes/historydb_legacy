Ext.define('hdb.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.loginviewctrl',

    onLogin: function(btn, event, Opts){
        var win = btn.up('window'),
            form = win.down('form'),
            me = this,
            userPass = form.getForm().getValues();
        Ext.Ajax.request({
            url: 'http://localhost:8080/auth/login',
            cors: true,
            useDefaultXhrHeader: false,
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            jsonData: {
                'email': userPass.user,
                'password': userPass.pass
            },
            success: function(conn, response, options, eOpts){
                var result = Ext.JSON.decode(conn.responseText, true);
                if(result.token){
                    me.saveToken(result, userPass);
                    me.getView().destroy();
                    Ext.widget(
                        'mainview'
                    );
                }
            },
            failure: function(conn, response, options, eOpts){
                var result = Ext.JSON.decode(conn.responseText, true);
                Ext.Msg.show({
                    msg: result.message,
                    icon: Ext.Msg.INFO,
                    closable: false,
                    buttons: Ext.Msg.OK
                });
                me.clearToken();
            }
        });
    },

    onNovoLogin: function(btn, event, Opts){
        var form = btn.up('form'),
            valores = form.getForm().getValues();
        if(valores.pass !== valores.cpass){
            Ext.Msg.show({
                msg: 'Senha não confere!!!',
                icon: Ext.Msg.WARNING,
                closable: false,
                buttons: Ext.Msg.OK
            });
            return false;
        }
        Ext.Ajax.request({
            url: 'php/login/setLogin.php',
            params: {
                usuario: valores.user,
                senha: valores.pass,
                csenha: valores.cpass
            },
            success: function(conn, response, options, eOpts){
                var result = Ext.JSON.decode(conn.responseText, true);
                switch(result.msg){
                    case 'existe':
                        Ext.Msg.show({
                            msg: 'Esse login já existe!',
                            icon: Ext.Msg.WARNING,
                            closable: false,
                            buttons: Ext.Msg.OK
                        });
                        break;
                    case 'noexiste':
                        Ext.Msg.show({
                            msg: 'Login cadastrado!',
                            icon: Ext.Msg.INFO,
                            closable: false,
                            buttons: Ext.Msg.OK,
                            fn: function(btn, ev){
                                if(btn === 'ok'){
                                    form.getForm().reset();
                                }
                            }
                        });
                }
            },
            failure: function(conn, response, options, eOpts){
                var result = Ext.JSON.decode(conn.responseText, true);
                Ext.Msg.show({
                    msg: result,
                    icon: Ext.Msg.INFO,
                    closable: false,
                    buttons: Ext.Msg.OK
                });
            }
        })
    },

    saveToken: function(result, userPass){
        localStorage.setItem("user", userPass.user);
        localStorage.setItem("userid", result.userId);
        localStorage.setItem("token", result.token);
        sessionStorage.setItem("historydb", result.message);
    },

    clearToken: function(){
        localStorage.setItem("user", userPass.user);
        localStorage.setItem("userid", result.userId);
        localStorage.setItem("token", result.token);
        sessionStorage.setItem("historydb", result.message);
    }
});