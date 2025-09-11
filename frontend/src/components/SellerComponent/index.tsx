import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Seller } from "types/seller";
import { createSeller, getSeller, updateSeller } from "utils/requests";

const SellerComponent = () => {

    // Pega o id que vem do Atualizar junto com a url,
    const { id } = useParams();

    const [seller, setSeller] = useState<Seller>({
        name: "",
        email: "",
        level: ""
    });

    useEffect(() => {
        if (id){
            const idSeller = Number(id);
            getSeller(idSeller).then((response) => {
                setSeller(response.data)
            }).catch(error => {
                console.log(error);
            })
        }
    }, [id])

    const [errors, setErrors] = useState<Seller>({ ...seller })

    const navigator = useNavigate();

    function saveOrUpdateSeller(e: { preventDefault: () => void; }) {
        e.preventDefault();

        if (validateForm()) {

            if (id){
                const idSeller = Number(id)
                updateSeller(idSeller, seller).then((response) => {
                    console.log(response.data);
                    navigator('/sellers-list')
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createSeller(seller).then(response => {
                    console.log("Vendedor cadastrado com sucesso!", response.data);
                    navigator('/sellers-list');
                }).catch(error => {
                    console.error("Ocorreu um erro ao cadastrar o vendedor!", error);
                    navigator('/sellers-list');
                }).catch(error => {
                    console.error(error);
                });
            }   
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...seller }

        if (seller.name?.trim()) {
            errorsCopy.name = "";
        } else {
            errorsCopy.name = "Obrigatório informar o nome.";
            valid = false;
        }

        if (seller.email?.trim()) {
            errorsCopy.email = "";
        } else {
            errorsCopy.email = "Obrigatório informar o email.";
            valid = false;
        }

        if (seller.level?.trim()) {
            errorsCopy.level = "";
        } else {
            errorsCopy.level = "Obrigatório informar o nível.";
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle(){
        if (id){
            return <h2 className="text-center">Atualizar Vendedor</h2>
        } else {
            return <h2 className="text-center">Cadastrar Vendedor</h2>
        }
    }

    return (
        <>
            <NavBar/>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            pageTitle()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label"><h6>Nome:</h6></label>
                                    <input
                                        type="text"
                                        placeholder="Digite o nome do vendedor"
                                        name="name"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        value={seller.name}
                                        onChange={e => setSeller({ ...seller, name: e.target.value })}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"><h6>Email:</h6></label>
                                    <input
                                        type="text"
                                        placeholder="Digite o email do vendedor"
                                        name="email"
                                        value={seller.email}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        onChange={e => setSeller({ ...seller, email: e.target.value })}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}

                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"><h6>Nível: JUNIOR, MIDLEVEL ou SENIOR</h6></label>
                                    <input
                                        type="text"
                                        placeholder="Digite o nível do vendedor em letras maiúsculas"
                                        name="level"
                                        value={seller.level}
                                        className={`form-control ${errors.level ? 'is-invalid' : ''}`}
                                        onChange={e => setSeller({ ...seller, level: e.target.value })}
                                    />
                                    {errors.level && <div className="invalid-feedback">{errors.level}</div>}

                                </div>
                                <button className="btn btn-success" onClick={saveOrUpdateSeller}>Salvar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default SellerComponent;