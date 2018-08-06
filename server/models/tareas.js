import mongoose from 'mongoose';

const tareaSchema = mongoose.Schema({
    title:{
        type: String,
        unique: true,
        required: [true,"El campo detítulo es requerido"]
    },
    desc: String,
    createdAt:{
        type:String,
        default: new Date
    }
    
})

const tareaModel = mongoose.model('Tarea',tareaSchema);

export default tareaModel;