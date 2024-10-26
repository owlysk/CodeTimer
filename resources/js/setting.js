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

        if(typeof(setting.min_tray)!=="undefined")
        {
            if(setting.min_tray==1) $('#min_tray').prop('checked',true);
            else $('#min_tray').prop('checked',false);
        } 
        if(typeof(setting.always_top)!=="undefined")
        {
            if(setting.always_top==1) $('#always_top').prop('checked',true);
            else $('#always_top').prop('checked',false);
        }
        if(typeof(setting.use_only_token)!=="undefined")
        {
            if(setting.use_only_token==1) $('#use_only_token').prop('checked',true);
            else $('#use_only_token').prop('checked',false);
        } 

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

    var min_tray = 0;
    if($('#min_tray').prop('checked')) min_tray=1;

    var always_top = 0;
    if($('#always_top').prop('checked')) always_top=1;

    var use_only_token = 0;
    if($('#use_only_token').prop('checked')) use_only_token=1;
    
    api = new API()
    api.setCredentials(host,username,token, use_only_token)
    
    let data = JSON.stringify({
        host: host,
        username: username,
        token: token,
        min_tray: min_tray,
        always_top: always_top,
        use_only_token: use_only_token,
    });

    await Neutralino.storage.setData('setting', data )
    .then(function(status){
        setting.host = host;
        setting.username = username;
        setting.token = token;
        setting.min_tray = min_tray;
        setting.always_top = always_top;
        setting.use_only_token = use_only_token;
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