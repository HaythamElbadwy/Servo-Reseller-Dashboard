import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './ResellerCustomer.module.css';
import { Pagination } from 'flowbite-react';
import { toast } from 'react-toastify';

export default function ResellerCustomer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setAllPage] = useState(0);
  const [isNewResellerCustomer, setIsNewResellerCustomer] = useState(false);
  const [isReplaceUrl, setIsReplaceUrl] = useState(false);
  const [isMacAddress, setIsMacAddress] = useState("");
  const [isNewHost, setIsNewHost] = useState("");
  const [isOldHost, setIsOldHost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allResellerCustomer, setAllResellerCustomer] = useState([]);
  const [totalResellerSubscribtion, setTotalResellerSubscribtion] = useState(0);
  const [searchResellerCustomer, setSearchResellerCustomer] = useState('');
  const [credit, setCredit] = useState("");

  function addSubscribtion() {
    clearInput()
    setIsNewResellerCustomer(true)
  }
  function replaceUrl() {
    setIsReplaceUrl(true)
  }

  /////////////////////// START GET RESELLER CUSTOMER FUNCTION////////////////
  const getResellerCustomer = async (page) => {

    try {
      const response = await fetch(`https://servo-back.onrender.com/reseller/getSubscriptions?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `servoM0${localStorage.getItem('authToken')}`
        },
      });

      const data = await response.json();


      if (response.ok) {
        setAllResellerCustomer(data.subscriptions);
        setCurrentPage(data.page);
        setAllPage(data.totalPages)
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
    getResellerCustomer(1)
  }, [])

  const onPageChange = (page) => {
    setCurrentPage(page)
    getResellerCustomer(page)
  };
  /////////////////////// END GET RESELLER CUSTOMER FUNCTION///////////////////////////

  /////////////////////// START GET RESELLER INFO FUNCTION////////////////
  const getResellerInfo = async () => {

    try {
      const response = await fetch(`https://servo-back.onrender.com/reseller/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `servoM0${localStorage.getItem('authToken')}`
        },
      });

      const data = await response.json();


      if (response.ok) {
        setTotalResellerSubscribtion(data.info.subscriptionsNum);
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
    getResellerInfo()
  }, [])


  //////////////////////////END GET RESELLER INFO FUNCTION//////////////////////////////

  ////////////////////////START ADD  NEW RESELLER CUSTOMER//////////////////////////////
  const addNewSubscription = async () => {
    // console.log(email, isName, password, customerLimit);

    setIsLoading(true)
    try {
      const response = await fetch(`https://servo-back.onrender.com/reseller/newSubscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `servoM0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ macAddress: isMacAddress, credit })
      });

      const data = await response.json();

      if (response.ok) {
        getResellerCustomer(currentPage)
        toast.success(data.message, {
          theme: 'dark'
        })
        setIsNewResellerCustomer(false)
        if (credit == "Life Time") {
          setTotalResellerSubscribtion(prev => Math.max(prev - 2, 0));
        } else {
          setTotalResellerSubscribtion(prev => Math.max(prev - 1, 0));
        }

        clearInput()

      } else {
        switch (response.status) {
          case 500:
            toast.error(data.message, {
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

  function handleAdd() {
    if (isMacAddress == '' || credit == '') {
      toast("All faildes is Rquired!")
    } else {
      addNewSubscription()
    }



  }
  function clearInput() {
    setIsMacAddress('')
    setCredit('')

  }

  ////////////////////////END ADD  NEW RESELLER CUSTOMER/////////////////////////////////////

    ////////////////////////START ADD REPLACE URL//////////////////////////////
  const changeHost = async () => {
   

    setIsLoading(true)
    try {
      const response = await fetch(`https://servo-back.onrender.com/reseller/changeHost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `servoM0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ oldHost: isOldHost, newHost: isNewHost })
      });

      const data = await response.json();

      if (response.ok) {
        getResellerCustomer(currentPage)
        toast.success(data.message, {
          theme: 'dark'
        })
        setIsReplaceUrl(false)
        // if (credit == "Life Time") {
        //   setTotalResellerSubscribtion(prev => Math.max(prev - 2, 0));
        // } else {
        //   setTotalResellerSubscribtion(prev => Math.max(prev - 1, 0));
        // }

        clearInput()

      } else {
        switch (response.status) {
          case 500:
            toast.error(data.message, {
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

  function handleAddNewHost() {
    if (isNewHost == '' || isOldHost == '') {
      toast("All faildes is Rquired!")
    } else {
      changeHost()
    }



  }
  function clearInput() {
    setIsNewHost('')
    setIsOldHost('')

  }

  ////////////////////////END ADD  REPLACE URL/////////////////////////////////////

  ///////////////////////////START SEARCH RESELLER CUSTOMER////////////////////////////////////
  const getSearch = async (macAddress) => {
    setSearchResellerCustomer(macAddress)
    if (macAddress == '') {
      getResellerCustomer(currentPage)
      return
    }
    try {
      const response = await fetch(`https://servo-back.onrender.com/reseller/searchByMac?macAddress=${macAddress}&type=reseller`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `servoM0${localStorage.getItem('authToken')}`
        },
      });

      const data = await response.json();


      if (response.ok) {
        setAllResellerCustomer(data.subscriptions);
      }

    } catch (err) {
      console.error("Error Saving Content:", err);
    } finally {
      setIsLoading(false)
    }
  };
  ///////////////////////////END SEARCH RESELLER CUSTOMER////////////////////////////////////
  return (
    <>
      <section className={`${styles.resellerCustomer_dashboard} pb-10 pl-20 px-9`}>

        <div className={`${styles.totalSubscription}  w-60 h-28 mt-24 m-auto`}>
          <p className='text-white text-md pt-3 text-start pl-[1.5rem]'>Reseller Credit</p>
          <div className='flex items-center justify-around font-semibold text-3xl text-white pt-1'>
            <h1 className='text-2xl'>{totalResellerSubscribtion}</h1>
          </div>

        </div>
        <div className={`${styles.resellerCustomer_options} mt-12 flex items-center justify-around`}>
          <h1 className='font-semibold text-[20px]'>Reseller Customer</h1>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className={`${styles.searchInput} relative w-[50%]`}>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>

            </div>
            <input onChange={(e) => getSearch(e.target.value)} value={searchResellerCustomer} type="search" id="default-search" className="block w-full h-11 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
          </div>
          <button type="button"
            onClick={replaceUrl}
            className="text-[#185eb3] hover:text-white border
           border-[#185eb3] hover:bg-[#185eb3] focus:ring-4 focus:outline-none
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white
             dark:hover:bg-blue-500 dark:focus:ring-blue-800">
            <i className="fa-solid fa-plus mr-4"></i>
            Replace Url</button>
          <button type="button"
            onClick={addSubscribtion}
            className="text-[#185eb3] hover:text-white border
           border-[#185eb3] hover:bg-[#185eb3] focus:ring-4 focus:outline-none
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white
             dark:hover:bg-blue-500 dark:focus:ring-blue-800">
            <i className="fa-solid fa-plus mr-4"></i>
            New Subscribtion</button>

        </div>


        <div className={`${styles.resellerCustomer_table} `}>
          <table className='table-auto w-full '>
            <thead className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 '>
              <tr>
                <th scope="col" className="px-6 py-3">App Name</th>
                <th scope="col" className="px-6 py-3">Mac address</th>
                <th scope="col" className="px-6 py-3">Package</th>
                <th scope="col" className="px-6 py-3">Expiry date</th>
                <th scope="col" className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {allResellerCustomer.map((item, index) => (
                <tr key={index}>
                  <td scope="col" className="px-6 py-4">Servo</td>
                  <td scope="col" className="px-6 py-3">{item.userId.macAddress}</td>
                  <td scope="col" className="px-6 py-3">{item.subscriptionEndDate == "3025-04-25" ? "Life Time" : "1 year"}</td>
                  <td scope="col" className="px-6 py-3">{item.subscriptionEndDate}</td>
                  <td className={`px-6 py-3 ${item.isActive ? "text-green-500 font-bold" : "text-red-500 font-bold"}`}>
                    {item.isActive ? "Active" : "Not Active"}
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>

        <div className='flex items-center justify-between pl-4 pr-4'>
          <h3>Showing {currentPage} to {totalPages} of {totalPages}</h3>
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>

        </div>

        {isNewResellerCustomer ?
          <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    ADD Subscribtion
                  </h3>
                  <button type="button" onClick={() => setIsNewResellerCustomer(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label htmlFor="macaddress" className="flex mb-2  font-medium text-gray-900 dark:text-white">Mac Address</label>
                      <input type="text"  value={isMacAddress} name="macaddress" id="macaddress"
                        onChange={(e) => {
                          let input = e.target.value;
                          input = input.replace(/[^a-zA-Z0-9]/g, '');
                          const formatted = input.match(/.{1,2}/g)?.join(':') || '';
                          setIsMacAddress(formatted);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Mac Address" required="" />
                    </div>
                    <div className='col-span-2'>
                      <label htmlFor="credit" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Credit</label>
                      <select onChange={(e) => setCredit(e.target.value)} value={credit} id="credit" className=" w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a Credit</option>
                        <option>1 year</option>
                        <option>Life Time</option>
                      </select>
                    </div>
                  </div>


                  <button type="submit"
                    onClick={handleAdd}
                    className="text-white mr-5 inline-flex items-center bg-[#185eb3] hover:bg-b[#185eb3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                    {isLoading ?
                      <i className='fas fa-spinner fa-spin text-2xl'></i>
                      : 'Add'}
                  </button>
                  <button type="submit" onClick={() => setIsNewResellerCustomer(false)}
                    className="text-white mr-5 inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700">
                    Cancel</button>
                </div>
              </div>
            </div>
          </div>
          : ''}

        {isReplaceUrl ?
          <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Change Host
                  </h3>
                  <button type="button" onClick={() => setIsReplaceUrl(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label htmlFor="macaddress" className="flex mb-2  font-medium text-gray-900 dark:text-white">Old URL</label>
                      <input type="text" onChange={(e) => setIsOldHost(e.target.value)} value={isOldHost} name="macaddress" id="macaddress"
                      
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Old Url" required="" />
                    </div>
                    <div className='col-span-2'>
                      <label htmlFor="macaddress" className="flex mb-2  font-medium text-gray-900 dark:text-white">New URL</label>
                      <input type="text" onChange={(e) => setIsNewHost(e.target.value)} value={isNewHost} name="macaddress" id="macaddress"
                     
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your New Url" required="" />

                    </div>
                  </div>


                  <button type="submit"
                    onClick={handleAddNewHost}
                    className="text-white mr-5 inline-flex items-center bg-[#185eb3] hover:bg-b[#185eb3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                    {isLoading ?
                      <i className='fas fa-spinner fa-spin text-2xl'></i>
                      : 'Add'}
                  </button>
                  <button type="submit" onClick={() => setIsReplaceUrl(false)}
                    className="text-white mr-5 inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700">
                    Cancel</button>
                </div>
              </div>
            </div>
          </div>
          : ''}
      </section>
    </>
  )
}
