import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { useEffect, useState } from "react";
import { Sellers } from "types/seller";
import { deleteSeller, sellersList } from "utils/requests";
import { useNavigate } from "react-router-dom";

const SellersList = () => {

    const [sellers, setSellers] = useState<Sellers>([]);

    const navigator = useNavigate();

    useEffect(() => {
       getAllSellers();
    }, []);

    function getAllSellers(){
        sellersList().then(response => {
            setSellers(response.data);
        }).catch(error => {
            console.error("Ocorreu um erro ao listar os vendedores!", error);
        });
    }

    function addNewSeller() {
        navigator('/add-seller');
    }

    function updateSeller(id: number | undefined) {
        navigator(`/edit-seller/${id}`);
    }

    function removeSeller(id: number | undefined){
        console.log(id);

        deleteSeller(id).then((response) => {
            getAllSellers();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <>
            <NavBar />
            <div className="container">
                <h2 className="text-center">Lista de Vendedores</h2>
                <button className="btn btn-primary mb-2" onClick={addNewSeller}>Cadastrar Vendedor</button>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome do vendedor</th>
                            <th>Email do vendedor</th>
                            <th>Nível do vendedor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map(seller => (
                                <tr key={seller.id}>
                                    <td>{seller.id}</td>
                                    <td>{seller.name}</td>
                                    <td>{seller.email}</td>
                                    <td>{seller.level}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={
                                            () => updateSeller(seller.id)}>Atualizar
                                        </button>

                                        <button className="btn btn-danger btn-spaced" onClick={
                                            () => removeSeller(seller.id)}>Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}

export default SellersList;