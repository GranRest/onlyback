import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
//import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../api/authenticationService';
import { useNavigate } from "react-router-dom";

export const Dashboard = (props) => {

    //const dispatch = useDispatch();
    //const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();

    React.useEffect(() => {
        fetchUserData().then((response) => {
            setData(response.data);
        }).catch((e) => {
            localStorage.clear();
            navigate('/');
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logOut = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <Container>
            <div className='dashboard-container'>
                <h4>Hola {data && `${data.firstName} ${data.lastName}`}</h4>
                <br></br>
                {data && data.roles && data.roles.filter(value => value.roleCode === 'ADMIN').length > 0
                    && <Button type="variant">Añadir Usuario</Button>}
                <br></br>
                <Button className='dashboard-button' onClick={() => logOut()}>Cerrar sesión</Button>
            </div>
        </Container>
    )
}