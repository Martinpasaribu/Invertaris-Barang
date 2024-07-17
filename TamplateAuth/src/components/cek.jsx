import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, reset } from "../features/authSlice";
import Layout from '../app/Layout/Layout';
import { BASE_URL } from '../Url';
import axios from 'axios';
import moment from 'moment'; // Import moment jika belum diimpor

const Cek = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    const [kota, setKota] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        // datanya();
    }, []);

    const SimpanData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/cek`, {
                kota: kota,
                startDate: startDate,
                endDate: endDate // Kirim startDate dan endDate ke server
            });
            setData(response.data); // Simpan data yang diterima dari server ke state
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                alert(error.response.data.msg);
            } else {
                alert('Terjadi kesalahan dalam memproses permintaan.');
            }
        }
    };

    const Pulang = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
    }, [isError, navigate]);

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <Layout>
            <div className='flex flex-col gap-8'>
                <div className='space-y-5'>
                    <form onSubmit={SimpanData} className='flex flex-col gap-y-10 mx-4 bg-white text-xl text-ijoku font-bold'>
                        <div className="flex flex-col gap-y-2">
                            <label className="label"> Kota </label>
                            <div className="">
                                <div className="select is-fullwidth">
                                    <select value={kota} onChange={(e) => setKota(e.target.value)} className='rounded border-solid border-2 border-ijo3'>
                                        <option value=""></option>
                                        <option value="Jakarta">Jakarta</option>
                                        <option value="Bandung">Bandung</option>
                                        <option value="Bekasi"> Bekasi</option>
                                        <option value="Bogor"> Bogor</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-5">
                            <label className="label has-text-danger"> Tanggal Awal </label>
                            <div className="h-10">
                                <input
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    className="w-full h-10 rounded-md border-solid border-2 border-ijo3 pl-2"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-5">
                            <label className="label has-text-danger"> Tanggal Akhir </label>
                            <div className="h-10">
                                <input
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    className="w-full h-10 rounded-md border-solid border-2 border-ijo3 pl-2"
                                />
                            </div>
                        </div>

                        <div className=" flex mb-5 w-full justify-center items-center h-10 text-white my-4">
                            <div className=" w-[7rem] bg-ijo2 rounded">
                                <button type='submit' className="mx-5 my-2 "> Simpan</button>
                            </div>
                        </div>

                    </form>

                    <div className='space-y-5'>
                        <h1 className='text-center bg-blue text-white font-bold py-2'> Data Penjualan </h1>
                        <div className=''>
                            <div className='grid grid-cols-6'>
                                <h1>No</h1>
                                <h1>Customer</h1>
                                <h1>Produk</h1>
                                <h1>Jumlah</h1>
                                <h1>Harga</h1>
                                <h1>Tgl_masuk</h1>
                            </div>
                            {data && data.map((file, index) => (
                                <div key={index} className='grid grid-cols-6'>
                                    <h1>{index + 1}</h1>
                                    <h1>{file.idcustomer.nama}</h1>
                                    <h1>{file.idproduk.nama}</h1>
                                    <h1>{file.jumlah}</h1>
                                    <h1>{file.idproduk.harga}</h1>
                                    <h1>{moment(file.time).format('DD MMMM YYYY')}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Cek;
