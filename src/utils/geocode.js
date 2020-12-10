const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2hlb3JhbnZpcGluMjkxMCIsImEiOiJja2NnOWQ5dTYwcG9hMnpubmIxZHVvbnB3In0.3iMsFaj3eqJuOmynV2OS1A&limit=1'
request({url,json:true},(error,{body})=>{
    if(error){
        callback('unable to connect to server',undefined)
    }
    else if(body.features.length === 0){
        callback('unable to find the location,try something else',undefined) 
    }else{
        callback(undefined,{
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name 
        })
    }
   
    
})
}
module.exports=geocode 