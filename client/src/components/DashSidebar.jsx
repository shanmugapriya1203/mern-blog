import { Sidebar, Label } from 'flowbite-react';
import {HiArrowSmRight, HiDocumentText, HiUser} from 'react-icons/hi'
import { useLocation ,Link} from "react-router-dom"
import { useEffect ,useState} from "react"
import { useSelector } from 'react-redux';
const DashSidebar = () => {
    const location=useLocation()
    const[tab,setTab]=useState('')
    const {currentUser}=useSelector(state=>state.user)
    useEffect(()=>{
      const urlParms=new URLSearchParams(location.search)
      const tabFormUrl=urlParms.get('tab')
      if(tabFormUrl){
        setTab(tabFormUrl)
      }
    },[location.search])
  return (
    
    <Sidebar className='w-full md:w-56'>
       <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
            <Link to='/dashboard?tab=profile'>

           
            <Sidebar.Item active={tab==='profile'} icon={HiUser} label={currentUser ? 'Admin' :'User' } labelColor='dark' as='div'>
               Profile
            </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
              active={tab==='posts'}
              icon={HiDocumentText}>
                Posts
              </Sidebar.Item>
            </Link>
            <Sidebar.Item  icon={HiArrowSmRight}  className='cursor-pointer'>
               Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
       </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
