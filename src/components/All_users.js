import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function All_users() {
    const [users, setUsers] = useState([]);
    const [record, setRecord] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/all_users')
            .then(result => {
                setUsers(result.data);
                setRecord(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const deleteUser = (userId) => {
        const id = userId;
        if(window.confirm("are you sure to discard user "))
        {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(result => {
                console.log("user delete");
                console.log(result.data);
                let prevusers = record.filter(user => user._id !== id);
                setRecord(prevusers);
                setUsers(prevusers);
            })
            .catch(err => {
                alert("error while deleting");
            });
        }
    };

    const search_user = (event) => {
        setSearch(event.target.value);
        setRecord(users.filter(user => user.name.toLowerCase().includes(event.target.value.toLowerCase())));
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">All Users</h1>
            <input 
                type='search' 
                placeholder='Search user' 
                className="w-full py-2 px-4 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                value={search}
                onChange={search_user}
            />
            
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Phone</th>
                        <th className="py-2 px-4">Role</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {record.map((user, index) => (
                        <tr key={index} className="border-t border-gray-300">
                            <td className="py-2 px-4">{user.email}</td>
                            <td className="py-2 px-4">{user.phone}</td>
                            <td className="py-2 px-4">{user.role}</td>
                            <td className="py-2 px-4">
                                <button
                                    onClick={() => deleteUser(user._id)}
                                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
