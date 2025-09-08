const SellersList = () => {

    const dummySellers = [
        {
            "id": 1,
            "name": "Seller One",
            "email": "sellerone@gmail.com",
            "level": "JUNIOR"
        },
        {
            "id": 2,
            "name": "Seller Two",
            "email": "sellertwo@yahoo.com.br",
            "level": "MID"
        },
        {
            "id": 3,
            "name": "Seller Three",
            "email": "sellertree@outlook.com",
            "level": "SENIOR"
        }
    ];

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
                        dummySellers.map(seller => (
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