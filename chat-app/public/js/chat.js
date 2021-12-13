

const socket=io()
//elements
$messageForm=document.querySelector('#message-form')
$enterMessage=$messageForm.querySelector('input')
$sendMessage=$messageForm.querySelector('button')
$sendLocation=document.querySelector('#shareLocation')
$messages=document.querySelector('#messages')

// templates
messageTemplates=document.querySelector('#message-templates').innerHTML
locationTemplates=document.querySelector('#location-share').innerHTML
sidebarTemplate = document.querySelector('#sidebar-template').innerHTML
//options
const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true})


const autoscroll =()=>{
    // getting new message
    const $newmessage=$messages.lastElementChild
    
    //height of new message
    const newMessageStyle= getComputedStyle($newmessage)
    const newMessageMargin = parseInt(newMessageStyle.marginBottom)
    const newMessageHeight=$newmessage.offsetHeight + newMessageMargin

    //visible height
    const visibleHeight=$messages.offsetHeight

    //height of message container
    const containerHeight=$messages.scrollHeight

    // how far i have scrolled
    const scrolloffset =$messages.scrollTop +visibleHeight

    if (containerHeight-newMessageHeight<=scrolloffset) {
        $messages.scrollTop=$messages.scrollHeight
    }
}
socket.on('message',(message)=>{
    console.log(message)
    const html=Mustache.render(messageTemplates,{
        username:message.username,
        "message":message.text,
        "createdAt":moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
})

socket.on('locationMessage',(message)=>{
    console.log(message)
    const html=Mustache.render(locationTemplates,{
        username:message.username,
        'val':message.val,
        'createdAt':moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll()    
})

    socket.on('roomdata',({users,room})=>{
        console.log(room)
        console.log(users)
        const html=Mustache.render(sidebarTemplate,{
            users,
            room
        })
        document.querySelector('#sidebar').innerHTML=html
    })

$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const msg=e.target.elements.message.value
  $sendMessage.setAttribute('disabled','disabled')
      socket.emit('sendMessage',msg,(error)=>{
        $sendMessage.removeAttribute('disabled')
        $enterMessage.value=''
        $enterMessage.focus()

        if (error) {
            return console.log(error)
        }

        console.log('message has been deliverd!!')
    })
})


$sendLocation.addEventListener('click',()=>{
    if (!navigator.geolocation) {
        return alert('please update your browser!!')
    }
    $sendLocation.setAttribute('disabled','disablebutton')

    navigator.geolocation.getCurrentPosition((position)=>{
        const values={
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        }

        socket.emit('sendLocation',values,()=>{
                    $sendLocation.removeAttribute('disabled')
            console.log('location shared!!')
            
            
        })
})

})
socket.emit('join',{username,room},(error)=>{
    if(error){
    alert(error)
    location.href='/'    
    }
})