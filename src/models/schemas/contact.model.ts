import {Schema, model} from "mongoose";

interface IContact {
    name: string;
    address: string;
    email: string;
    phone: string
}

const contactSchema = new Schema<IContact>({
    name: String,
    address: String,
    email: String,
    phone: String
})
   
   
   
export const Contact = model<IContact>('Contact', contactSchema);