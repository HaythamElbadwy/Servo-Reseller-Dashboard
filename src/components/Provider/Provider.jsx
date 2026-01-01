import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Provider.module.css';
import { toast } from 'react-toastify';
import { Pagination } from 'flowbite-react';
import { data } from 'react-router-dom';

export default function Provider() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setAllPage] = useState(0);
  const [isGenerateCode, setIsGenerateCode] = useState(false);
  const [isPlaylist, setIsPlaylist] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalProvider, setTotalProvider] = useState(0);
  const [allProvider, setAllProvider] = useState([]);
  const [searchProvider, setSearchProvider] = useState('');

  function addSubscribtion() {
    setIsGenerateCode(true)
  }

  /////////////////////// START GET PROVIDER INFO FUNCTION////////////////
  const getProviderInfo = async () => {

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
        setTotalProvider(data.info.subscriptionsNum);
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
    getProviderInfo()
  }, [])


  /////////////////////// END GET PROVIDER INFO FUNCTION///////////////////////////

  /////////////////////// START GET RESELLER CUSTOMER FUNCTION////////////////
  const getProvider = async (page) => {

    try {
      const response = await fetch(`https://servo-back.onrender.com/reseller/getByCode?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `servoM0${localStorage.getItem('authToken')}`
        },
      });

      const data = await response.json();


      if (response.ok) {

        toast.success(data.message, {
          theme: "dark"
        });
        setAllProvider(data.subscriptions);
        console.log(data);
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
    getProvider(1)
  }, [])

  const onPageChange = (page) => {
    setCurrentPage(page)
    getProvider(page)
  };
  /////////////////////// END GET RESELLER CUSTOMER FUNCTION///////////////////////////

  ////////////////////////START ADD  NEW RESELLER CUSTOMER//////////////////////////////
  const addGenerateCode = async () => {
    // console.log(email, isName, password, customerLimit);

    setIsLoading(true)
    try {
      const response = await fetch(`https://servo-back.onrender.com/reseller/generateCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `servoM0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ playlist: isPlaylist })
      });

      const data = await response.json();

      if (response.ok) {
        getProvider(currentPage)
        toast.success(data.message, {
          theme: 'dark'
        })
        setIsGenerateCode(false);
        setTotalProvider(prev => Math.max(prev - 1, 0));
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
    if (isPlaylist == '') {
      toast("All faildes is Rquired!")
    } else {
      addGenerateCode()
    }

  }
  function clearInput() {
    setIsPlaylist('')
  }

  ////////////////////////END ADD  NEW RESELLER CUSTOMER/////////////////////////////////////

  ///////////////////////////START SEARCH RESELLER CUSTOMER////////////////////////////////////
  const getSearch = async (macAddress) => {


    setSearchProvider(macAddress)
    if (macAddress == '') {
      getProvider(currentPage)
      return
    }
    try {
      const response = await fetch(`https://servo-back.onrender.com/reseller/searchByMac?macAddress=${macAddress}&type=provider`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `servoM0${localStorage.getItem('authToken')}`
        },
      });

      const data = await response.json();


      if (response.ok) {
        console.log(data);
        setAllProvider(data.subscriptions);
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
      <section className={`${styles.provider_dashboard} pb-10 pl-20 px-9`}>
        <div className={`${styles.totalSubscription}  w-60 h-28 mt-24 m-auto`}>
          <p className='text-white text-md pt-3 text-start pl-[1.5rem]'>Provider Credit</p>
          <div className='flex items-center justify-around font-semibold text-3xl text-white pt-1'>
            <h1 className='text-2xl'>{totalProvider}</h1>
          </div>
        </div>
        <div className={`${styles.provider_options} mt-12 flex items-center justify-around`}>
          <h1 className='font-semibold text-[20px]'>Provider</h1>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className={`${styles.searchInput} relative w-[50%]`}>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>

            </div>
            <input onChange={(e) => getSearch(e.target.value)} value={searchProvider} type="search" id="default-search" className="block w-full h-11 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
          </div>
          <button type="button"
            onClick={addSubscribtion}
            className="text-[#185eb3] hover:text-white border
           border-[#185eb3] hover:bg-[#185eb3] focus:ring-4 focus:outline-none
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-[#185eb3] dark:text-[#185eb3] dark:hover:text-white
             dark:hover:bg-[#185eb3] dark:focus:ring-[#185eb3]">
            <i className="fa-solid fa-plus mr-4"></i>
            Generate Code</button>
        </div>

        <div className={`${styles.provider_table} `}>
          <table className='table-auto w-full '>
            <thead className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 '>
              <tr>
                <th scope="col" className="px-6 py-3">Code</th>
                <th scope="col" className="px-6 py-3">Mac address</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">Expire Date</th>
                <th scope="col" className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {allProvider.map((item, index) => (
                <tr key={index}>
                  <td scope="col" className="px-6 py-4">{item?.code}</td>
                  <td scope="col" className="px-6 py-4">{item?.userId?.macAddress}</td>
                  <td scope="col" className="px-6 py-3">{item?.userId?.type}</td>
                  <td scope="col" className="px-6 py-3">{item?.userId?.endDate}</td>
                  <td className={`px-6 py-3 ${item?.userId?.isSubscribed ? "text-green-500 font-bold" : "text-red-500 font-bold"}`}>
                    {item?.userId?.isSubscribed ? "Active" : "Not Active"}
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

        {isGenerateCode ?
          <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    ADD Generate Code
                  </h3>
                  <button type="button" onClick={() => setIsGenerateCode(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label htmlFor="playlistUrl" className="flex mb-2  font-medium text-gray-900 dark:text-white">Playlist URL</label>
                      <input type="text" onChange={(e) => setIsPlaylist(e.target.value)} value={isPlaylist} name="playlistUrl" id="playlistUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Mac Address" required="" />
                    </div>
                  </div>


                  <button type="submit"
                    onClick={handleAdd}
                    className="text-white mr-5 inline-flex items-center bg-[#185eb3] hover:bg-[#185eb3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                    {isLoading ?
                      <i className='fas fa-spinner fa-spin text-2xl'></i>
                      : 'Add'}
                  </button>
                  <button type="submit" onClick={() => setIsGenerateCode(false)}
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