import React, { createContext, useEffect, useState } from 'react';
import { getData } from '../../public/Utilitis/Localstorage';

export const UserProvider = createContext(null)

const AuthContext = ({ children }) => {

    const [todo, setTodo] = useState(false)
    const [dataFilter, setDataFilter] = useState([])

    useEffect(() => {
        setDataFilter(getData())
    }, [todo])

    console.log(dataFilter)

    const sendValue = {
        todo,
        setTodo,
        dataFilter,
        setDataFilter
    }

    return (
        <UserProvider.Provider value={sendValue}>
            {children}
        </UserProvider.Provider>
    );
};

export default AuthContext;