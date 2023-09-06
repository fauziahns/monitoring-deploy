import { useEffect, useRef, useState } from "react"
import Tabel from "./components/tabel"
import { useDebounce } from "use-debounce"

const App = () => {
  const dummydata = [
    {
        url: "https://baraya.com",
        tag: "baraya",
        urlDeploy : "https://dummyurl/test-deploy",
        status : "7813"
    },
    {
        url: "https://daytrans.com",
        tag: "daytrans",
        urlDeploy : "https://dummyurl/test-deploy",
        status : "5213"
    },
    {
        url: "https://jackholidays.com",
        tag: "jackholidays",
        urlDeploy : "https://dummyurl/test-deploy",
        status : "9013"
    },
    {
        url: "https://hallo.com",
        tag: "test",
        urlDeploy : "https://dummyurl/test-deploy",
        status : "7813"
    },
    {
        url: "https://daytrans.com",
        tag: "daytrans",
        urlDeploy : "https://dummyurl/test-deploy",
        status : "5013"
    },
    {
        url: "https://jackholidays.com",
        tag: "jackholidays",
        urlDeploy : "https://dummyurl/test-deploy",
        status : "9613"
    },
    {
        url: "https://hallo.com",
        tag: "test",
        urlDeploy : "https://dummyurl/test-deploy",
        status : "7813"
    },
    {
        url: "https://daytrans.com",
        tag: "daytrans",
        urlDeploy : "https://dummyurl/test-deploy",
        status : "5813"
    },
    {
        url: "https://jackholidays.com",
        tag: "jackholidays",
        urlDeploy : "https://dummyurl/test-deploy",
        status : "9013"
    },
    {
        url: "https://hallo.com",
        tag: "test",
        urlDeploy : "https://dummyurl/test-deploy",
        status : "7813"
    },
  ]
  const [list, setList] =  useState(dummydata)
  const [searchVersion, setSearchVersion] = useState("")
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [searchDebounce] = useDebounce(search, 500)

  const handleSearch = (data) => {
    return data.filter(
      (item) => 
      item.url.toLowerCase().includes(searchDebounce) ||
      item.tag.toLowerCase().includes(searchDebounce) ||
      item.status.toLowerCase().includes(searchDebounce)
    )
  }

  const handleClick = (list) => {
    console.log("user search for" + setSearchVersion);
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('');
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Terjadi kesalahan:', error);
  //       return <ErrorPages/>
  //     }
  //   };

  //   fetchData();
  // }, []); 

  return (
  <div className=" bg-[#182331] py-[73px] w-full h-screen mx-auto">

    <div className="pl-[68px] xl:pl-[140px] 2xl:pl-[280px] py-4 mx-auto 2xl:px-[195px] 2xl:my-auto">
      <p className="text-[#536378] text-[26px]">V.1.0.0</p>
      <p className="text-white text-[32px] font-[700]">Monitor Deployment</p>
    </div>

    <div className="bg-[#1F2A37] w-full lg:w-[1132px] md:w-[1132px] xl:w-[1132px] 2xl:w-[1132px] flex flex-col lg:flex-row xl:flex-row 2xl:flex-row md:flex-row items-center justify-between rounded-t-lg mx-auto px-4">
      <div className=" rounded-lg relative border">
        <img src="src/assets/clock.png" alt="icon-clock" className="absolute bottom-2 left-3"/>
        <select  
            className="bg-[#1F2A37] rounded-lg w-[87px] h-[34px] placeholder:my-4 placeholder:px-8 border-2 border-[#374151]" >
        </select>
      </div>

      <div className="flex items-center p-4">        
          <form className="text-white mr-2" >   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <img src="src/assets/search-outline.png" alt="icon-search" className="w-[18px] h-[18px]" />
                </div>
                <input 
                  value={searchVersion}
                  onChange={(e) => setSearchVersion(e.target.value)}
                  type="search" 
                  className="block w-full h-[42px] p-4 pl-10 text-sm rounded-lg bg-[#374151] border-2 border-[#4B5563] placeholder:text-[#9CA3AF]" placeholder="Version Watch" />
            </div>
          </form>

          <form className="text-white mr-2" method="get">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <img src="src/assets/search-outline.png" alt="icon-search" className="w-[18px] h-[18px]" />
                </div>
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search" 
                  className="block lg:w-[384px] xl:w-[384px] 2xl:w-[384px] md:w-[384px] w-[250px] h-[42px] p-4 pl-10 text-sm rounded-lg bg-[#374151] border-2 border-[#4B5563] placeholder:text-[#9CA3AF]" placeholder="Search URL, Tag" />
            </div>
          </form>

        <button className="bg-[#1A56DB] w-[83px] h-[41px] rounded-lg text-white hover:bg-[#5b93dde1]" onClick={handleClick(list)}>
            Watch
        </button>
      </div>
    </div>

    <div className="flex bg-[#374151] w-screen  lg:w-[1132px] md:w-[1132px] xl:w-[1132px] 2xl:w-[1132px] mx-auto text-[#9CA3AF] px-5 h-[50px] items-center text-[14px] font-[600]">
      <p className="w-[220px] lg:w-[432px] md:w-[432px] xl:w-[432px] 2xl:w-[432px]">URL</p>
      <p className="w-[150px] lg:w-[350px] md:w-[350px] xl:w-[350px] 2xl:w-[350px]">TAG</p>
      <p className="w-[150px] lg:w-[350px] md:w-[350px] xl:w-[350px] 2xl:w-[350px] pl-2">STATUS</p>
    </div>

      
      <Tabel data={handleSearch(list)}/>

    <div className="bg-[#182331] pb-10">
      <p className="text-center pt-10 text-[#536378]">2023</p>
    </div>
  </div>
  )
}

export default App
