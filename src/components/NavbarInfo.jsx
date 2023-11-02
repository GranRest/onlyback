const NavbarInfo = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block"
      id="templatemo_nav_top"
    >
      <div className="container text-light">
        <div className="w-100 d-flex justify-content-between">
          <div>
            <i className="fa fa-envelope mx-2"></i>
            <a
              className="navbar-sm-brand text-light text-decoration-none"
              href="#?"
            >
              granresttecnology2021@gmail.com
            </a>
            <i className="fa fa-phone mx-2"></i>
            <a
              className="navbar-sm-brand text-light text-decoration-none"
              href="#?"
            >
              0993273984
            </a>
          </div>
          <div>
            <a
              className="text-light"
              href="https://www.facebook.com/GranRestTecnology"
              target="_blank"
              rel="sponsored"
            >
              <i className="fab fa-facebook-f fa-sm fa-fw me-2" />
            </a>
            <a className="text-light" href="#?" target="_blank">
              <i className="fab fa-instagram fa-sm fa-fw me-2" />
            </a>
            <a className="text-light" href="#?" target="_blank">
              <i className="fab fa-twitter fa-sm fa-fw me-2" />
            </a>
            <a
              className="text-light"
              href="https://www.linkedin.com/in/luis-anrrango-a8a25a133/"
              target="_blank"
            >
              <i className="fab fa-linkedin fa-sm fa-fw" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarInfo;
