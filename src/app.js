const path=require('path')
const express=require('express')
const hbs=require('hbs')
const { title } = require('process')
const app=express()

const port=process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define path for express config
const publicdir=path.join(__dirname,'../public')   
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//sets handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicdir))      //index.html is a special name


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Sheoran Empire'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Sheoran Empire'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'this is for helping users',
        title:'Help Page',
        name:'Sheoran Empire'
    }) 
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
      return  res.send({
          error:'You must provide an address'})
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
           return res.send({error})
        }
       
            
        forecast(latitude,longitude,(error,{forecastdata,highest,lowest})=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast:forecastdata,
                location,
                highest,
                lowest,
    
                address:req.query.address
            })
        })
        })
    })
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'write something in search bar'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:404,
        errormessage:'help article not found',
        name:'vipin sheoran'

    })
})
app.get('*',(req, res)=>{
res.render('404',{
    title:404,
    errormessage:'page not found',
    name:'vipin sheoran'
})             //* is used to locate files other than which we built
})




// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'vipin',
//         age:20
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('about page')
// })
// app.get('/weather',(req,res)=>{
//     res.send('weather report')
// })

//app.com
//app.com/help
//app.com/about

app.listen(port,()=>{
    console.log('server is up on port '+port)
})