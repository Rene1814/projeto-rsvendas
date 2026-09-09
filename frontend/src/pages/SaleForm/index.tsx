import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import type { Seller } from "../../types/seller";
import type { Sale } from "../../types/sale";
import { BASE_URL } from "../../utils/requests";

const SaleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [sellerId, setSellerId] = useState("");
  const [visited, setVisited] = useState("");
  const [deals, setDeals] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [isLoadingSellers, setIsLoadingSellers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedSeller = sellers.find((seller) => seller.id === Number(sellerId));

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get<Sale>(`${BASE_URL}/sales/${id}`)
      .then((response) => {
        setSellerId(String(response.data.seller.id));
        setVisited(String(response.data.visited));
        setDeals(String(response.data.deals));
        setAmount(String(response.data.amount));
        setDate(response.data.date);
      })
      .catch(() => setError("Não foi possível carregar a venda."));
  }, [id]);

  useEffect(() => {
    axios.get<Seller[]>(`${BASE_URL}/sellers`)
      .then((response) => setSellers(response.data))
      .catch(() => setError("Não foi possível carregar os vendedores."))
      .finally(() => setIsLoadingSellers(false));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const saleData = {
        visited: Number(visited),
        deals: Number(deals),
        amount: Number(amount),
        date,
        seller: { id: Number(sellerId) },
      };

      if (!selectedSeller) {
        setError("Informe o Id de um vendedor cadastrado.");
        setIsSubmitting(false);
        return;
      }

      if (isEditing) {
        await axios.put(`${BASE_URL}/sales/${id}`, saleData);
      } else {
        await axios.post(`${BASE_URL}/sales`, saleData);
      }
      navigate("/dashboard", { state: { saleUpdated: isEditing } });
    } catch {
      setError("Não foi possível cadastrar a venda. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBar />
      <main className="container sale-form-page">
        <div className="seller-form-intro">
          <span className="seller-form-kicker">Registro comercial</span>
          <h1>{isEditing ? "Atualizar venda" : "Cadastrar venda"}</h1>
          <p>{isEditing ? "Mantenha os dados da venda atualizados." : "Associe os resultados da venda ao vendedor responsável."}</p>
        </div>

        <form className="seller-form sale-form" onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}

          <div className="row g-4">
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="sale-seller">Vendedor</label>
              <input
                className="form-select form-select-lg"
                id="sale-seller"
                list="seller-options"
                type="text"
                inputMode="numeric"
                value={sellerId}
                onChange={(event) => setSellerId(event.target.value)}
                disabled={isLoadingSellers}
                placeholder={isLoadingSellers ? "Carregando vendedores..." : "Digite o Id do vendedor"}
                required
              />
              <datalist id="seller-options">
                {sellers.map((seller) => (
                  <option key={seller.id} value={seller.id} label={seller.name} />
                ))}
              </datalist>
              <div className="form-text">
                {selectedSeller ? `Vendedor selecionado: ${selectedSeller.name}` : "Digite o Id ou escolha uma sugestão da lista."}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="sale-date">Data da venda</label>
              <input
                className="form-control form-control-lg"
                id="sale-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label" htmlFor="sale-visited">Clientes visitados</label>
              <input
                className="form-control form-control-lg"
                id="sale-visited"
                type="number"
                min="0"
                step="1"
                value={visited}
                onChange={(event) => setVisited(event.target.value)}
                required
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label" htmlFor="sale-deals">Negócios fechados</label>
              <input
                className="form-control form-control-lg"
                id="sale-deals"
                type="number"
                min="0"
                step="1"
                value={deals}
                onChange={(event) => setDeals(event.target.value)}
                required
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label" htmlFor="sale-amount">Valor da venda</label>
              <input
                className="form-control form-control-lg"
                id="sale-amount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0,00"
                required
              />
            </div>
          </div>

          <div className="seller-form-actions">
            <Link to="/dashboard" className="btn btn-outline-secondary btn-lg">Cancelar</Link>
            <button className="btn btn-primary btn-lg" type="submit" disabled={isSubmitting || isLoadingSellers}>
              {isSubmitting ? (isEditing ? "Atualizando..." : "Cadastrando...") : (isEditing ? "Atualizar venda" : "Cadastrar venda")}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default SaleForm;
