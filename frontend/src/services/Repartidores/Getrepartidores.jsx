async function Getrepartidores() {
    try {
        const response = await fetch('http://localhost:5000/repartidores',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'

            },
        });

        if (response.ok) {
            console.log('Exito');
            
        }

        const data= await response.json();
        return data
    } catch (error) {
        console.error('Hubo un error al crear la consulta http', error)
        throw error;
        
    }
}

export default Getrepartidores