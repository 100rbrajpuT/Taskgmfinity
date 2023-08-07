const mongoose =  require("mongoose")

const bagSchema = new mongoose.Schema({
    id : {type:Number, required : true},
    title : {type: String, required : true},
    image_url : {type: String, required : true},
    year : {type: String, required : true},
    type : {type: String, required : true},
    userId : {type: String, required : true}
})

const BagsModel = mongoose.model("bag", bagSchema)

module.exports = {
    BagsModel
}