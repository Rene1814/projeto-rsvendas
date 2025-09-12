import axios from "axios";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SalePage } from "types/sale";
import { formatLocalDate } from "utils/format";
import { BASE_URL, deleteSale } from "utils/requests";

const DataTable = () => {

    const [activePage, setActivePage] = useState(0);

    const navigator = useNavigate();

    const [page, setPage] = useState<SalePage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });
    
    useEffect(() => {
        getAllSales();
    }, );

    function getAllSales() {
        axios.get(`${BASE_URL}/sales?page=${activePage}&size=20&sort=date,desc`)
            .then(response => {
                setPage(response.data);
            });
    }

    const changePage = (index: number) => {
        setActivePage(index);
    }

    function updateSale(id?: number) {
        navigator(`/edit-sale/${id}`);
    }

    function removeSale(id: number | undefined) {
        deleteSale(id)
            .then(() => {
                getAllSales(); // Recarrega a lista atualizada
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <Pagination page={page} onPageChange={changePage} />
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Vendedor</th>
                            <th>Clientes visitados</th>
                            <th>Negócios fechados</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {page.content?.map(item => (
                            <tr key={item.id}>
                                <td>{formatLocalDate(item.date, "dd/MM/yyyy")}</td>
                                <td>{item.seller.name}</td>
                                <td>{item.visited}</td>
                                <td>{item.deals}</td>
                                <td>{Number(item.amount).toFixed(2)}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => updateSale(item.id)}>Atualizar</button>{' '}
                                    <button className="btn btn-danger" onClick={() => removeSale(item.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DataTable;
