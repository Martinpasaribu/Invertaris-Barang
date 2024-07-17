import React from 'react'
import Layout from '../app/Layout/Layout';



const Monitoring = () => {
  return (
    <Layout>
        <div>Monitoring</div>
        <div className='grid grid-cols-2'>
            <div className='col-span-2'>
                <figure className='flex justify-center items-center w-full h-[8rem] bg-gray-200'>
                    <div className='w-1/2 h-full'>
                        <h1>Selamat datang, Admin</h1>
                    </div>
                    <div className=' w-1/2 h-full grid grid-cols-4'>
                        <div>j</div>
                        <div>k</div>
                        <div>l</div>
                        <div>m</div>
                    </div>
                </figure>
            </div>
            <div className='cols-span-1'>b</div>
            <div className='cols-span-1'>c</div>
        </div>
    </Layout>

  )
}

export default Monitoring