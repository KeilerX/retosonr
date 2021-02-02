const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/">Página principal</a>
      <div className="links">

        <a href="/users">Usuarios</a>
        <a href="/vehicles">Vehículos</a>
        <a href="/observations">Observaciones</a>
        <a href="/logout" style={{ border: "1px solid", borderColor: "black", borderRadius: "8px" }}>Cerrar Sesión</a>
      </div>
    </nav>
  );
}

export default Navbar;