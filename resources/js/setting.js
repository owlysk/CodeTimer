function testConnection(){
    var host = $('#host').val();
    var username = $('#username').val();
    var token = $('#token').val();

    api = new API()
    api.setCredentials(host,username,token)
    result = api.testConnection()

    if(result!="")
    {
        Neutralino.os.showMessageBox("Test connection", "Connection is ok\nVersion: " + result)
    }
    else 
    {
        Neutralino.os.showMessageBox("Test connection","Connection is invalid\nError: " + result)
    }

    return result;
}



function renderSettings(){
    loadSettings().then(function(setting){
        $('#host').val(setting.host);
        $('#username').val(setting.username);
        $('#token').val(setting.token);
    }).catch(function(error){
        if(debug) console.log('error',error)
    });

    $('.app-version').text(NL_APPVERSION)
    
}

//toto musime presunut do app.js
async function saveSetting(){
    //openLoadingDialog();

    var host = $('#host').val();
    var username = $('#username').val();
    var token = $('#token').val();
    
    api = new API()
    api.setCredentials(host,username,token)
    
    let data = JSON.stringify({
        host: host,
        username: username,
        token: token
    });

    await Neutralino.storage.setData('setting', data )
    .then(function(status){
        setting.host = host;
        setting.username = username;
        setting.token = token;
        refreshCache();

        Neutralino.os.showMessageBox("Setting", "Settings saved!")
    })
    .catch(function(error){
    });

    
    //closeLoadingDialog();

    result = true;
    return result;
}

init().then(()=>{
    renderSettings();
})