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

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
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
