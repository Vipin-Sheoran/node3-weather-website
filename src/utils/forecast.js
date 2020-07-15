const request = require("request")

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&units=metric&appid=d40d5ec821d1ca9db02a80c0066178f3'
request({url,json:true},(error,{body})=>{
if(error){
    callback('unable to connect to server',undefined)
}
else if(body.error){
    callback('please enter valid details',undefined)
}
else{
    callback(undefined,forecastdata=body.daily[0].weather[0].description+' throughout the day. Current temperature is '+body.current.temp+' degrees. Wind speed is '+body.current.wind_speed+' m/s.'+  
    '  Highest-Temperature : '+body.daily[0].temp.max+'  Lowest-Temperature : '+body.daily[0].temp.min)
       }
})
} 
module.exports=forecast