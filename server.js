const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:password@cluster0.h3ya5.mongodb.net/database", { useUnifiedTopology: true })

const projesSchema ={
    adisoyadi: String,
    projeadi: String,
    uniadi: String,
    yil: String
}

const Proje = mongoose.model("Proje", projesSchema);


app.get('/projes', function(req, res) {
    Proje.find().then(projes => res.json(projes))
})

app.post('/yeniproje', function(req, res){
    const projeadi = req.body.projeadi;
    const adisoyadi = req.body.adisoyadi;
    const uniadi = req.body.uniadi;
    const yil = req.body.yil;

    const yeniProje = new Proje({
        projeadi,
        adisoyadi,
        uniadi,
        yil
    });

    yeniProje.save();
})

app.delete('/sil/:id', function(req, res) {
    const id = req.params.id;
    Proje.findByIdAndDelete({_id: id}, function(err) {
        if(!err) {
            console.log("proje silindi");
        } else {
            console.log(err);
        }
    })
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


app.listen(port, function() {
    console.log("express is running");
})