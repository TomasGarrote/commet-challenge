'use client'

import React, { useState, useEffect } from 'react';
import { StandardDeal, transformDealsA, transformDealsB, transformDealsAPI } from '../utils/transformData';
import { fetchDeals } from '../lib/data';

//realizamos el fetch de deals
const fetchedDeals = await fetchDeals();

const DealsTable = () => {
  const [deals, setDeals] = useState<StandardDeal[]>([]);

  useEffect(() => {
    // Simulamos la obtención de los datos de CRM A y CRM B
    const crmAData = [
      { deal_id: "A1", total: 5000, rep_name: "Ana Pérez", sold_at: "2024-03-01" },
      { deal_id: "A2", amount: 4500, rep_name: "Juan Gómez", created_on: "2024-03-02" }
    ];

    const crmBData = [
      { opportunity_id: "B1", amount: 3000, seller: "Carlos García", deal_date: "2024/03/03" },
      { opportunity_id: "B2", amount: 4500, seller: "Maria García", deal_date: "2024/03/04" }
    ];
    
    // Transformar los datos
    const transformedDealsA = transformDealsA(crmAData);
    const transformedDealsB = transformDealsB(crmBData);
    const transformedDealsAPI = transformDealsAPI(fetchedDeals);
    
    //los insertamos en el array
    const transformedDeals = [];
    for (const deal of transformedDealsA) {
    transformedDeals.push(deal);
    }
    for (const deal of transformedDealsB) {
    transformedDeals.push(deal);
    }
    for (const deal of transformedDealsAPI) {
        transformedDeals.push(deal);
    }

    //version mejorada

    /*const standardDeals = [
        ...transformDealsA(crmAData),
        ...transformDealsB(crmBData),
        ...transformDealsAPI(fetchedDeals)
      ];*/
      
    //actualizamos el estado de la variable deals
    //Version mejorada 
    //setDeals(standardDeals);
    setDeals(transformedDeals);
  }, []);

  //juntamos todos los amounts para sacar el total de comision, calculando el 10% de cada comision individual
  const totalCommission = deals.reduce((acc, deal) => acc + deal.amount * 0.1, 0);

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
          {deals.map(deal => (
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

export default DealsTable;
