import React, {  useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import { LogOut, reset} from "../features/authSlice";
import Layout from '../app/Layout/Layout';
import { BASE_URL } from '../Url';
import axios from 'axios';
import moment from 'moment';

const Buat  = () => {

    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError} = useSelector((state => state.auth));



    const [ idcustomer, setidcustomer ] = useState ('')
    const [ idproduk, setidproduk ] = useState ('')
    const [ jumlah, setjumlah ] = useState ('')
    const [ time, setTime ] = useState ('')
    const [error, setError] = useState('');


    useEffect (() => {
        // datanya();
       
    }, [])


    const SimpanData = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/pesan`, 
            {
                idcustomer:idcustomer,
                idproduk:idproduk,
                jumlah:jumlah,
                time:time

            });
            navigate("/data");

        } 
        catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                // Jika respons dari server berisi pesan kesalahan, tampilkan dalam alert
                alert(error.response.data.msg);
            } else {
                // Jika tidak ada pesan kesalahan yang spesifik, tampilkan pesan default
                alert('Terjadi kesalahan dalam memproses permintaan.');
            }
        }
    }



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


    const handleInputChange = (e) => {
        setTime(e.target.value);
    };


  return (

    <Layout>

        <div className='flex flex-col gap-8'>



        <div className='space-y-5'>
        
            <form onSubmit={SimpanData} className='flex flex-col gap-y-10 mx-4 bg-white text-xl  text-ijoku font-bold'>
                
                <div className="flex flex-col gap-y-2">
                    <label  className="label"> Produk </label>
                    <div className=" ">
                        <div className="select is-fullwidth">
                            <select value={idproduk} onChange={(e) => setidproduk(e.target.value)} className='rounded border-solid border-2 border-ijo3'>
                                <option value=""></option>
                                <option value="Buku">Buku</option>
                                <option value="Penggaris">Penggaris</option>
                                <option value="Pensil"> Pensil</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-y-5">
                    <label  className="label has-text-danger"> Customer  </label>
                    <div className=" h-10">
                        <input 
                        placeholder=' ' 
                        type="text"
                        value={idcustomer}
                        onChange={(e) => setidcustomer(e.target.value)}  
                        className='w-full h-10 rounded-md border-solid border-2 border-ijo3 pl-2   ' 
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-y-5">
                    <label  className="label has-text-danger"> Jumlah  </label>
                    <div className=" h-10">
                        <input 
                        placeholder=' ' 
                        type='number'
                        value={jumlah}
                        onChange={(e) => setjumlah(e.target.value)}  
                        className='w-full h-10 rounded-md border-solid border-2 border-ijo3 pl-2   ' 
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-y-5">
                    <label className="label has-text-danger">Waktu</label>
                    <div className="h-10">
                        <input
                            type="datetime-local"
                            value={time}
                            onChange={handleInputChange}
                            className="w-full h-10 rounded-md border-solid border-2 border-ijo3 pl-2"
                        />
                    </div>
                </div>


                <div className=" flex mb-5 w-full justify-center items-center h-10 text-white my-4">
                    <div className=" w-[7rem] bg-ijo2 rounded">
                        <button  type='submit' className="mx-5 my-2 "> Simpan</button>
                    </div>
                </div>

            </form>
    
  
</div>
        </div>

    </Layout>

  )
}

export default Buat