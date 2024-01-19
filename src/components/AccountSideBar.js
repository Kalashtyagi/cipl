 import { AnimatePresence, motion } from "framer-motion";
import logo from "../../../assets/60111.jpg";

function Sidebar({ sideBar = false, setSideBar = () => { } }) {
    return (
        <AnimatePresence>
            {sideBar && (
                <>
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{
                            x: 0
                        }}
                        exit={{
                            x: "100%"
                        }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="fixed z-[60] bg-gray-100   text-white shadow-lg top-0 right-0 w-full max-w-md h-screen  "
                    >

                        <div className="items-center ">
                            <div className="flex justify-between bg-gray-600 items-center py-3 px-3">

                            <h2 className="text-xl capitalize  rounded-md leading-loose ">Job Application</h2>
                                <button
                                    onClick={() => setSideBar((sideBar) => !sideBar)}
                                    className="bg-white text-black h-8 mx-4 w-8 block  rounded-full"
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="grid grid-cols-2  w-full">
                                <div className="justify-center items-center">
                                    <img src={logo} alt="" className="h-24 w-24 object-cover mx-1 rounded-full shadow-md border-4  my-3 border-gray" />
                                    <ul className="flex justify-start pl-2 text-black">
                                        <li>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="mr-1 h-5 w-5 text-warning">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </li>
                                        <li>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="mr-1 h-5 w-5 text-warning">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </li>
                                        <li>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="mr-1 h-5 w-5 text-warning">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </li>
                                        <li>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="mr-1 h-5 w-5 text-warning">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                            </svg>
                                        </li>
                                        <li>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="mr-1 h-5 w-5 text-warning">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                            </svg>
                                        </li>
                                    </ul>
                                    <div className=" justify-center space-x-2  m-1 py-2">
                                        <button
                                            type="button"
                                            className=" rounded text-white bg-emerald-500 px-6 pt-2.5 pb-2 text-xs font-medium">
                                            Start Onboard
                                        </button>

                                    </div>
                                    <div className=" justify-center space-x-2  m-1 py-2">
                                        <button
                                            type="button"
                                            className=" rounded text-white bg-cyan-500 px-6 pt-2.5 pb-2 text-xs font-medium">
                                            Archive Application
                                        </button>

                                    </div>
                                    <div className=" justify-center space-x-2  m-1 py-2">
                                        <button
                                            type="button"
                                            className=" rounded text-white bg-rose-500 px-6 pt-2.5 pb-2 text-xs font-medium">
                                            Delete Application
                                        </button>

                                    </div>


                                </div>

                                <div className="justify-center items-center py-2 ">
                                    <div className="w-full py-[2px] mr-1">
                                        <h1 className=" text-[14px] text-black font-medium pr-1">Name </h1>
                                        <p className="text-[12px] text-black">Manish</p>
                                    </div>
                                    <div className="w-full py-[2px] mr-1">
                                        <h1 className=" text-[14px] text-black font-medium pr-1">Applied For </h1>
                                        <p className="text-[12px] text-black ">Test Laravel (Delhi)</p>
                                    </div>
                                    <div className="w-full py-[2px] mr-1">
                                        <h1 className=" text-[14px] text-black font-medium pr-1">Email </h1>
                                        <p className="text-[12px] text-black ">Manish@gmail.com</p>
                                    </div>
                                    <div className="w-full py-[2px] mr-1">
                                        <h1 className=" text-[14px] text-black font-medium pr-1">Phone </h1>
                                        <p className="text-[12px] text-black ">9988 77 6655</p>
                                    </div>
                                    <div className="w-full py-[2px] mr-1">
                                        <h1 className=" text-[14px] text-black font-medium pr-1">Address </h1>
                                        <p className="text-[12px] text-black ">jdgjhdgshfhdgf</p>
                                    </div>
                                    <div className="w-full py-[2px] text-black col-span-3">
                                        <span className="font-medium text-black text-xl">Condidate Details</span>
                                        <div className="w-full py-[2px] mr-1">
                                            <h1 className=" text-[14px] text-black font-medium pr-1">Applied at </h1>
                                            <p className="text-[12px] text-black ">04 Mar 2023 09:00</p>
                                        </div>
                                    </div>
                                    <div className="w-full py-[2px] mr-1 col-span-2">
                                        <span className="text-xl  text-black">Interview Schedule Details </span>
                                        <h1 className="flex text-[14px] text-black font-medium pr-1"> Interview Type</h1>
                                        <p className="text-[12px]  text-black">Online</p>
                                    </div>

                                </div>
                            </div>
                      </div>
                      
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1
                        }}
                        exit={{
                            opacity: 0
                        }}
                        transition={{ type: "spring", bounce: 0, duration: 0.2 }}
                        onClick={() => setSideBar((sideBar) => !sideBar)}
                        className="bg-transparent px-5 fixed h-full w-full flex items-center justify-center top-0 left-0"
                    />
                </>
            )}
        </AnimatePresence>
    );
}

function Content({ sideBar, setSideBar, modal, setModal }) {
    return (
        <motion.div
            animate={{
                scale: sideBar || modal ? 0.8 : 1,
                opacity: sideBar || modal ? 0.5 : 1
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
            {/* <h2 className="text-4xl capitalize">hello there</h2> */}
            <div className="flex items-center space-x-2">
                <button
                    className="bg-indigo-600 my-3 text-white uppercase text-sm px-4 h-10 rounded"
                    onClick={() => setSideBar((sideBar) => !sideBar)}
                >
                    {sideBar ? "Close " : "click"}
                </button>

                
            </div>

            
        </motion.div>
    );
}

function Modal({ modal, setModal }) {
    return (
        <AnimatePresence>
            {modal && (
                <div className="px-5 fixed h-full w-full flex items-center justify-center top-0 left-0">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{
                            y: 0,
                            opacity: 1
                        }}
                        exit={{
                            y: -50,
                            opacity: 0
                        }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="absolute z-10 p-5 bg-indigo-600 h-auto w-full max-w-md rounded text-white"
                    >
                        <button
                            onClick={() => setModal((modal) => !modal)}
                            className="absolute top-0 right-0 -mt-4 -mr-4 bg-white text-indigo-600 border border-indigo-600 h-8 w-8 block mb-2 rounded-full"
                        >
                            &times;
                        </button>
                        {/* <p>
                           1 Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s1.
                        </p> */}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1
                        }}
                        exit={{
                            opacity: 0
                        }}
                        transition={{ type: "spring", bounce: 0, duration: 0.2 }}
                        onClick={() => setModal((modal) => !modal)}
                        className="bg-transparent px-5 fixed h-full w-full flex items-center justify-center top-0 left-0"
                    />
                </div>
            )}
        </AnimatePresence>
    );
}

export default function JobProfile() {
    const [sideBar, setSideBar] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    return (
        <div className="container mx-auto p-8">
            <Content {...{ sideBar, setSideBar, modal, setModal }} />
            <Sidebar {...{ sideBar, setSideBar }} />
            <Modal {...{ modal, setModal }} />
        </div>
    );
}