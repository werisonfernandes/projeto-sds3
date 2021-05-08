import axios from "axios";
import { useEffect, useState } from "react";
import { SalePage } from "types/sale";
import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/request";

const DataTable = () => {
    const [page, setPage] = useState<SalePage>({
        content: [],
        last: true,
        totalPages: 0,
        totalElements: 0,
        first: true,
        size: 0,
        number: 0,
        numberOfElements: 0,
        empty: false
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales?page=0&size=10&sort=date,desc`)
            .then((response) => {
                const data = response.data as SalePage;
                setPage(data);
            });
    }, []);

    return (
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
                <tbody>{
                    page.content?.map(item => (
                        <tr key={item.id}>
                            <td>{formatLocalDate(item.date, 'dd/MM/yyyy')}</td>
                            <td>{item.seller.name}</td>
                            <td>{item.visited}</td>
                            <td>{item.deals}</td>
                            <td>{item.amount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;