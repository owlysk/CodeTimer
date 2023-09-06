var activeItemId = 0;
init().then(()=>{
    api = new API();
    if(debug) console.log('starting load elements')
})
.then(()=>{
    loadItems();    
    loadActive();
})



async function loadItems(){
    api.makeAPICallAsync("get","/api/timesheets?active=0").then((items)=>{
        if(debug) console.log('items',items)
        renderTimesheet(items)
    });
    
}


async function loadActive(){

    api.makeAPICallAsync("get", "/api/timesheets/active").then((activeItemArr)=>{
        if(debug) console.log('active',activeItemArr)
        if(activeItemArr.length) 
        {
            activeItemId = activeItemArr[0].id;
            renderActive(activeItemArr[0]);
        }
    });
    
}

var timerDuration;
async function renderActive(item){
    $('#desc').val(item.description);
    $('.start-btn').addClass('d-none');
    $('.stop-btn').removeClass('d-none');
    $('#desc').attr('readonly','readonly');
    $('#desc').attr('onclick',`window.location.href='/detail.html?timesheet=${item.id}&active=1'`);
    $('#desc').addClass('active');

    var totalSec = (moment().format('X') - moment(item.begin).format('X'));
    timerDuration = setInterval(function(){
        totalSec+=1
        stringDuration = formatDuration(totalSec)
        $('.stop-time').text(stringDuration);
    },1000);
}

async function stopItem(){
    if(activeItemId > 0)
    {
        await api.makeAPICallAsync("patch","/api/timesheets/"+activeItemId+"/stop")
        renderInactive();
        clearInterval(timerDuration);
        await loadItems()
    }
}

function repeatItem(itemId){
    api = new API();
    var data = {};
    data.copy="all";
    var item = api.makeAPICall("patch","/api/timesheets/"+itemId+"/restart", data)
    if(item.id) 
    {
        if(debug) console.log('repeatItem', item);
        activeItemId = item.id
        renderActive(item)
    }

}

function renderInactive(){
    $('#desc').val('');
    $('#desc').removeAttr('readonly');
    $('.start-btn').removeClass('d-none');
    $('.stop-btn').addClass('d-none');
    $('.stop-time').text('00:00:00');
    $('#desc').removeAttr('onclick');
    $('#desc').removeClass('active');
}


async function renderTimesheet(data){

        var items = data;
        var list = {};
        if(items.length)
        {
            items.forEach(function(item,key){
                var date = new Date(item.end)
                var d = date.getDate();
                var m = date.getMonth() + 1;
                var y = date.getFullYear();

                var itemData = item;
                var dateFormatted = d+'.'+m+'.'+y;
                if(typeof(list[dateFormatted])==="undefined") list[dateFormatted] = [];
                list[dateFormatted].push(itemData);
                
            });

            var htmlData = ``;
            for(item of Object.entries(list)){
                
                var htmlDataItems='';
                var totalDayTime=0;

                if(item.length)
                {
                    item[1].forEach(function(listItem,listItemKey){
                        desc = listItem.description;
                        if(desc == null) desc='<span class="text-secondary fst-italic">[No description]</span>';
                        desc = desc.replaceAll("\n","<br/>");
                        desc = desc.replaceAll("\r\n","<br/>");

                        totalDayTime+=listItem.duration;

                        var durationTime = formatDuration(listItem.duration)
                        
                        htmlDataItems+=`
                            <div class="border border-1 border-dark-subtle bg-body p-3 d-inline-block w-100 mb-1">
                                <div class="item-detail d-inline-block" style="width: calc(100% - 130px);" onclick="window.location.href='/detail.html?timesheet=${listItem.id}'">
                                    <div class="item-name d-inline-block pb-2" >
                                        ${desc}
                                    </div>
                                    <!--
                                    <div class="item-customer d-block px-2">
                                    <li style="color: ${((typeof(cache._parseProjects[listItem.project])!="undefined")?cache._parseProjects[listItem.project].color:'#000')}">${((typeof(cache._parseProjects[listItem.project])!=="undefined")?cache._parseProjects[listItem.project].parentTitle:'---')}</li>
                                    </div>
                                    -->
                                    <div class="item-project d-block px-2">
                                        <li style="color: ${((typeof(cache._parseProjects[listItem.project])!="undefined")?cache._parseProjects[listItem.project].color:'#000')}">${((typeof(cache._parseProjects[listItem.project])!=="undefined")?cache._parseProjects[listItem.project].name:'---')}</li>
                                    </div>
                                    <div class="item-activity d-block px-2">
                                    <li style="color: ${((typeof(cache._parseActivities[listItem.activity])!=="undefined")?cache._parseActivities[listItem.activity].color:'#000')}">${((typeof(cache._parseActivities[listItem.activity])!=="undefined")?cache._parseActivities[listItem.activity].name:'---')}</li>
                                    </div>
                                </div>
                                <div class="item-btns d-inline-block float-end">
                                    <div class="item-total py-1 px-2 d-inline-block">
                                        ${durationTime}
                                    </div>
                                    <div class="d-none btn btn-sm btn-primary d-inline-block detail-btn">
                                        <i class="fas fa-search"></i>
                                    </div>
                                    <a href="#" class="btn btn-sm btn-primary d-inline-block repeat-btn" onclick="repeatItem(${listItem.id}); return false;">
                                        <i class="fas fa-repeat"></i>
                                    </a>
                                </div>
                            </div>`;
                            
                    });
                }
                
                htmlData+= `
                <div class="col-12 date-item">
                    <br/>
                    <div class="border border-1 border-dark-subtle bg-secondary-subtle p-1 pb-0 d-inline-block w-100">
                        <div class="date py-1 px-2 d-inline-block">
                            ${item[0]}
                        </div>
                        <div class="total py-1 px-2 d-inline-block float-end">
                            Total: ${formatDuration(totalDayTime)}
                        </div>
                `;
                htmlData+=htmlDataItems;
                htmlData+=`
                    </div>
                </div>`;
               
            }
            $('.list-data').html(htmlData)
        }
        else
        {
            $('.list-data').html('')
        }
}
