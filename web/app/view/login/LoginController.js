Ext.define('hdb.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.loginviewctrl',
    requires: [
        'hdb.config.Config',
    ],
    onSignin: function(btn, event, Opts){
        var win = btn.up('window'),
            form = win.down('form'),
            me = this,
            values = form.getForm().getValues();
        Ext.Ajax.request({
            url: hdb.config.onlogin,
            cors: true,
            useDefaultXhrHeader: false,
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            jsonData: {
                'username': values.username,
                'password': values.password
            },
            success: function(conn, response, options, eOpts){
                var result = Ext.JSON.decode(conn.responseText, true);
                if(result.token){
                    me.saveToken(result, values);
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

    onSignup: function(btn, event, Opts){
        var form = btn.up('form'),
            values = form.getForm().getValues();
        Ext.Ajax.request({
            url: hdb.config.signup,
            cors: true,
            method: "POST",
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            jsonData: {
                'email': values.email,
                'name': values.name,
                'surname': values.surname,
                'username': values.username,
                'password': values.password
            },
            success: function(conn, response, options, eOpts){
                var result = Ext.JSON.decode(conn.responseText, true);
                Ext.Msg.show({
                    msg: result.message,
                    icon: Ext.Msg.INFO,
                    closable: false,
                    buttons: Ext.Msg.OK,
                    fn: function(btn, ev){
                        if(btn === 'ok'){
                            form.getForm().reset();
                        }
                    }
                });
            },
            failure: function(conn, response, options, eOpts){
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

    saveToken: function(result, userPass){
        localStorage.setItem("username", userPass.username);
        localStorage.setItem("userid", result.userId);
        localStorage.setItem("token", result.token);
        sessionStorage.setItem("historydb", result.message);
    },

    clearToken: function(){
        localStorage.removeItem("username", userPass.username);
        localStorage.removeItem("userid", result.userId);
        localStorage.removeItem("token", result.token);
        sessionStorage.removeItem("historydb", result.message);
    }
});