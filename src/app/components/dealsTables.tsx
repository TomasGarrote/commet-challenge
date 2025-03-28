
import { fetchDeals } from '../lib/data';
import { transformDealsA, transformDealsB, transformDealsAPI } from '../utils/transformData';

export default async function Page() {
  const deals = await fetchDeals();
  
  // Simulamos la obtención de los datos de CRM A y CRM B
  const crmAData = [
    { deal_id: "A1", total: 5000, rep_name: "Ana Pérez", sold_at: "2024-03-01" },
    { deal_id: "A2", amount: 4500, rep_name: "Juan Gómez", created_on: "2024-03-02" }
  ];

  const crmBData = [
    { opportunity_id: "B1", amount: 3000, seller: "Carlos García", deal_date: "2024/03/03" },
    { opportunity_id: "B2", amount: 4500, seller: "Maria García", deal_date: "2024/03/04" }
  ];



  const transformedDeals = [
        ...transformDealsA(crmAData),
        ...transformDealsB(crmBData),
        ...(deals?.length ? transformDealsAPI(deals) : []),
      ];


  //juntamos todos los amounts para sacar el total de comision, calculando el 10% de cada comision individual
  const totalCommission = transformedDeals.reduce((acc, deal) => acc + deal.amount * 0.1, 0);

  return (
    <div className="bg-black">
      <table className="bg-black">
        <thead>
          <tr className="bg-black">
            <th className="border p-2">ID</th>
            <th className="border p-2">Vendedor</th>
            <th className="border p-2">Monto</th>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Comisión (10%)</th>
          </tr>
        </thead>
        <tbody>
          {transformedDeals.map(deal => (
            <tr key={deal.id} className="border">
              <td className="border p-2">{deal.id}</td>
              <td className="border p-2">{deal.salesperson}</td>
              <td className="border p-2">${deal.amount}</td>
              <td className="border p-2">{new Date(deal.date).toLocaleDateString()}</td>
              <td className="border p-2">${(deal.amount * 0.1).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 font-bold">Total Comisión: ${totalCommission.toFixed(2)}</div>
    </div>
  );
};

  