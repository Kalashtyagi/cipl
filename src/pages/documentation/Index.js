import React from 'react'
import Logo from '../../assets/logo.png'

const Index = () => {
    return (
        <div>
            <div className='flex flex-col'>
                <div className='flex justify-start bg-primary p-2 px-4'>
                    <img src={Logo} className='w-44 h-12' />
                </div>
                <div className='p-2'>
                    <h2 className='px-4 text-lg text-gray-800'>Upload Your Documents</h2>
                    <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-3'>
                    <div className='p-4 col-span-1 w-full'>
                        <div>
                        <p className={`text-base after:content-['*'] after:text-red-500 after:pl-1`}>Address Proof</p>
                        <label class="flex items-center px-2 py-2 border border-gray-200 rounded">
                            <span class="sr-only">Choose profile photo</span>
                            <input type="file" class="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-gray-100 file:text-gray-700
                                hover:file:bg-gray-200 cursor-pointer
                            "/>
                        </label>
                        </div>
                        <div>
                        <p className={`text-base after:content-['*'] after:text-red-500 after:pl-1`}>Any Protected Password</p>
                        
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index