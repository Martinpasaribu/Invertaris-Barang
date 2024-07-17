import { UserModel } from "../models/FormsModel.js";


export const verifyPembeli = async (req, res, next) => {
      
    if(!req.session.userid){
        return res.status(401).json({msg: "Akses ditolak Mohon login ke akun Anda!"});
    }
    const pembeli = await UserModel.findOne({uuid: req.session.userid});

    if(!pembeli) return res.status(404).json({msg: "User Anda tidak terdaftar"});
    req.userid = pembeli._id.toString();
    req.name = pembeli.firstname;
    // req.role = pembeli.role;
    next();    
}

// FUNGSI INI ADLAH UNTUK MEMBEDDAKAN ATAU MEMBATASI KALO FUGSI USER TERBATAS AKAN ADMIN 

export const adminpembeliOnly = async (req,res,next) => {

    const user = await UserModel.findOne({ uuid: req.session.userid});
    req.role = user.role;
    if(!user) return res.status(404).json({msg: "Admin cek tidak ditemukan"});
    if(user.role !== "admin" ) return res.status(403).json({msg: "Akses Dilarang !! ( hanya untuk pembeli dan user)"});
    next();    
}