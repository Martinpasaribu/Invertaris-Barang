import mongoose, { Schema, mongo } from "mongoose";
import { v4 as uuidv4 } from 'uuid';



const custumer = new Schema({
    uuid: { type: String, default: () => uuidv4(), required: true, unique: true },
    nama:  { type: String, default: null },
    alamat: { type: String, default: null },
    kota: { type: String, default: null },
    waktu: { type: Date, default: Date.now },

});
export const CustomerModel = mongoose.model('Custumer', custumer, 'Custumer');


const produk = new Schema({
    uuid: { type: String, default: () => uuidv4(), required: true, unique: true },
    nama:  { type: String, default: null },
    harga: { type: String, default: null },
    deskripsi: { type: String, default: null },
    waktu: { type: Date, default: Date.now },

});

export const ProdukModel = mongoose.model('Produk', produk, 'Produk');


const stok = new Schema({
    uuid: { type: String, default: () => uuidv4(), required: true, unique: true },
    stok: { type: Number, default: null },
    idproduk: { type: String, ref: 'Produk' }, // Ubah dari ObjectId ke String
    waktu: { type: Date, default: Date.now },
});

export const StokModel = mongoose.model('Stok', stok, 'Stok');



const pesanan = new Schema({

    uuid: { type: String, default: () => uuidv4(), required: true, unique: true },
    idcustomer: { type: String, ref: 'Custumer' }, 
    idproduk: { type: String, ref: 'Produk' },  
    jumlah: { type: Number, default: null },
    time:  { type: Date, default: null },
    waktu: { type: Date, default: Date.now },

});

export const PesananModel = mongoose.model('Pesanan', pesanan, 'Pesanan');


















const userSchema = new Schema({
    uuid: {type:String, default:()=> uuidv4(), required:true, unique:true},
    firstname: { type: String, default: null },
    laststname: { type: String, default: null },
    email: String,
    password: String,
    foto: { type: String, default: null },
    company: { type: String, default: null },
    keterangan: { type: String, default: null },
    waktu: { type: Date, default: Date.now }
});

export const UserModel = mongoose.model('User', userSchema, 'User');
