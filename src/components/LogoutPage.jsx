import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { clearEmail } from '../redux/account/account.actions';
// import { AccountContext } from '../contexts/account.context';

// TODO: investigate better approach
export default function LogoutPage() {

    // const { clear } = useContext(AccountContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // clear();
        dispatch(clearEmail());

        // navigate(-1);
        navigate("/")
    }, []);

    return <></>
}
