//import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import FeaturedProducts from "../components/FeaturedProducts";
import MonthCategories from "../components/MonthCategories";

const Homepage = () => {
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
                <>
                     <Carousel /> 
                <MonthCategories /> 
                    <FeaturedProducts /> 
                </>
            {/* )}; */}
        </>
    );
}

export default Homepage;