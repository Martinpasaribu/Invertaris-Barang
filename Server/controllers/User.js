import  { CustomerModel , PesananModel, ProdukModel, StokModel }  from "../models/FormsModel.js";
import moment from 'moment'; // Import moment.js jika belum diimpor

import argon2 from  "argon2";



export const createUser = async(req, res) =>{
    const {nama, alamat, kota} = req.body;
  
    try {
        await CustomerModel.create({
            nama: nama,
            alamat:alamat,
            kota: kota
          
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: "Error kabeh"});
    }
}

export const createProduk = async (req, res) => {
    const { nama, harga, deskripsi } = req.body;

    try {
        if (!nama || !harga || !deskripsi) {
            return res.status(400).json({ msg: "Harap isi semua field" });
        }

        await ProdukModel.create({
            nama: nama,
            harga: harga,
            deskripsi: deskripsi,
        });

        res.status(201).json({ msg: "Produk berhasil dibuat" });
    } catch (error) {
        console.error("Error saat membuat produk:", error.message);
        res.status(500).json({ msg: "Terjadi kesalahan saat membuat produk", error: error.message });
    }
}



export const createStok = async (req, res) => {
    const { stok, idproduk } = req.body;

    try {
        await StokModel.create({
            stok: stok,
            idproduk: idproduk // Gunakan langsung idproduk dari body request
        });
        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        console.error("Error creating stok:", error); // Tambahkan log kesalahan
        res.status(400).json({ msg: "Error stok", error: error.message }); // Kirim pesan kesalahan yang lebih informatif
    }
}




export const createPesanan = async (req, res) => {
    const { idcustomer, idproduk, jumlah, time } = req.body;

    try {
        // Temukan customer berdasarkan nama
        let IDC = await CustomerModel.findOne({ nama : idcustomer });
        if (!IDC) {
            return res.status(404).json({ msg: "Customer tidak ditemukan" });
        }

        // Temukan produk berdasarkan nama
        let IDP = await ProdukModel.findOne({ nama : idproduk });
        if (!IDP) {
            return res.status(404).json({ msg: "Produk tidak ditemukan" });
        }

        // Temukan stok produk berdasarkan ID produk
        let stok = await StokModel.findOne({ idproduk : IDP._id });
        if (!stok) {
            return res.status(404).json({ msg: "Stok produk tidak ditemukan" });
        }

        // Periksa apakah stok mencukupi
        if (jumlah > stok.stok) {
            return res.status(400).json({ msg: "Maaf, stok tidak mencukupi" });
        }

        // Kurangi stok berdasarkan jumlah yang diminta
        stok.stok -= jumlah;
        await stok.save(); // Simpan perubahan stok ke database

        // Buat pesanan baru
        await PesananModel.create({
            idcustomer: IDC._id,
            idproduk: IDP._id,
            jumlah: jumlah,
            time: time
        });

        // Kirim respons berhasil
        res.status(201).json({ msg: "Pesanan berhasil dibuat" });
    } catch (error) {
        console.error("Error creating pesanan:", error);
        res.status(500).json({ msg: "Terjadi kesalahan saat membuat pesanan", error: error.message }); // erro punya properti sendiri layyaknya objek
    }
};


// =========================  GET =============================

export const getUser = async(req, res) =>
    {
        try {
            const users = await CustomerModel.find({}); // Mengambil hanya UUID pengguna
            res.status(200).json(users); // Mengembalikan array UUID pengguna
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }
    
    

    export const getProduk = async(req, res) =>
        {
            try {
                const produk = await ProdukModel.find({}); // Mengambil hanya UUID pengguna
                res.status(200).json(produk); // Mengembalikan array UUID pengguna
            } catch (error) {
                res.status(500).json({msg: error.message});
            }
        }
        
        
        export const getStok = async (req, res) => {
            try {
                

                const response = await StokModel.find({})
                    .select('uuid stok idproduk waktu')
                    .populate({
                        path: 'idproduk',
                        select: '_id nama harga',
                        // model: 'Produk', 
                        // match: {} 
                    });
        
                //console.log("Response:", response); // Log untuk debugging
        
                res.status(200).json(response);
            } catch (error) {
                console.error("Error fetching stok:", error); // Log kesalahan lebih rinci
                res.status(500).json({ msg: error.message });
            }
        }
        
        
    
        export const getPesanan = async (req, res) => {
            try {
                const response = await PesananModel.find({})
                    .select('uuid idproduk idcustomer jumlah waktu time')
                    .populate([
                        {
                            path: 'idproduk',
                            select: '_id nama harga',
                            // Opsional: tambahkan opsi lain seperti model atau match jika diperlukan
                        },
                        
                        {
                            path: 'idcustomer',
                            select: '_id nama kota',
                            // Opsional: tambahkan opsi lain seperti model atau match jika diperlukan
                        },
                    ]);
        
                res.status(200).json(response);
            } catch (error) {
                console.error("Error fetching pesanan:", error);
                res.status(500).json({ msg: error.message });
            }
        }
        
        export const getCekPesanan = async (req, res) => {
            try {
                const { kota, startDate, endDate } = req.body;
        
                // Ubah format tanggal dari input (jika diperlukan)
                const formattedStartDate = moment(startDate).startOf('day'); // Awal hari
                const formattedEndDate = moment(endDate).endOf('day'); // Akhir hari
        
                let query = {
                    time: {
                        $gte: formattedStartDate.toDate(), // Menggunakan $gte untuk tanggal awal
                        $lte: formattedEndDate.toDate() // Menggunakan $lte untuk tanggal akhir
                    }
                };
        
                console.log('Filter kota:', kota);
        
                const response = await PesananModel.find(query)
                    .select('uuid idproduk idcustomer jumlah waktu time')
                    .populate({
                        path: 'idproduk',
                        select: '_id nama harga'
                    })
                    .populate({
                        path: 'idcustomer',
                        select: '_id nama kota',
                        match: kota ? { kota: kota } : {}
                    });
        
                // Filter ulang hasil setelah populasi untuk memastikan hanya menyertakan dokumen dengan kota yang sesuai
                const filteredResponse = response.filter(pesanan => pesanan.idcustomer);
        
                res.status(200).json(filteredResponse);
            } catch (error) {
                console.error("Error fetching pesanan:", error);
                res.status(500).json({ msg: error.message });
            }
        };


    
    export const getUserById = async (req, res) =>
    {
        const userId = req.params.id
        try {
            const response = await UserModel.findOne( 
                {uuid:userId},
                    { 
                    _id: true,
                    uuid:true,
                    name: true, 
                    email: true, 
                    role: true
            }  // Memilih kolom yang ingin dikembalikan          
            );
    
            res.status(201).json(response); 
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    

export const updateUser = async (req, res) =>
{
    const userId = req.params.id
    const user = await UserModel.findOne( {uuid: userId});
    

    if(!user) return res.status(404).json({msg: " User Tidak ditemukan"})
    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;

    if(password === "" || password === null){
        hashPassword = user.password
    }else {
        hashPassword = await argon2.hash(password);

    }
    if (password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"})

    try {
        const result = await UserModel.updateOne(
            { uuid:userId},
            { $set:
                {
                    name:name,
                    email:email,
                    password:hashPassword,
                    role:role
                }                       
           }
        );
        res.status(200).json({msg: "Update Berhasil"});
    } catch (error) {
        res.status(400).json({msg: "Error kabeh"});
    }
}

export const deleteUser = async (req, res) =>
{
    const userId = req.params.id
    
    const user = await UserModel.findOne( {       
            uuid: userId       
    });
    if(!user) return res.status(404).json({msg: " User Tidak ditemukan"})

    try {
        await UserModel.deleteOne(
        {           
                uuid:userId          
        });
        res.status(200).json({msg: "User Dihapus"});
    } catch (error) {
        res.status(400).json({msg: "Error kabeh"});
    }

}