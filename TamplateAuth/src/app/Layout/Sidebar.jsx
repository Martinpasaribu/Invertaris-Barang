import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className=' flex flex-col gap-5 justify-center items-center mt-10 text-ml font-KodeMono font-bold text-white'>
    
    <Link to='/data' className='bg-hijau1 w-[10rem] h-[3rem] flex' ><h1 className='m-auto'> Data Inputan</h1></Link>
    <Link to='/cek' className='bg-hijau1 w-[10rem] h-[3rem] flex' ><h1 className='m-auto'> Cek Transaksi</h1></Link>
    <Link to='/buat' className='bg-hijau1 w-[10rem] h-[3rem] flex' ><h1 className='m-auto'> Buat Transaksi</h1></Link>
    
    
    </div>


  )
}

export default Sidebar