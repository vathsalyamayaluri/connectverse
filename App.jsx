import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './Components/Profile';
import Homepage from './Components/First';
import Options from "./Components/Options";
import Signup from './Components/SignUp';
import Login from './Components/LoginEmail';
import Contact from './Components/Contact';
import About from './Components/About';
import PROFILE from './Components/Profile2';
import PROFILE1 from './Components/Profile3';
import HomeO from './Components/Home1';
import HomeAll from './Components/RGUKTHome';
import Card from './Components/Cards';
import Records from './Components/Records';
import Projects from './Components/Project';
import Notes from './Components/Notes';
import Admin from './Components/Admin';
import OTP from './Components/Otp';
import Arts from './Components/Arts';
import LoginForm from './Components/LoginOtp';
import Modal from 'react-modal';
const App = () => {
    const isTabRefreshing = useRef(false);
   //  const isFirstLoad = useRef(true); // Flag to track the first load of the app

    useEffect(() => {
        const isFirstTab = sessionStorage.getItem('isFirstTab');

        if (!isFirstTab) {
            // This is the first time the tab is opened
            sessionStorage.setItem('isFirstTab', 'true');
            // Perform actions specific to the first tab
            localStorage.clear(); // Clear localStorage
        }
        const  handlePageHide= () => {

            isTabRefreshing.current = true;
          
        };

        const handlePageShow  = () => {
            // When the page is shown again, check if it was a refresh and clear local storage
            if (isTabRefreshing.current) {
                localStorage.removeItem('isLogged');
                localStorage.removeItem('emailsai');
                isTabRefreshing.current = false;
            }
        };
       

        window.addEventListener('pagehide', handlePageHide);
        window.addEventListener('pageshow', handlePageShow);
       

        return () => {
            window.removeEventListener('pagehide', handlePageHide);
            window.removeEventListener('pageshow', handlePageShow);
             
        };
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/options" element={<Options />} />
                <Route path='/login1' element={<LoginForm />} />
                <Route path="/profile3" element={<Profile />} />
                <Route path="/profile2" element={<PROFILE />} />
                <Route path="/profile" element={<PROFILE1 />} />
                <Route path="/home" element={<HomeAll />} />
                <Route path="/home1" element={<HomeO />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/card" element={<Card />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Contact/>}/>
                <Route path="/records" element={<Records />} />
                <Route path="/arts" element={<Arts/>}/>
                <Route path="/user/otp" element={<OTP />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
{/* 
import React, { useState } from "react";
import { addTodo } from "./Actions";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "./TodoList";
const App=()=>{
const dispatch=useDispatch();
const [todoTitle,setTodoTitle]=useState("");
const handleTodo=()=>{
    const newTodo={
        title:todoTitle
    }
    dispatch(addTodo(newTodo)) 
    setTodoTitle("")
}
return(
    <>
    <div>
        <h3>Todo App Using Redux</h3>
        <div>
            <input type="text" value={todoTitle} onChange={(e)=>setTodoTitle(e.target.value)}/> 
            <button className="btn" onClick={()=>handleTodo()}>ADD</button>
            <TodoList/>
        </div>
    </div>
    </>
) 
}
export default App;
*/}