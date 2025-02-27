import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Typography, Modal, Box, Button, TextField } from '@mui/material';
import GetClientes from '../../services/Clientes/Get';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  { field: 'ubicacion', headerName: 'Ubicación', width: 200 },
  { field: 'email', headerName: 'Correo Electrónico', width: 250 },
  { field: 'telefono', headerName: 'Teléfono', width: 180 },
];

export default function DataTable() {
  // Estado para almacenar los clientes y la versión filtrada
  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Cargar los clientes al montar el componente
  useEffect(() => {
    async function fetchClientes() {
      try {
        const data = await GetClientes();
        setClientes(data);
        setFilteredClientes(data);
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchClientes();
  }, []);

  // Manejo de clic en una fila para abrir el modal
  const handleRowClick = (params) => {
    setSelectedCliente(params.row);
    setOpen(true);
  };

  // Cerrar el modal
  const handleClose = () => {
    setOpen(false);
    setSelectedCliente(null);
  };

  // Función de búsqueda para filtrar clientes
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    if (!value) {
      setFilteredClientes(clientes);
      return;
    }

    // Filtrar clientes en función del texto ingresado
    const filtered = clientes.filter(
      (cliente) =>
        cliente.nombre.toLowerCase().includes(value) ||
        cliente.ubicacion.toLowerCase().includes(value) ||
        cliente.email.toLowerCase().includes(value) ||
        cliente.telefono.toLowerCase().includes(value)
    );

    setFilteredClientes(filtered);
  };

  return (
    <>
      <Paper sx={{ p: 2, width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Lista de Clientes Registrados
        </Typography>

        {/* Campo de búsqueda */}
        <TextField
          label="Buscar cliente..."
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearch}
          sx={{ marginBottom: 2 }}
        />

        {/* Tabla de clientes */}
        <DataGrid
          rows={filteredClientes}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          loading={loading}
          sx={{ border: 0, height: 400 }}
          onRowClick={handleRowClick}
        />
      </Paper>

      {/* Modal para mostrar el historial de entregas del cliente */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Historial de Entregas - {selectedCliente?.nombre}
          </Typography>
          {selectedCliente?.entregas?.length > 0 ? (
            selectedCliente.entregas.map((entrega) => (
              <Box
                key={entrega.id}
                sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}
              >
                <Typography>
                  <strong>Producto:</strong> {entrega.producto}
                </Typography>
                <Typography>
                  <strong>Fecha de Entrega:</strong> {entrega.fecha_entrega}
                </Typography>
                <Typography>
                  <strong>Estado:</strong> {entrega.estado}
                </Typography>
                <Typography>
                  <strong>ID Repartidor:</strong> {entrega.repartidor_id}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No hay entregas registradas.</Typography>
          )}
          <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
