import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { BASE_URL } from "../../utils/requests";
import type { Seller } from "../../types/seller";

const sellerLevels: Seller["sellerLevel"][] = ["JUNIOR", "PLENO", "SENIOR"];

const SellerForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sellerLevel, setSellerLevel] = useState<Seller["sellerLevel"] | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await axios.post(`${BASE_URL}/sellers`, {
        name,
        email,
        sellerLevel,
      });
      navigate("/", { state: { sellerCreated: true } });
    } catch {
      setError("Não foi possível cadastrar o vendedor. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBar />
      <main className="container seller-form-page">
        <div className="seller-form-intro">
          <span className="seller-form-kicker">Equipe comercial</span>
          <h1>Cadastrar vendedor</h1>
          <p>Adicione uma pessoa à equipe para começar a acompanhar seus resultados.</p>
        </div>

        <form className="seller-form" onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}

          <div className="row g-4">
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="seller-name">Nome completo</label>
              <input
                className="form-control form-control-lg"
                id="seller-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex.: Maria Souza"
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="seller-email">E-mail</label>
              <input
                className="form-control form-control-lg"
                id="seller-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="maria@empresa.com"
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="seller-level">Nível do vendedor</label>
              <select
                className="form-select form-select-lg"
                id="seller-level"
                value={sellerLevel}
                onChange={(event) => setSellerLevel(event.target.value as Seller["sellerLevel"])}
                required
              >
                <option value="">Selecione um nível</option>
                {sellerLevels.map((level) => <option key={level} value={level}>{level}</option>)}
              </select>
            </div>
          </div>

          <div className="seller-form-actions">
            <Link to="/" className="btn btn-outline-secondary btn-lg">Cancelar</Link>
            <button className="btn btn-primary btn-lg" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar vendedor"}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default SellerForm;
