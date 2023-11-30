import { useEffect } from "react";
import Carousel from "../components/Carousel";
import FeaturedProducts from "../components/FeaturedProducts";
import MonthCategories from "../components/MonthCategories";
import Swal from "sweetalert2";
const Homepage = () => {
  /*     const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []); */
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");

    // Verifica si es la primera visita
    if (!hasVisitedBefore) {
      // Muestra el mensaje de bienvenida
      const welcomeToast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 5000, // 5000 milisegundos (5 segundos)
      });

      welcomeToast.fire({
        title: "¡Bienvenido!",
        text: "Gracias por visitarnos. ¿En qué podemos ayudarte?",
        icon: "info",
      });

      // Marca la visita para que no se muestre nuevamente
      localStorage.setItem("hasVisitedBefore", "true");
    }
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

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
};

export default Homepage;
