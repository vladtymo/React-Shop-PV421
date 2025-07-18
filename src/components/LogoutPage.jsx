import React, { useContext, useEffect } from 'react'
import { AccountContext } from '../contexts/account.context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// TODO: investigate better approach
export default function LogoutPage() {

    const { clear } = useContext(AccountContext);
    const navigate = useNavigate();

    useEffect(() => {
        clear();
        // navigate(-1);
        navigate("/")
    }, []);

    return <></>
}
