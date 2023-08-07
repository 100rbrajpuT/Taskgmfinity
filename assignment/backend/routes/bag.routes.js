const {Router} = require("express");

const bagsController =  Router();
const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');
const {BagsModel} = require("../models/BagModel")


bagsController.get("/",async (req, res)=>{
    
    const notes =  await BagsModel.find({userId: req.body.userId})
    
    res.send(notes)
    
})

bagsController.post("/create", async(req, res)=>{
    const {id, title, image_url, year,type, userId } = req.body;
    const bag = new BagsModel({
        id, 
        title,
        image_url,
        year,
        type,
        userId
    })
    try{
        await bag.save()
        res.send("bag created")
    }
    catch(err){
        console.log(err)
        res.send("something went wrong")
    }    
})

bagsController.delete("/delete/:noteId", async(req, res)=>{
    const {noteId} = req.params
    const deletedNote = await BagsModel.findOneAndDelete({id: noteId, userId: req.body.userId})
    if(deletedNote){
        res.send("deleted")
    }
    else{
        res.send("couldn't delete")
    }    
})

bagsController.patch("/edit/:noteId", async(req, res)=>{
    const {noteId} = req.params
    const deletedNote = await BagsModel.findOneAndUpdate({_id: noteId, userId: req.body.userId},req.body)
    if(deletedNote){
        res.send("updated")
    }
    else{
        res.send("couldn't update")
    }    
})

    
    

module.exports = {
    bagsController
}