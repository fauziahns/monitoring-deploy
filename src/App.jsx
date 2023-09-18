import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import Loader from "./components/Loader"
import axios from "axios"

const App = () => {
  const [list, setList] =  useState([])
  const [searchVersion, setSearchVersion] = useState("")
  const [search, setSearch] = useState("")
  const [searchDebounce] = useDebounce(search, 500)
  const [versionDebounce] = useDebounce(searchVersion, 500)
  const [loading, setLoading] = useState(false)
  const baseURL = "https://shuttle.jackalholidays.com/api/test-deploy/listing"
  
  const filtered = 
  list.filter((item) =>
        item.host.toLowerCase().includes(searchDebounce.toLowerCase()) ||
        item.name.toLowerCase().includes(searchDebounce.toLowerCase()) &&
        item.url.toLowerCase().includes(versionDebounce.toLowerCase())
      )

  const fetchData = async (data) => {
    try {
      const response = await axios.get(baseURL)
      console.log(response.data);
      const dataNew = await Promise.all(response.data.map(async(item, index) => {
        try {
          const newUrl = await axios.get(item.url)
          return { ...item, url: newUrl.data };
        } catch (error) {
          return { ...item, url: 'Url Error' }
        }
        
      }));
    
      console.log('dataNew', await dataNew);
      setList(dataNew)
    } catch(e) {
      console.error('error', e);
    }
  }

  // for (let index = 0; index < data.length; index++) {
  //   const element = data[index];
  //   const statusCheck = await axios.get(element.url)
  //   let newData = [...data]
  //   newData[index].url = statusCheck.data.dataNew

  //   setList(newData)
  // }

  useEffect(() => {
    fetchData()
  }, [])

  return (
  <div className=" bg-[#182331] py-[73px] w-full h-screen mx-auto">

    <div className="w-full lg:w-[1130px] md:w-[800px] xl:w-[1132px] 2xl:w-[1132px] mx-auto py-4">
      <p className="text-[#536378] text-[26px]">V.1.0.0</p>
      <p className="text-white text-[32px] font-[700]">Monitor Deployment</p>
    </div>

    <div className="bg-[#1F2A37] w-full lg:w-[1130px] md:w-[800px] xl:w-[1132px] 2xl:w-[1132px] flex flex-col lg:flex-row xl:flex-row 2xl:flex-row md:flex-row items-center justify-end rounded-t-lg mx-auto px-5">
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
      </div>
    </div>

    <div className="flex bg-[#374151] w-full  lg:w-[1130px] md:w-[800px] xl:w-[1132px] 2xl:w-[1132px] mx-auto text-[#9CA3AF] px-5 h-[50px] items-center text-[14px] font-[600]">
      <p className="w-[220px] lg:w-[432px] md:w-[432px] xl:w-[432px] 2xl:w-[432px]">URL</p>
      <p className="w-[150px] lg:w-[350px] md:w-[350px] xl:w-[350px] 2xl:w-[350px]">TAG</p>
      <p className="w-[150px] lg:w-[350px] md:w-[350px] xl:w-[350px] 2xl:w-[350px] pl-2">STATUS</p>
    </div>

    {
      loading ? <p>Loading...</p> :
     filtered.map((item, index) => {
      return (
      <div key={index} className="bg-[#182331]">
        <div className="flex bg-[#1F2A37] w-screen lg:w-[1130px] md:w-[800px] xl:w-[1132px] 2xl:w-[1132px] mx-auto text-white px-5 h-[50px] items-center text-[14px] font-[600] border-[#374151] border-b-[1px]">
            <div className="w-[200px] lg:w-[432px] md:w-[432px] xl:w-[432px] 2xl:w-[432px]">
              <a href={item.host} target='_blank'>
                <p>{item.host}</p>
              </a>
            </div>
            <div className="w-[150px] lg:w-[350px] md:w-[350px] xl:w-[350px] 2xl:w-[350px]">
              <p>{item.name}</p>
            </div>
            <div className="w-[150px] lg:w-[350px] md:w-[350px] xl:w-[350px] 2xl:w-[350px]">
              <p 
                className ={`
                w-[90px] px-2 py-[3px] text-center rounded-md 
                  ${searchVersion && item.url.toLowerCase().includes(searchVersion.toLowerCase())
                      ? "bg-[#1C4F9B] text-[#E8EDFD]"
                      : "bg-[#E8EDFD] text-[#1C4F9B]" }`}
                 >
                  {item.url}
              </p>
            </div>
        </div>
      </div>
      );
    })}

    <div className="bg-[#182331] pb-10">
      <p className="text-center pt-10 text-[#536378]">2023</p>
    </div>
  </div>
  )
}
export default App