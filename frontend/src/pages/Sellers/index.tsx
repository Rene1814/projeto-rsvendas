import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import type { Seller } from "../../types/seller";
import { BASE_URL } from "../../utils/requests";

const Sellers = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    axios.get<Seller[]>(`${BASE_URL}/sellers`)
      .then((response) => setSellers(response.data))
      .catch(() => setError("Não foi possível carregar os vendedores."))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (seller: Seller) => {
    if (!window.confirm(`Deseja excluir o vendedor ${seller.name}?`)) {
      return;
    }

    setError("");
    setDeletingId(seller.id);

    try {
      await axios.delete(`${BASE_URL}/sellers/${seller.id}`);
      setSellers((currentSellers) => currentSellers.filter((item) => item.id !== seller.id));
    } catch {
      setError("Não foi possível excluir o vendedor. Tente novamente.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <NavBar />
      <main className="container sellers-page">
        <div className="sellers-page-header">
          <div>
            <span className="seller-form-kicker">Equipe comercial</span>
            <h1>Vendedores cadastrados</h1>
            <p>Consulte os identificadores para associar vendas ao vendedor correto.</p>
          </div>
          <span className="sellers-count">
            {sellers.length} {sellers.length === 1 ? "vendedor" : "vendedores"}
          </span>
          <Link to="/sales/new" className="btn btn-primary">
            Cadastrar venda
          </Link>
        </div>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        <div className="sellers-table-shell">
          <div className="table-responsive">
            <table className="table sellers-table align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Nível</th>
                  <th scope="col" className="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td className="text-center py-4" colSpan={5}>Carregando vendedores...</td>
                  </tr>
                )}
                {!isLoading && !error && sellers.length === 0 && (
                  <tr>
                    <td className="text-center py-4" colSpan={5}>Nenhum vendedor cadastrado.</td>
                  </tr>
                )}
                {!isLoading && sellers.map((seller) => (
                  <tr key={seller.id}>
                    <td><span className="seller-id">#{seller.id}</span></td>
                    <td className="seller-name">{seller.name}</td>
                    <td>{seller.email}</td>
                    <td>
                      {seller.sellerLevel ? (
                        <span className={`seller-level seller-level-${seller.sellerLevel.toLowerCase()}`}>
                          {seller.sellerLevel}
                        </span>
                      ) : (
                        <span className="seller-level seller-level-unassigned">Não informado</span>
                      )}
                    </td>
                    <td className="text-end">
                      <Link to={`/sellers/${seller.id}/edit`} className="btn btn-sm btn-outline-primary">
                        Editar
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger btn-spaced"
                        type="button"
                        onClick={() => handleDelete(seller)}
                        disabled={deletingId === seller.id}
                      >
                        {deletingId === seller.id ? "Excluindo..." : "Excluir"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Sellers;
