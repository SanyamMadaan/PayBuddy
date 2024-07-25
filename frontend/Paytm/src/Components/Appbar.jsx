import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Appbar() {
    const navigate=useNavigate();
    const [name, setName] = useState(null);
    const[UserId,setUserId]=useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('authorization');
            if (token) {
                const actualtoken = token.split(' ')[1];
                const UserId = jwtDecode(actualtoken).userId;
                setUserId(UserId);
                console.log("UserId is " + UserId);

                try {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/findUserName?userId=${UserId}`);
                    const userName = response.data.Name;
                    setName(userName);
                    console.log(userName);
                } catch (e) {
                    console.log('Error while fetching username: ' + e);
                }
            }
        };
        fetchUser();
    }, []);

    function Logout(){
        const info=confirm('If you Logout you need to login again');
        if(info){
            localStorage.removeItem('authorization');
            navigate('/');
        }
    }


    return (
        <div className="flex justify-between m-2 p-2">
            <h1 className='text-3xl font-bold'>Paybuddy</h1>
            {name ? (
                <div className='flex'>
                <div className="flex mr-4">
                    <h1 className="mr-1">Hello</h1>
                    <span className="text-red-800  font-semibold">{name}</span>
                </div>
                <div className='logout cursor-pointer font-bold mr-4'>
                    <button onClick={Logout}>Log Out</button>
                </div>
                </div>
            ) : null}
        </div>
    );
}
