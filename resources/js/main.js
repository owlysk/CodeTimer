var debug = false;

Neutralino.init();

Neutralino.events.on("windowClose", onWindowClose);

let tray = {
    icon: '/resources/icons/logo.png',
    menuItems: [
      
      {id: "open", text: "Open"},
      {id: "min", text: "Minimize"},
      {text: "-"},
      {id: "quit", text: "Quit"}
    ]
  };
Neutralino.os.setTray(tray);


function onWindowClose() {
    Neutralino.app.exit();
}



Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
function onTrayMenuItemClicked(event) {
    switch(event.detail.id) {
        case "open":
            Neutralino.window.show();
            break;
        case "min":
            Neutralino.window.minimize();
            
            break;
        case "quit":
            Neutralino.app.exit();
            break;
    }
}


async function loadSettings(){
    settingJSON = await Neutralino.storage.getData('setting');
    setting = JSON.parse(settingJSON)
    return setting;
}

var setting,cache;

async function init(){
    setting = await loadSettings();
    await initCache()

    if(debug) console.log('inited',setting,cache)
}

function openHomepage(){
    Neutralino.os.open(setting.host);
}

function openLoadingDialog(){
    $('#loadingModal').modal('show');
    if(debug) console.log('openLoadingDialog');
}

function closeLoadingDialog(){
    
    $('#loadingModal').modal('hide');
    if(debug) console.log('closeLoadingDialog');
}

function openDetail(){
    Neutralino.app.open({
        "url": "file:///"+NL_CWD+"/resources/detail.html"
    });
}