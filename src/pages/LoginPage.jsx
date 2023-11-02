//import { useEffect, useState } from "react";
import Login from "../components/Login";

const LoginPage = () => {
/*     const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []); */

    return (
        <>
{/*             {loading ? (
                <div className="loader-container">
                    <div className="spinner" />
                </div>
            ) : ( */}
                <Login />
            {/* )}; */}
        </>
    );
}

export default LoginPage;