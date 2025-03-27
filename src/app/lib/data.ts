export async function fetchDeals() {
    try {
        const response = await fetch('http://localhost:5000/deals');
        const data = await response.json();
        
        console.log(data); // Muestra todos los deals
        return data;
    } catch(error){
        console.error('Database Error:', error);
        throw new Error('Error al mostrar los deals.');
    }
    
     
  };