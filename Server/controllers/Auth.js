import { UserModel } from "../models/FormsModel.js";
import argon2 from "argon2";

    export const Login = async (req, res) =>{
        const user = await UserModel.findOne({ email: req.body.email });

        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
        const match = await argon2.verify(user.password, req.body.password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});

        req.session.userid = user.uuid;

        const coki = req.session.userid;
        const uuid = user.uuid;
        const name = user.firstname;
        const email = user.email;
        const company = user.company;
        // const role = user.role;
        
        res.status(200).json({msg:"Berhasil login",coki,uuid, name, email, company})

    }

export const Me = async (req, res) =>{
    if(!req.session.userid){
        return res.status(401).json({msg: "Mohon login session anda empty"});
    }
    const user = await UserModel.findOne(
        {uuid: req.session.userid},
        {
            uuid:true,
            firstname:true,
            email:true,
           
        }

    );
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}
