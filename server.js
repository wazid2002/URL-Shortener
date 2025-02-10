const express= require('express')
const mongoose=require('mongoose')
const shortUrl=require('./models/shortUrl')
const app=express()

mongoose.connect('mongodb://localhost/urlShortener')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}));

app.get('/',async (req,res)=>{
    const shortUrls = await shortUrl.find()
    res.render('index',{shortUrls:shortUrls})
})

app.post('/shortUrls',async (req,res)=>{
    await shortUrl.create({full:req.body.fullUrl})

    res.redirect('/')
})

app.get('/:shortUrl',async(req,res)=>{
    const shortUrl= await shortUrl.findOne({short:req.params.shortUrl})
    if(shortUrl == null) return res.sendStatus(404)

    shortUrl.click++
    shortUrl.save()

    res.redirect(shortUrl.full)
})



app.listen(process.env.PORT || 5000);
