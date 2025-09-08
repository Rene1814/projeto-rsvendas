import { useEffect, useState } from "react";
import { Sellers } from "types/seller";
import { sellersList } from "utils/requests";

const SellersList = () => {

    const [sellers, setSellers] = useState<Sellers>([]);

    useEffect(() => {
        sellersList().then(response => {
            setSellers(response.data);
        }).catch(error => {
            console.error("Ocorreu um erro ao listar os vendedores!", error);
        });
    }, []);

    return (
        <div className="container">
            <h2 className="text-center">Lista de Vendedores</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome do vendedor</th>
                        <th>Email do vendedor</th>
                        <th>Nível do vendedor</th>
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
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default SellersList;