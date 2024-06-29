import React, { useEffect, useState } from 'react'
import "./Nav.css"
import { Link,useLocation, useNavigate} from 'react-router-dom'
import newRequest from '../../utils/newRequest'
import noavatar from "../../images/noavatar.png"
const Nav = () => {
    const [active , setActive] = useState(false)
    const [open , setOpen] = useState(false)
    const {pathname} = useLocation();
    const navigate = useNavigate()
    const handleLogout = async() =>{
        try{
            await newRequest.post("/auth/logout")
            localStorage.setItem("CurrentUser",null)
            navigate("/")
        }catch(err){
            console.log(err);
            
        }

    }

    const isActive = ()=>{
        window.scrollY>0 ? setActive(true) : setActive(false)
    }
    useEffect(()=>{
        window.addEventListener("scroll", isActive)

        return ()=>{
            window.removeEventListener("scroll" , isActive)
        }
    },[]);
    const currentUser = JSON.parse(localStorage.getItem("CurrentUser"))


    return (
    <div className={active||pathname!="/"? "navbar active":"navbar"}>
        <div className="container">
            <div className="logo">
                <Link to="/" className='link'>
                <span className="text">PlaySoft</span>
                <span className='dot'>.</span>
                </Link>
            </div>
            <div className="links">
                <span>PlaySoft Business</span>
                <span>Explore</span>
                <span>English</span>
                {!currentUser?.isSeller && <span>Become a Seller</span>}
                {/* {!currentUser && <button>Join</button>} */}
                {currentUser ? (
                    <div className="user" onClick={()=> setOpen(!open)}>
                        <img src= {currentUser.img || noavatar}  alt="" />
                        <span>{currentUser?.username}</span>
                        {open && (<div className="options">
                            {
                                currentUser?.isSeller && (
                                    <>
                                        <Link className= 'link' to="/mygigs" >Gigs</Link>
                                        <Link className= 'link' to="/add" >Add New Gigs</Link >
                                    </>
                                )}
                                <Link className= 'link' to="/orders" >Orders</Link >
                                <Link className= 'link' to="/messages" >Messages</Link >
                                <Link className= 'link' onClick={handleLogout}>Logout</Link ></div>)}
                    </div>
                ):(
                    <>
                        <Link to='/login' className='link'>Sign in</Link>
                        <Link className='link' to = '/register'>
                            <button>Join</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
        {(active || pathname !== '/') && 
            <>
                <hr />
            <div className="menu">
                <Link to="/" className='link menulink'>
                    Graphics & Design
                </Link>
                <Link to="/" className='link'>
                    Writing & Translation
                </Link>
                <Link to="/" className='link'>
                    AI Services
                </Link>
                <Link to="/" className='link'>
                    Digital Marketing
                </Link>
                <Link to="/" className='link'>
                    Music & Audio
                </Link>
                <Link to="/" className='link'>
                    Programming & Tech
                </Link>
                <Link to="/" className='link'>
                    Business
                </Link>
                <Link to="/" className='link'>
                    Lifestyle
                </Link>
            </div>
            </>
            
        }
        <div className='horizontal'>
            <hr/>
        </div>
    </div>
    
  )
}

export default Nav