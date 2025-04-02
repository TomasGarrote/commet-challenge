
import { fetchDeals } from '../lib/data';
import { transformDealsA, transformDealsB, transformDealsAPI } from '../utils/transformData';
import styles from '../styles.module.css'
import Papa from "papaparse";


export default async function Page() {
  const res = await fetch("http://localhost:3000/api/upload", { cache: "no-store" });
  const jsonData = await res.json();
 
  const transformedDeals = [
        ...(jsonData?.length ? transformDealsAPI(jsonData) : []),
      ];


  //juntamos todos los amounts para sacar el total de comision, calculando el 10% de cada comision individual
  const totalCommission = transformedDeals.reduce((acc, deal) => acc + deal.amount * 0.1, 0);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vendedor</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Comisión</th>
          </tr>
        </thead>
        <tbody >
          {transformedDeals.map(deal => (
            <tr key={deal.id} >
              <td>{deal.id}</td>
              <td>{deal.salesperson}</td>
              <td>{deal.amount}</td>
              <td>{new Date(deal.date).toLocaleDateString()}</td>
              <td>${(deal.amount * 0.1).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='comisions'>Total Comisión: ${totalCommission.toFixed(2)}
      <br></br>
      <label >Selecciona un archivo Json o Csv:</label>
        <form action="/api/upload" method="POST" encType="multipart/form-data">
          <input type="file" name="file" accept=".json, .csv" required />
          <button type="submit">Subir Archivo</button>
        </form>
      </div>
    </div>
    
  );
};

  