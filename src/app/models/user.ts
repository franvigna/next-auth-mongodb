import { Schema, model, models } from 'mongoose'

//Model de user
const userSchema = new Schema({
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique:true,
        required: [true,'Email address is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    password:{
        type: String,
        required: [true,'Password is required'],
        select: false,
    },
    fullname:{
        type: String,
        required: [true,'Name is required'],
        minLength:[3,'Fullname must be at least 3 characters'],
        maxLength: [50,'Fullname must be at most 50 characters'],
    },
    role:{
        type: String,
        default: "user",
    },
});

const User = models.User || model('User',userSchema)
export default User;