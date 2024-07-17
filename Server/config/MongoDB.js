import mongoose from "mongoose";


  export const Koneksi = mongoose.connection;

    Koneksi.on('error',(err)=>{
        console.log('MongoDB Terputus', err)
    })

    Koneksi.once('open',()=>{
        console.log(" MongoDB Terhubung")
    })
