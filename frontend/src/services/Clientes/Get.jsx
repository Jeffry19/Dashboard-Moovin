async function GetClientes() {
    try {
        const response = await fetch('http://localhost:5000/clientes', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',


            },
        });

        if (response.ok) {
            console.log('La consulta http fuen exitosa');
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error('Hubo un error al hacer la consulta http', error);
        throw error;
        
    }

}

export default GetClientes