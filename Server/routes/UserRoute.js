import  express  from "express";
import {

    getUser,
    createUser,
    createProduk,
    getProduk,
    createStok,
    getStok,
    createPesanan,
    getPesanan,
    getCekPesanan,
   
 
} from "../controllers/User.js";

// import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();


router.post('/user',createUser);
router.post('/produk',createProduk);
router.post('/stok',createStok);
router.post('/pesan',createPesanan);
router.post('/cek', getCekPesanan);


router.get('/user',getUser);
router.get('/produk',getProduk);
router.get('/stok',getStok);
router.get('/pesan', getPesanan);




// router.post('/user', createUser);

// router.get('/user',verifyUser,adminOnly, getUser);

// // router.get('/user', getUser);

// router.get('/user/:id',verifyUser, adminOnly, getUserById);
// // router.get('/user/:id', getUserById);



// router.patch('/user/:id',verifyUser,adminOnly, updateUser);
// // router.patch('/user/:id', updateUser);

// router.delete('/user/:id',verifyUser,adminOnly, deleteUser);
// // router.delete('/user/:id', deleteUser);

export default router; 