import { useEffect ,useState} from "react"
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar"
import DashProfile from "../components/DashProfile"

const Dashboard = () => {
  const location=useLocation()
  const[tab,setTab]=useState('')
  useEffect(()=>{
    const urlParms=new URLSearchParams(location.search)
    const tabFormUrl=urlParms.get('tab')
    if(tabFormUrl){
      setTab(tabFormUrl)
    }
  },[location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
    <div className="md:w-56">
      {/* Sidebar */}
      <DashSidebar/>
    

    </div>
      {/* profile */}
      {tab === 'profile' && <DashProfile/>}
      </div>
  )
}

export default Dashboard
