const express= require('express')
const mongoose=require('mongoose')
const shortUrl=require('./models/shortUrl')
const app=express()

mongoose.connect('mongodb://localhost/urlShortener')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/shortUrls',async (req,res)=>{
    await shortUrl.create({full:req.body.fullUrl})
    res.redirect('/')
})



app.listen(process.env.PORT || 5000);
