import { useEffect, useState } from "react";
import type { SalePage } from "../../types/sale";
import { BASE_URL } from "../../utils/requests";
import axios from "axios";
import { formatLocalDate } from "../../utils/format";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";

type DataTableProps = {
  onSaleDeleted?: () => void;
};

const DataTable = ({ onSaleDeleted }: DataTableProps) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [page, setPage] = useState<SalePage>({
    totalPages: 0,
    totalElements: 0,
    last: false,
    number: 0,
    first: false,
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales?page=${page.number}&size=20&sort=date,desc`)
      .then((response) => {
        const data = response.data as SalePage;
        setPage(data);
      });
  }, [page.number]);

  const handleDelete = async (saleId: number) => {
    if (!window.confirm(`Deseja excluir a venda #${saleId}?`)) {
      return;
    }

    setDeleteError("");
    setDeletingId(saleId);

    try {
      await axios.delete(`${BASE_URL}/sales/${saleId}`);
      setPage((currentPage) => ({
        ...currentPage,
        content: currentPage.content?.filter((sale) => sale.id !== saleId),
        totalElements: Math.max(0, currentPage.totalElements - 1),
      }));
      onSaleDeleted?.();
    } catch {
      setDeleteError("Não foi possível excluir a venda. Tente novamente.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
    {deleteError && <div className="alert alert-danger" role="alert">{deleteError}</div>}
    <Pagination page={page} onPageChange={(newPage) => setPage({...page, number: newPage})} />
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Data</th>
              <th>Vendedor</th>
              <th>Clientes visitados</th>
              <th>Negócios fechados</th>
              <th>Valor</th>
              <th className="text-end">Ações</th>
            </tr>
          </thead>
          <tbody>
            {page.content?.map((item) => (
              <tr key={item.id}>
                <td>{formatLocalDate(item.date, "dd/MM/yyyy")}</td>
                <td>{item.seller.name}</td>
                <td>{item.visited}</td>
                <td>{item.deals}</td>
                <td>{item.amount.toFixed(2)}</td>
                <td className="text-end">
                  <Link to={`/sales/${item.id}/edit`} className="btn btn-sm btn-outline-primary">
                    Editar
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger btn-spaced"
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                  >
                    {deletingId === item.id ? "Excluindo..." : "Excluir"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
