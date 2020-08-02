// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
// console.log(data)
//     })
// })


const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2') 
const messagethree=document.querySelector('#msg-3')
const messagefour=document.querySelector('#msg-4')

document.querySelector('#send-location').addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      
        messageone.textContent=position.coords.latitude,
        messagetwo.textContent=position.coords.longitude
       //)
          })
})

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()   //to prevent behaviour of browser which it shows during refreshing
    const location=search.value    //value gives us the value is is written in input box
    messageone.textContent='loading...'
    messagetwo.textContent=''
    messagethree.textContent=''
    messagefour.textContent=''


    fetch('/weather?address='+location).then((response)=>{ 
    response.json().then((data)=>{
        if(data.error){
            messageone.textContent=data.error
        }else{
            messageone.textContent=data.location
            messagetwo.textContent=data.forecast
            messagethree.textContent=data.highest
            messagefour.textContent=data.lowest
        }
    })
})
})
