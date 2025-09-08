import { useState } from "react";
import { Seller } from "types/seller";

const SellerComponent = () => {

    const [seller, setSeller] = useState<Seller>({
        name: "",
        email: "",
        level: ""
    });

    function saveSeller(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log(seller);
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className="text-center">Cadastrar Vendedor</h2>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label"><h6>Nome:</h6></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Digite o nome do vendedor"
                                        name="name"
                                        value={seller.name}
                                        onChange={e => setSeller({ ...seller, name: e.target.value })}
                                    />
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"><h6>Email:</h6></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Digite o email do vendedor"
                                        name="email"
                                        value={seller.email}
                                        onChange={e => setSeller({ ...seller, email: e.target.value })}
                                    />
                                </div>
                                        
                                <div className="form-group mb-2">
                                    <label className="form-label"><h6>Nível: JUNIOR, MIDLEVEL ou SENIOR</h6></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Digite o nível do vendedor em letras maiúsculas"
                                        name="level"
                                        value={seller.level}
                                        onChange={e => setSeller({ ...seller, level: e.target.value })}
                                    />
                                </div>
                                <button className="btn btn-success" onClick={saveSeller}>Salvar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SellerComponent;