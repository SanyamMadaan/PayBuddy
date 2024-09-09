import axios from 'axios';
import { Inputs } from "./Inputs";
import { useEffect, useState, useRef } from 'react';
import { Transfer_btn } from './Transfer_btn';
import { useNavigate } from 'react-router-dom';


export function Userlist() {
    const navigate=useNavigate();
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const timeoutRef = useRef(null);


    useEffect(() => {
        async function getUsers() {
            try {
                const allusers = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/bulk?filter=${query}`);
                setUsers(allusers.data.user);
                console.log("user fetch success", allusers.data);
            } catch (e) {
                console.log("error fetching data", e);
            }
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            getUsers();
        }, 500);

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [query]);

    useEffect(() => {
        console.log(users);
    }, [users]);

    return (
        <div className='ml-4 mr-6'>
            <h2 className="mt-4 font-bold text-2xl">Users</h2>
            <div className=" my-3">
                <Inputs onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search users..." />
            </div>
            <div>
                {users && users.map((user) => (
                
                         <div className='flex justify-between' key={user._id}>
                        <div className='flex mb-3'>
                            <button className='mr-2 px-3 bg-slate-100 border-1-white rounded-full'>{user.firstname[0].toUpperCase()+user.lastname[0].toUpperCase()}</button>
                            <h2 className='ml-1 m-2 text-xl'>{user.firstname}</h2>
                            <h2 className='ml-1 m-2 text-xl'>{user.lastname}</h2>
                        </div>
                        <div>
                            <Transfer_btn onClick={(e)=>{
                                e.preventDefault();
                                navigate(`/send?id=${user._id}&name=${user.firstname}`);
                            }} label="Send Money" />
                        </div>
                    </div>
                                        
                ))}
            </div>
        </div>
    );
}