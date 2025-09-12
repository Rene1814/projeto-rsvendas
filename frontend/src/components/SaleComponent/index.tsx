import NavBar from "components/NavBar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Seller } from "types/seller";
import { createSale, getSale, getSeller, updateSale } from "utils/requests";

const SaleComponent = () => {

    const [sale, setSale] = useState({
        visited: '',
        deals: '',
        amount: '',
        date: '',
        seller: {} as Seller
    });

    const { id } = useParams();

    const [errors, setErrors] = useState({ idAlert: "", ...sale });

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getSale(Number(id)).then((response) => {
                setSale(response.data);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    function saveOrUpdateSale(e: any) {
        e.preventDefault();

        if (validateSale()) {

            if (id) {
                updateSale(Number(id), sale).then((response) => {
                    console.log(response.data);
                    navigator('/dashboard');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createSale(sale).then(response => {
                    console.log("Vendedor cadastrado com sucesso!", response.data);
                    navigator('/dashboard');
                }).catch(error => {
                    console.error("Ocorreu um erro ao cadastrar o vendedor!", error);
                    navigator('/dashboard');
                });
            }
        }
    }

    function validateSale() {
        let valid = true;
        const errorsCopy = { idAlert: "", ...sale }

        if (sale.visited) {
            errorsCopy.visited = "";
        } else {
            errorsCopy.visited = "Nº de visistas obrigatório.";
            valid = false;
        }

        if (sale.deals) {
            errorsCopy.deals = "";
        } else {
            errorsCopy.deals = "Nº de negócios obrigatório.";
            valid = false;
        }

        if (sale.amount) {
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
            errorsCopy.idAlert = "Id do vendedor obrigatório"
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Atualizar Venda</h2>
        } else {
            <h2 className="text-center">Cadastrar Venda</h2>
        }
    }

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            pageTitle()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group mb2">
                                    <label className="form-label">Clientes Visitados</label>
                                    <input
                                        type="text"
                                        placeholder="Quantidade"
                                        name="visited"
                                        value={sale.visited}
                                        className={`form-control ${errors.visited ? "is-invalid" : ""}`}
                                        onChange={e => setSale({ ...sale, visited: e.target.value })}
                                    />
                                    {errors.visited && <div className="invalid-feedback"> {errors.visited} </div>}
                                </div>
                                <div className="form-group mb2">
                                    <label className="form-label">Negócios Fechados</label>
                                    <input
                                        type="text"
                                        placeholder="Quantidade"
                                        name="deals"
                                        value={sale.deals}
                                        className={`form-control ${errors.deals ? "is-invalid" : ""}`}
                                        onChange={e => setSale({ ...sale, deals: e.target.value })}
                                    />
                                    {errors.deals && <div className="invalid-feedback"> {errors.deals} </div>}
                                </div>
                                <div className="form-group mb2">
                                    <label className="form-label">Valor</label>
                                    <input
                                        type="text"
                                        placeholder="Em dólares"
                                        name="amount"
                                        value={sale.amount}
                                        className={`form-control ${errors.amount ? "is-invalid" : ""}`}
                                        onChange={e => setSale({ ...sale, amount: e.target.value })}
                                    />
                                    {errors.amount && <div className="invalid-feedback"> {errors.amount} </div>}
                                </div>
                                <div className="form-group mb2">
                                    <label className="form-label">Data</label>
                                    <input
                                        type="text"
                                        placeholder="DD/MM/AAAA"
                                        name="date"
                                        value={sale.date}
                                        className={`form-control ${errors.date ? "is-invalid" : ""}`}
                                        onChange={e => setSale({ ...sale, date: e.target.value })}
                                    />
                                    {errors.date && <div className="invalid-feedback"> {errors.date} </div>}
                                </div>
                                <div className="form-group mb2">
                                    <label className="form-label">Id do vendedor</label>
                                    <input
                                        type="text"
                                        placeholder="Nº"
                                        name="id"
                                        value={sale.seller?.id || ''}
                                        className={`form-control ${errors.idAlert ? "is-invalid" : ""}`}
                                        onChange={e => {
                                            const id = Number(e.target.value);
                                            if (id) {
                                                getSeller(id).then(response => {
                                                    setSale({ ...sale, seller: response.data });
                                                }).catch(error => {
                                                    console.error("Erro ao buscar vendedor:", error);
                                                    setSale({ ...sale, seller: {} as Seller });
                                                });
                                            } else {
                                                // Quando o campo estiver vazio ou inválido, limpa o seller
                                                setSale({ ...sale, seller: {} as Seller });
                                            }
                                        }}
                                    />
                                    {errors.idAlert && <div className="invalid-feedback"> {errors.idAlert} </div>}
                                </div>
                                <button className="btn btn-success" onClick={saveOrUpdateSale}>Salvar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SaleComponent;