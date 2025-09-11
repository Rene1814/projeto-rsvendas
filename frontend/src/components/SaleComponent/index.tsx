import NavBar from "components/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Seller } from "types/seller";
import { createSale, getSeller } from "utils/requests";

const SaleComponent = () => {

    const [sale, setSale] = useState({
        visited: '',
        deals: '',
        amount: '',
        date: '',
        seller: {} as Seller
    });

    const [errors, setErrors] = useState({ ...sale });

    const navigator = useNavigate();

    function saveSale(e: any) {
        e.preventDefault();

        if (validateSale()) {
            createSale(sale).then(response => {
                console.log("Vendedor cadastrado com sucesso!", response.data);
                navigator('/dashboard');
            }).catch(error => {
                console.error("Ocorreu um erro ao cadastrar o vendedor!", error);
                navigator('/dashboard');
            }).catch(error => {
                console.error(error);
            });
        }
    }

    function validateSale() {
        let valid = true;
        const errorsCopy = { ...sale }


        if (sale.visited?.trim()) {
            errorsCopy.visited = "";
        } else {
            errorsCopy.visited = "Nº de visistas obrigatório.";
            valid = false;
        }

        if (sale.deals?.trim()) {
            errorsCopy.deals = "";
        } else {
            errorsCopy.deals = "Nº de negócios obrigatório.";
            valid = false;
        }

        if (sale.amount?.trim()) {
            errorsCopy.amount = "";
        } else {
            errorsCopy.amount = "Valor obrigatório";
            valid = false;
        }

        if (sale.date?.trim()) {
            errorsCopy.date = "";
        } else {
            errorsCopy.date = "Data obrigatória";
            valid = false;
        }

        if (sale.seller?.id) { // Verifica se a propriedade 'id' existe e tem um valor
            errorsCopy.seller = {} as Seller;
        } else {
            errorsCopy.seller = { ...errorsCopy.seller, id: undefined };
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className="text-center">Cadastrar Venda</h2>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb2">
                                    <label className="form-label">Clientes Visitados</label>
                                    <input
                                        type="text"
                                        placeholder="Quantidade"
                                        name="visited"
                                        value={sale.visited}
                                        className={`form-control ${errors.visited ? 'is-invalid' : ''}`}
                                        onChange={e => setSale({ ...sale, visited: e.target.value })}
                                    />
                                </div>
                                <div className="form-group mb2">
                                    <label className="form-label">Negócios Fechados</label>
                                    <input
                                        type="text"
                                        placeholder="Quantidade"
                                        name="deals"
                                        value={sale.deals}
                                        className={`form-control ${errors.deals ? 'is-invalid' : ''}`}
                                        onChange={e => setSale({ ...sale, deals: e.target.value })}
                                    />
                                </div>
                                <div className="form-group mb2">
                                    <label className="form-label">Valor</label>
                                    <input
                                        type="text"
                                        placeholder="Em dólares"
                                        name="amount"
                                        value={sale.amount}
                                        className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                                        onChange={e => setSale({ ...sale, amount: e.target.value })}
                                    />
                                </div>
                                <div className="form-group mb2">
                                    <label className="form-label">Data</label>
                                    <input
                                        type="text"
                                        placeholder="DD/MM/AAAA"
                                        name="date"
                                        value={sale.date}
                                        className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                        onChange={e => setSale({ ...sale, date: e.target.value })}
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Nº"
                                    name="id"
                                    value={sale.seller?.id || ''} // Usamos optional chaining e fallback para evitar erros de renderização inicial
                                    className={`form-control ${errors.seller?.id ? 'is-invalid' : ''}`}
                                    onChange={e => {
                                        const id = Number(e.target.value);
                                        if (id) {
                                            getSeller(id).then(response => {
                                                // Atualizamos o estado `sale` com o vendedor retornado pela API
                                                setSale({ ...sale, seller: response.data });
                                            }).catch(error => {
                                                console.error("Erro ao buscar vendedor:", error);
                                                setSale({ ...sale, seller: {} as Seller });
                                            });
                                        }
                                    }}
                                />

                                <button className="btn btn-success" onClick={saveSale}>Salvar</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SaleComponent;