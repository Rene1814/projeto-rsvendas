import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

const Home = () => {
  const location = useLocation();
  const sellerCreated = location.state?.sellerCreated === true;

  return (
    <>
    <NavBar />
    <div className="container">
      {sellerCreated && (
        <div className="alert alert-success mt-3" role="status">
          Vendedor cadastrado com sucesso.
        </div>
      )}
      <div className="jumbotron">
        <h1 className="display-4">DSVendas</h1>
        <p className="lead">
          Analise o desempenho das suas vendas por diferentes perspectivas
        </p>
        <hr />
        <p>
          Esta aplicação consiste em exibir um dashboard a partir de dados fornecidos por um back end construído com Spring Boot.
        </p>
        <Link to="/dashboard" className="btn btn-primary btn-lg">
          Acessar dashboard
        </Link>
        <Link to="/sellers/new" className="btn btn-outline-primary btn-lg btn-spaced">
          Cadastrar vendedor
        </Link>
        <Link to="/sellers" className="btn btn-outline-dark btn-lg btn-spaced">
          Ver vendedores
        </Link>
        <Link to="/sales/new" className="btn btn-outline-success btn-lg btn-spaced">
          Cadastrar venda
        </Link>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Home;
