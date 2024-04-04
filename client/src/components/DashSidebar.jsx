import { Sidebar, Label } from 'flowbite-react';
import {HiArrowSmRight, HiDocumentText, HiUser,HiOutlineUserGroup,HiAnnotation} from 'react-icons/hi'
import { useLocation ,Link,useNavigate} from "react-router-dom"
import { useEffect ,useState} from "react"
import { signoutSuccess } from '../redux/user/userSlice';
import { useSelector,useDispatch } from 'react-redux';
const DashSidebar = () => {
    const location=useLocation()
    const[tab,setTab]=useState('')
    const navigate=useNavigate()
    const {currentUser}=useSelector(state=>state.user)
    useEffect(()=>{
      const urlParms=new URLSearchParams(location.search)
      const tabFormUrl=urlParms.get('tab')
      if(tabFormUrl){
        setTab(tabFormUrl)
      }
    },[location.search])

    const handleSignout = async () => {
      try {
          const res = await fetch('/api/user/signout', {
              method: 'POST',
          });
          const data = await res.json();
          if (!res.ok) {
              console.log('Error:', data.message); // Log error message if request fails
          } else {
              console.log('Sign-out successful:', data); // Log success message if sign-out is successful
              dispatch(signoutSuccess(data));
              // Ensure that 'navigate' function is defined and imported properly
               navigate('/');
          }
      } catch (error) {
          console.error('Error:', error); // Log any unexpected errors
      }
  }
  return (
    
    <Sidebar className='w-full md:w-56'>
       <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
            <Link to='/dashboard?tab=profile'>

           
            <Sidebar.Item active={tab==='profile'} icon={HiUser} label={currentUser ? 'Admin' :'User' } labelColor='dark' as='div'>
               Profile
            </Sidebar.Item>
            </Link>
           {
            currentUser.isAdmin && (
              <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
              active={tab==='posts'}
              icon={HiDocumentText}>
                Posts
              </Sidebar.Item>
            </Link>
            )
           }
            {
            currentUser.isAdmin && (
              <>
              <Link to='/dashboard?tab=users'>
              <Sidebar.Item
              active={tab==='users'}
              icon={HiOutlineUserGroup}>
                Users
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link>

            </>
            )
           }

            <Sidebar.Item  icon={HiArrowSmRight}  className='cursor-pointer' onClick={handleSignout} >
               Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
       </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
