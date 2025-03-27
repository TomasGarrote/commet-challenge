export async function fetchDeals() {
    try {
        const response = await fetch('http://localhost:5000/deals');
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log(data); // Muestra todos los deals
        return data;

    } catch(error){
        console.error('Error fetching deals:', error);
        // Mostrar un mensaje de error en la UI
    }
    
     
  };