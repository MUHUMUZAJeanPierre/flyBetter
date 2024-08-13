import mongoose from 'mongoose';

const contactModel  = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
})
const ContactShema = mongoose.model('Contact', contactModel);
export default ContactShema