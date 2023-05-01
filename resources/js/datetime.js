function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('.');
}
function formatTime(date) {
    var d = new Date(date),
        m = '' + (d.getMinutes()),
        s = '' + d.getSeconds(),
        h = d.getHours();

    if (m.length < 2) 
        m = '0' + m;
    if (s.length < 2) 
        s = '0' + s;

    return [h,m,s].join(':');
}

function formatDuration(totalSec){
    var hours = Math.floor(totalSec/3600);
    var rest = (totalSec - (hours*3600));
    var minutes = Math.floor(rest/60);
    rest = (rest - (minutes*60));
    var seconds = rest;

    if(hours<10) hours=`0${hours}`;
    if(minutes<10) minutes=`0${minutes}`;
    if(seconds<10) seconds=`0${seconds}`;

    ret = `${hours}:${minutes}:${seconds}`;
    return ret;
}