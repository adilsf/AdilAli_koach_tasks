const path=require('path')
const http=require('http')
const express=require('express')
const app = express()
const socketio=require('socket.io')

const publicDirectoryPath=path.join(__dirname,'../public')
const server=http.createServer(app)

const io=socketio(server)
const {generateMessage, generateLocationMessage}=require('./utils/messages')
app.use(express.static(publicDirectoryPath))


const {addUser,removeUser,getUser,getUSerInRoom}= require('./utils/users')

let message='welocme!'

io.on('connection',(socket)=>{
    
    console.log('new websocket is connected')    
    
    socket.on('join',({username,room},callback)=>{
        const {error,user} = addUser({id:socket.id,username,room})
        if (error) {
           return callback(error)
        }

        socket.join(user.room)

        socket.emit('message',generateMessage('admin',message))
        socket.broadcast.to(user.room).emit('message',generateMessage('admin',`${user.username} has joined`))
       
        io.to(user.room).emit('roomdata',{
           room:user.room,
            users:getUSerInRoom(user.room)
        })
        callback()
    
    })
    socket.on('sendMessage',(msg,callback)=>{
        const user=getUser(socket.id)

        io.to(user.room).emit('message',generateMessage(user.username,msg))
        callback()
})

socket.on('sendLocation',(values,callback)=>{
        const user=getUser(socket.id)
        io.to(user.room).emit('locationMessage',generateLocationMessage(user.username,`https://google.com/maps?q=${values.latitude},${values.longitude}`))
    callback()
})        

socket.on('disconnect',()=>{
   const user= removeUser(socket.id)
  
   if(user)
   {
    io.to(user.room).emit('message',generateMessage(user.username,`${user.username} has left`))
    io.to(user.room).emit('roomdata',{
        room:user.room,
        users:getUSerInRoom(user.room)    
    })
}

})

})

