import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const Dashboard = () => {
  const location=useLocation()
  const[tab,setTab]=useState('')
  useEffect(()=>{
    const urlParms=new URLSearchParams(location.search)
    const tabFormUrl=urlParms.get('tab')
    console.log(tabFormUrl)
  })
  return (
    <div className="">
      {/* Sidebar */}
      
    </div>
    
  )
}

export default Dashboard
