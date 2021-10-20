const express=require('express');
const app=express();
const acotorRoutes=require('./app/routes/actor.routes')
const movieRoutes=require('./app/routes/movie.routes')
const cors=require('cors')
// parse requests of content-type - application/json
app.use(express.json());
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))
app.use('/api/actors',acotorRoutes);
app.use('/api/movies',movieRoutes);
app.use('/imgs',express.static('imgs'))

app.get("/",(req,res)=>{
    res.json({message:"Hello World"})
})
app.use(function (req, res) {
    res.status(404).send('404 not found');
});
app.listen(3000,()=>{
    console.log("server is running")
})