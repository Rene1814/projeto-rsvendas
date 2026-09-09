import { useEffect, useState } from "react";
import type { SalePage } from "../../types/sale";
import { BASE_URL } from "../../utils/requests";
import axios from "axios";
import { formatLocalDate } from "../../utils/format";
import Pagination from "../Pagination";

const DataTable = () => {
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

  return (
    <>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
