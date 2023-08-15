const WebSocket =  require('ws').Server
var handlers ={}
function send(ws,msg){
    console.log('Response to Message: '+msg)
    ws.send(msg)
}
function handleMsg(obj){
    return handlers[obj.type](obj.clientId,...obj.params)
}
var wmc ={
    on:(msg,fn)=>{handlers[msg] = fn;},
    create:port=>{
        //console.log(handlers)
        new WebSocket({port}).on('connection',ws=>{
            ws.on('message',msg=>{
                //console.log(this)
                msg=JSON.parse(msg)
                
                console.log('New message recived: '+JSON.stringify(msg))
                if(msg.type == '__init'){
                    send(ws,JSON.stringify({pid:new Date().getTime(),id:msg.id}))
                }else{
                    //console.log(JSON.stringify(handlers))
                    try {
                        send(ws,JSON.stringify({status:'ok',res:handleMsg(msg),id:msg.id}))
                    } catch (error) {
                        send(ws,JSON.stringify({status:'error',res:error,id:msg.id}))
                    }
                }
            })
        })
    }
}
module.exports = wmc