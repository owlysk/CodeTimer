class API{
    constructor(){
        this.loadCredentials()
    }

    loadCredentials(){
        this.host = "";
        this.username = "";
        this.token = "";
        this.use_only_token = "";

        if(setting)
        {
            this.host = setting.host;
            this.username = setting.username;
            this.token = setting.token;
            this.use_only_token = setting.use_only_token;
        }
        else 
        {

        }
    }
    
    setCredentials(host,username,token,use_only_token){
        this.host = host;
        this.username = username;
        this.token = token;
        this.use_only_token = setting.use_only_token;
    }

    
    async makeAPICallAsync(type,method,data){
        if(this.host=="") return false;

        var result = {};
        var headers= {};
        if(this.use_only_token)
        {
            headers = {
                'Authorization': 'Bearer ' + this.token,
            };
        }
        else
        {
            headers= {
                'X-AUTH-USER': this.username,
                'X-AUTH-TOKEN': this.token,
            };
        }

        $.ajax({
            async: false,
            url: this.host+method,
            type: type.toUpperCase(),
            crossDomain: true,
            headers: headers,
            contentType: 'application/json; charset=utf-8;',
            data: JSON.stringify(data),
            success: function(resp){
                result = resp;
            },
            error: function(xhr, status, error){
                console.log(JSON.stringify(xhr),JSON.stringify(error));
            }
        }).then(function(){
            result = ''
        })
        return result;
    }
    
    makeAPICall(type,method,data){
        if(this.host=="") return false;

        var result = {};

        var headers= {};
        if(this.use_only_token)
        {
            headers = {
                'Authorization': 'Bearer ' + this.token,
            };
        }
        else
        {
            headers= {
                'X-AUTH-USER': this.username,
                'X-AUTH-TOKEN': this.token,
            };
        }

        $.ajax({
            async: false,
            url: this.host+method,
            type: type.toUpperCase(),
            crossDomain: true,
            headers: headers,
            contentType: 'application/json; charset=utf-8;',
            data: JSON.stringify(data),
            success: function(resp){
                result = resp;
            },
            error: function(xhr, status, error){
                console.log(JSON.stringify(xhr),JSON.stringify(error));
            }
        }).then(function(){
            result = ''
        })
        return result;
    }
    
    testConnection(){
        if(this.host=="") return false;
        
        var ret = '';
        var result = this.makeAPICall("get","/api/version")
        if(typeof(result.version)!=="undefined") ret = result.version;
        return ret;
    }

}