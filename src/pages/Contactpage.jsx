//import { useEffect, useState } from "react";
import Contact from "../components/Contact";

const Contactpage = () => {
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
                <Contact />
            {/* )}; */}
        </>
    );
}

export default Contactpage;