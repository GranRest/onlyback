//import { useEffect, useState } from "react";
import About from "../components/About";

const Aboutpage = () => {
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
                <About />
            {/* )}; */}
        </>
    );
}

export default Aboutpage;