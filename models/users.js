const mongoose=require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    first_name:{
        type: String,
        required: true
    },

    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true
        
    },

    latitude:{
        type: SchemaTypes.Double,
        
    },
    longitude:{
        type: SchemaTypes.Double,
        
    },
    password:{
        type: String,
        reqruired: true
    },
    socket_id:{
        type: String,
    }

})

module.exports=mongoose.model('users',userSchema)