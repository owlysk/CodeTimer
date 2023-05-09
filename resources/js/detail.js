var urlParams = new URLSearchParams(window.location.search);
init().then(()=>{
    if(urlParams.has('timesheet'))
    {
        itemId = urlParams.get('timesheet');
        loadItem()

    }
    else
    {
        renderNewItem()
    }
    
});

function loadItem(){
    var api = new API();
    api.makeAPICallAsync("get","/api/timesheets/"+itemId).then((item)=>{
        if(debug) console.log('item', item);
        renderItem(item);

        if(urlParams.has('active'))
        {
            renderActive();
        }
    });
    
}

function renderItem(item){
    
    var timeFrom = formatTime(item.begin);
    $('#time_from').val(timeFrom)
    var timeTo = formatTime(item.end);
    $('#time_to').val(timeTo)

    var dateFrom = formatDate(item.begin)
    $('#date').val(dateFrom)

    var totalDuration = formatDuration(item.duration);
    $('#time_total').val(totalDuration);

    $('#desc').val(item.description);


    renderItemProjects();
    renderItemActivities();

    $('#projectSelect').val(item.project)
    $('#activitySelect').val(item.activity)
}

function renderActive(){
    $('#time_total').val('');
    $('#time_total').attr('readonly','readonly');
    $('#time_to').val('');
    $('#time_to').attr('readonly','readonly');
    $('.delete-item').remove();
}

function renderItemProjects(){
    htmlData = ``;
    cache.projects.forEach(function(item,key){
        htmlData+=`
            <option value="${item.id}">${item.name}</option>
        `;
    });
    
    $('#projectSelect').html(htmlData);
}

function renderItemActivities(){
    htmlData = ``;
    cache.activities.forEach(function(item,key){
        htmlData+=`
            <option value="${item.id}">${item.name}</option>
        `;
    });
    
    $('#activitySelect').html(htmlData);
}

function deleteItem(){

    openLoadingDialog();
    var button = Neutralino.os.showMessageBox('Confirm','Are you sure you want to delete?','YES_NO_CANCEL', 'QUESTION')
    .then((state)=>{
        if(debug) console.log('button state',state)
        if(state=="YES")
        {
            var api = new API()
            var resp = api.makeAPICall('delete','/api/timesheets/'+itemId);
            window.location.href='index.html'
        }
        closeLoadingDialog();
    });
    
}


function saveItem(){

    openLoadingDialog();

    if(typeof(itemId)!=="undefined")
    {
        
        data = {};    
        var dateString = $('#date').val()+' '+$('#time_from').val();
        data.begin = moment(dateString, "DD.MM.YYYY HH:mm:ss").format()

        if(!urlParams.has('active'))
        {
            var dateString = $('#date').val()+' '+$('#time_to').val();
            data.end = moment(dateString, "DD.MM.YYYY HH:mm:ss").format()
        }
        

        data.description = $('#desc').val()
        data.project = $('#projectSelect').val()
        data.activity = $('#activitySelect').val()

        var api = new API();
        var resp = api.makeAPICall("patch","/api/timesheets/"+itemId, data)
        if(debug) console.log('api Response',resp)
        
    }
    else
    {
        data = {};    
        var dateString = $('#date').val()+' '+$('#time_from').val();
        data.begin = moment(dateString, "DD.MM.YYYY HH:mm:ss").format()

        data.description = $('#desc').val()
        data.project = $('#projectSelect').val()
        data.activity = $('#activitySelect').val()

        var api = new API();
        var resp = api.makeAPICall("post","/api/timesheets", data)
        if(debug) console.log('api Response',resp)
    }

    closeLoadingDialog();

    window.location.href='index.html';

}

function renderNewItem(){
    var desc = '';
    if(urlParams.has('description')) desc = urlParams.get('description');
     
    $('#desc').val(desc);
    $('#date').val(moment().format("DD.MM.YYYY"))
    $('#time_from').val(moment().format("HH:mm:ss"))
    $('#time_to,#time_total').val('');

    renderItemProjects();
    renderItemActivities();

    $('.delete-item').remove();
    $('.save-item .text').text('Start');
}
