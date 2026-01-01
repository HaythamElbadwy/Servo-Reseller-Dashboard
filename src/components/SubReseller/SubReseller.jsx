import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './SubReseller.module.css';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
export default function SubReseller() {
  const [isNewSubReseller, setIsNewSubReseller] = useState(false);
  const [isName, setIsName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [customerLimit, setCustomerLimit] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [allSubReseller, setAllSubReseller] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  function addSubReseller() {
    setIsNewSubReseller(true)
  }

  ////////////////////////START ADD  NEW SUB RESELLER//////////////////////////////
  const addNewSubReseller = async () => {
    console.log(email, isName, password, customerLimit);

    setIsLoading(true)
    try {
      const response = await fetch(`https://servo-back.onrender.com/reseller/addSubReseller`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `servoM0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          email, password
          , userName: isName, subscriptionsNum: customerLimit
        })
      });

      const data = await response.json();

      if (response.ok) {
        getSubReseller()
        toast.success(data.message, {
          theme: 'dark'
        })
        setIsNewSubReseller(false)
        clearInput()
      } else {
        switch (response.status) {
          case 500:
            toast.error(data.error, {
              theme: "dark"
            });
          case 400:
            toast.error(data.message, {
              theme: "dark"
            });
          case 404:
            toast.error(data.message, {
              theme: "dark"
            });
            break;
          default:
            toast('An error occurred. Please try again.', {
              theme: "dark"
            });
        }
      }

    } catch (err) {
      console.error("Error Saving Faqs:", err);
    } finally {
      setIsLoading(false)
    }
  };

  function handleAdd(e) {
    e.preventDefault();

    if (isName == '' || email == '' || password == '' || customerLimit == '') {
      toast("All faildes is Rquired!")
    } else {
      addNewSubReseller()
    }

  }
  function clearInput() {
    setIsName('')
    setEmail('')
    setCustomerLimit('')
    setPassword('')
  }

  ////////////////////////END ADD NEW SUB RESELLER/////////////////////////////////////



  /////////////////////// START GET SUB RESELLER FUNCTION////////////////
  const getSubReseller = async () => {

    try {
      const response = await fetch(`https://servo-back.onrender.com/reseller/getSubReseller`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `servoM0${localStorage.getItem('authToken')}`
        },
      });

      const data = await response.json();


      if (response.ok) {
        setAllSubReseller(data.subResellers);
      } else {
        switch (response.status) {
          case 500:
            toast.error(data.message, {
              theme: "dark"
            });
          case 404:
            toast.error(data.message, {
              theme: "dark"
            });
            break;
          default:
            toast('An error occurred. Please try again.');
        }
      }

    } catch (err) {
      console.error("Error Saving Content:", err);
    } finally {
      setIsLoading(false)
    }
  };



  useEffect(() => {
    getSubReseller()
  }, []);

  const filteredSubResellers = allSubReseller.filter((item) =>
    item.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  //////////////////////////END GET SUB RESELLER FUNCTION///////////////////////////


  return (
    <>
      <section className={`${styles.subReseller_dashboard} pb-10 pl-20 px-9`}>

        <div className={`${styles.subReseller_options} mt-28 flex items-center justify-around`}>
          <h1 className='font-semibold text-[20px]'>Sub Reseller</h1>



          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className={`${styles.searchInput} relative w-[50%]`}>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>

            </div>
            <input onChange={(e) => setSearchQuery(e.target.value)} type="search" id="default-search" className="block w-full h-11 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
          </div>
          <button type="button"
            onClick={addSubReseller}
            className="text-[#185eb3] hover:text-white border
               border-[#185eb3] hover:bg-[#185eb3] focus:ring-4 focus:outline-none
                focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white
                 dark:hover:bg-[#185eb3] dark:focus:ring-[#185eb3]">
            <i className="fa-solid fa-plus mr-4"></i>
            Sub Reseller</button>
        </div>

        <div className={`${styles.subReseller_table} `}>
          <table className='table-auto w-full '>
            <thead className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 '>
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Subscribe num</th>
                <th scope="col" className="px-6 py-3">Created date</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubResellers.length > 0 ? (
                filteredSubResellers.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">{item.userName}</td>
                    <td className="px-6 py-3">{item.email}</td>
                    <td className="px-6 py-3">{item.subscriptionsNum}</td>
                    <td className="px-6 py-3">{item.currentDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">No matching results</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>



        {isNewSubReseller ?
          <form>
            <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      ADD Sub Reseller
                    </h3>
                    <button type="button" onClick={() => setIsNewSubReseller(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label htmlFor="name" className="flex mb-2  font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" onChange={(e) => setIsName(e.target.value)} value={isName} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Name" required="" />
                      </div>

                      <div className="col-span-2">
                        <label htmlFor="email" className="flex mb-2  font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Email" required="" />
                      </div>

                      <div className="col-span-2">
                        <label htmlFor="password" className="flex mb-2  font-medium text-gray-900 dark:text-white">Password</label>
                        <div className="relative">
                          <input type={showPassword ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)} value={password}
                            name="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Enter Your Password" required="" />
                          <button
                            type="button"
                            className="absolute top-[12px] right-0 left-[347px] sm:left[290px] text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                          </button>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="customerlimit" className="flex mb-2  font-medium text-gray-900 dark:text-white">Customer Limit</label>
                        <input type="number" onChange={(e) => setCustomerLimit(e.target.value)} value={customerLimit} name="customerlimit" id="customerlimit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Subscribe Num" required="" />
                      </div>
                    </div>
                    <button type="submit"
                      onClick={handleAdd}
                      className="text-white mr-5 inline-flex items-center bg-[#185eb3] hover:bg-[#185eb3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                      {isLoading ?
                        <i className='fas fa-spinner fa-spin text-2xl'></i>
                        : 'Add'}
                    </button>
                    <button type="submit" onClick={() => setIsNewSubReseller(false)}
                      className="text-white mr-5 inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700">
                      Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          : ''}
      </section>
    </>
  )
}
