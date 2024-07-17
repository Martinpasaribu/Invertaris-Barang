import React, {  useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import { LogOut, reset} from "../features/authSlice";
import Layout from '../app/Layout/Layout';
import { BASE_URL } from '../Url';
import axios from 'axios';
import moment from 'moment';

const Data = () => {

    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError} = useSelector((state => state.auth));



    const [ dataku, setData ] = useState ('')
    const [ produk, setProduk] = useState ('')
    const [ stok, setStok] = useState ('')
    const [ pesan, setPesan] = useState ('')

    useEffect (() => {
        datanya();
        getProduk();
        getStok();
        getPesanan();
    }, [])

    const datanya = async () => {
        try {
            const data = await axios.get(`${BASE_URL}/user`)
            setData(data.data)
            //console.log('stok',dataku)
        } catch (error) {
            console.error('Error fatch stok kursi', error) // jangan lupa kasih errorr
        }
    }

    const getProduk = async () => {
        try {
            const data = await axios.get(`${BASE_URL}/produk`)
            setProduk(data.data)
            //console.log('stok',produk)
        } catch (error) {
            console.error('Error fatch stok kursi', error) // jangan lupa kasih errorr
        }
    }


    const getStok = async () => {
        try {
            const data = await axios.get(`${BASE_URL}/stok`)
            setStok(data.data)
            //console.log('stok',produk)
        } catch (error) {
            console.error('Error fatch stok ', error) // jangan lupa kasih errorr
        }
    }

    
    const getPesanan = async () => {
        try {
            const data = await axios.get(`${BASE_URL}/pesan`)
            setPesan(data.data)
            //console.log('stok',produk)
        } catch (error) {
            console.error('Error fatch stok ', error) // jangan lupa kasih errorr
        }
    }

    // useEffect(()=>{
    //     dispatch(getMe());
    // }, [dispatch]);
    

    const Pulang = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };

    useEffect(()=>{
        if(isError){
            navigate("/");
        }
    }, [isError, navigate]);


    // Fungsi untuk memformat waktu 1
    const ubah = (waktu) => {
        return moment(waktu).format('DD MMMM YYYY'); // Format tanggal dengan moment.js
    }

    // Fungsi untuk memformat waktu 2
    const ubah2 = (time) => {
        return moment(time).format('DD MMMM YYYY'); // Format tanggal dengan moment.js
    }

  return (

    <Layout>

        <div className='flex flex-col gap-8'>

        <div  className='space-y-5'>
            <h1 className='text-center bg-blue text-white font-bold py-2' > Data Customer </h1>
        
            <div className=''>
            
                <div className='grid grid-cols-4'>
                    <h1>No</h1>
                    <h1>Nama</h1>
                    <h1>Alamat</h1>
                    <h1>Kota</h1>
                </div>
                { dataku && dataku.map((file, index) => (

                <div key={index} className='grid grid-cols-4'>
                    <h1>{index + 1}</h1>
                    <h1>{file.nama}</h1>
                    <h1>{file.alamat}</h1>
                    <h1>{file.kota}</h1>
                </div>
                ))}

            </div>

        </div>

        <div className='space-y-5'>
            <h1 className='text-center bg-blue text-white font-bold py-2' > Data Produk </h1>
        
            <div className=''>
            
                <div className='grid grid-cols-4'>
                    <h1>No</h1>
                    <h1>Nama</h1>
                    <h1>Harga</h1>
                    <h1>Des</h1>
                </div>
                { produk && produk.map((file, index) => (

                <div key={index} className='grid grid-cols-4'>
                    <h1>{index + 1}</h1>
                    <h1>{file.nama}</h1>
                    <h1>{file.harga}</h1>
                    <h1>{file.deskripsi}</h1>
           
                </div>
                ))}

            </div>

        </div>        
        
        <div className='space-y-5'>


        <div className='space-y-5'>
            <h1 className='text-center bg-blue text-white font-bold py-2'> Data Stok </h1>

            <div className=''>
                <div className='grid grid-cols-4'>
                    <h1>No</h1>
                    <h1>Stok</h1>
                    <h1>ProdukId</h1>
                    <h1>Tgl_masuk</h1>
                </div>
                {stok && stok.map((file, index) => (
                    <div key={index} className='grid grid-cols-4'>
                        <h1>{index + 1}</h1>
                        <h1>{file.stok}</h1>
                        <h1>{file.idproduk.nama}</h1>
                        <h1>{ubah(file.waktu)}</h1>
                    </div>
                ))}
            </div>

            <div className='space-y-5'>
                <h1 className='text-center bg-blue text-white font-bold py-2'> Data Penjualan </h1>
                <div className=''>
                    <div className='grid grid-cols-7'>
                        <h1>No</h1>
                        <h1>Customer</h1>
                        <h1>Produk</h1>
                        <h1>Jumlah</h1>
                        <h1>Harga</h1>
                        <h1>Total</h1>
                        <h1>Tgl_Transaksi</h1>
                    </div>
                    {pesan && pesan.map((file, index) => (
                        <div key={index} className='grid grid-cols-7'>
                            <h1>{index + 1}</h1>
                            <h1>{file.idcustomer.nama}</h1>
                            <h1>{file.idproduk.nama}</h1>
                            <h1>{file.jumlah}</h1>
                            <h1>{file.idproduk.harga}</h1>
                            <h1>{file.jumlah * file.idproduk.harga}</h1>
                            <h1>{ubah2(file.time)}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        </div>

        </div>

    </Layout>

  )
}

export default Data