import React, { useState } from 'react'
import Adher from './Adher'
import Pancard from './Pancard'
import Passport from './Passport'
import VoterID from './VoterID'
//import { Apartment } from '@mui/icons-material'
import Appoinment from './Appoinment'
import Salery from './Salery'
//import logo from '../../components/Image/logo192.png'
import BankStatement from './BankStatement'
import Select from 'react-select'

function Document() {

    const [document, setDocument] = useState('')
    console.log("data testing", document)
    const [address, setAddress] = useState('')
    console.log("address data", address)
    const [emloyement, setEmployement] = useState([])
    //console.log(option)
    console.log("data data", emloyement)
    return (
        <div className=''>

            <div className='flex'>
                <div className='font-semibold text-2xl flex-1'>UPLOAD YOUR DOCUMENT </div>
                {/* <div><img src={logo} className=' h-12 w-12 flex-1' /></div> */}
            </div>
            <div className='grid grid-cols-3 rounded-sm p-1 pt-8'>
                <div className="">
                    <div className="font-semibold text-sm pl-1 after:content-['*'] after:ml-0.5 after:text-red-500">DOCUMENT</div>
                    <div>
                        {/* <label for="states" className="sr-only">Choose a state</label> */}
                        <Select
                            isMulti
                            onChange={(e) => setDocument(e.map(x => x.value))} name='document' id="states"
                            options={[{ label: 'Aadhar Card', value: 'AC' }, { label: 'Voter Id', value: 'VI' }, { label: 'Passport', value: 'PP' }, { label: 'Pan Card', value: 'PC' }, { label: 'Other', value: 'OT' }]}
                        />

                    </div>
                </div>
                <div className='col-span-1 w-full px-2'>
                    <div className="">
                        <div className=" font-semibold text-sm pl-1 after:content-['*'] after:ml-0.5 after:text-red-500">ADDRESS</div>
                        <div>

                            {/* <label for="states" className="sr-only">Choose a state</label> */}
                            <Select
                                isMulti
                                onChange={(e) => setAddress(e.map(x => x.value))} id="states" name='address'
                                options={[{ label: 'Aadhar Card', value: 'ACC' }, { label: 'Voter Id', value: 'VI' }, { label: 'Passport ', value: 'PP' }, { label: 'Other', value: 'OT' }]}
                            />


                        </div>
                    </div>
                </div>
                <div className='col-span-1 w-full'>
                    <div className="">
                        <div className=" font-semibold text-sm after:content-['*'] after:ml-0.5 after:text-red-500">EMPLOYEMENT</div>
                        <div>
                            {/* <label for="states" className="sr-only ">Employement Prove</label> */}
                            <Select id="states"
                                isMulti
                                onChange={(e) => setEmployement(e.map(x => x.value))}
                                name='employmen'

                                options={[{ label: 'Offer Letter', value: 'OL' }, { label: 'appointment Letter', value: 'ED' }, { label: 'Salery Slip', value: 'DMD' }, { label: 'Letest Bank Statement', value: 'EMPD' }]}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <div className=' grid grid-cols-3 pb-2'>

                {
                    document.includes("OT") ?
                        <div className=" pt-4 bg-grey-lighter">
                            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-red-400">
                                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span className="mt-2 text-base leading-normal">UPLOAD OTHER</span>
                                <input type='file' className="hidden" />
                            </label>
                        </div>
                        : null
                }
                {
                    document.includes("AC") ?
                        < Adher /> : null
                }
                {
                    document.includes("VI") ?
                        <VoterID /> : null
                }
                {
                    document.includes("PC") ?
                        <Pancard /> : null
                }
                {
                    document.includes("PP") ?
                        <Passport /> : null
                }


            </div>
            
            <div className='grid grid-cols-3'>
                {
                    address.includes("ACC") ?
                        <Adher /> : null
                }
                {
                    address.includes("VI") ?
                        <VoterID /> : null
                }
                {
                    address.includes("PP") ?
                        <Passport /> : null
                }

                {
                    address.includes("OT") ?

                        <div className=" pt-4 bg-grey-lighter">
                            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-red-400">
                                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span className="mt-2 text-base leading-normal">UPLOAD OTHER</span>
                                <input type='file' className="hidden" />
                            </label>
                        </div>
                        : null
                }
            </div>

            <div className='grid grid-cols-3'>
                {
                    emloyement.includes("OL") ?
                        <Passport /> : null
                }

                {
                    emloyement.includes("ED") ?
                        <Appoinment /> : null
                }


                {
                    emloyement.includes("DMD") ?
                        <Salery /> : null
                }

                {
                    emloyement.includes("EMPD") ?
                        <BankStatement /> : null
                }
            </div>


            <div className=' justify-end pt-5 pl-4'>
                <button type='Submit' className=' bg-gray-800 text-white h-10 w-16 rounded-lg grid grid-cols pt-2 hover:bg-black hover:text-white'>Submit</button>
            </div>
        </div>
    )
}
export default Document;










