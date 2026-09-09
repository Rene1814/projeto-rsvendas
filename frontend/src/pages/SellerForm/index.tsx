import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { BASE_URL } from "../../utils/requests";
import type { Seller, SellerLevel } from "../../types/seller";

const sellerLevels: SellerLevel[] = ["JUNIOR", "PLENO", "SENIOR"];

const SellerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sellerLevel, setSellerLevel] = useState<SellerLevel | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get<Seller>(`${BASE_URL}/sellers/${id}`)
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email ?? "");
        setSellerLevel(response.data.sellerLevel ?? "");
      })
      .catch(() => setError("Não foi possível carregar o vendedor."));
  }, [id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const sellerData = {
        name,
        email,
        sellerLevel,
      };

      if (isEditing) {
        await axios.put(`${BASE_URL}/sellers/${id}`, sellerData);
      } else {
        await axios.post(`${BASE_URL}/sellers`, sellerData);
      }
      navigate("/sellers", { state: { sellerUpdated: isEditing } });
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
          <h1>{isEditing ? "Atualizar vendedor" : "Cadastrar vendedor"}</h1>
          <p>{isEditing ? "Mantenha os dados do vendedor atualizados." : "Adicione uma pessoa à equipe para começar a acompanhar seus resultados."}</p>
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
                onChange={(event) => setSellerLevel(event.target.value as SellerLevel)}
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
              {isSubmitting ? (isEditing ? "Atualizando..." : "Cadastrando...") : (isEditing ? "Atualizar vendedor" : "Cadastrar vendedor")}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default SellerForm;
