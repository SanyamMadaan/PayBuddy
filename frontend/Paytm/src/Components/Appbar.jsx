import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function Appbar() {
    const [name, setName] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('authorization');
            if (token) {
                const actualtoken = token.split(' ')[1];
                const UserId = jwtDecode(actualtoken).userId;
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

    return (
        <div className="flex justify-between m-2 p-2">
            <h1>Paybuddy</h1>
            {name ? (
                <div className="flex mr-2">
                    <h1 className="mr-1">Hello</h1>
                    <span className="text-red-800  font-semibold">{name}</span>
                </div>
            ) : null}
        </div>
    );
}
