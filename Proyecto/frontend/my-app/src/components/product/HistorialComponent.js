import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Receipt } from 'react-bootstrap-icons';
import axios from 'axios';

const HistorialComponent = ({ id }) => {
    const [compras, setCompras] = useState([]);
    const [subastas, setSubastas] = useState([]);

    useEffect(() => {
        obtenerHistorial();
    }, []);

    const obtenerHistorial = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_IP_BACKEND_SALES}/sales/purchasesHistory/${id.replace(
                    'auth0|',
                    ''
                )}`
            );
            const responseSubasta = await axios.get(
                `${process.env.REACT_APP_IP_BACKEND_AUCTION}/auctions/auctionsHistory/${id.replace(
                    'auth0|',
                    ''
                )}`
            );

            const data = response.data;
            const dataAuctions = responseSubasta.data;

            if (data) {
                setCompras(data.purchases);
            }
            if (dataAuctions) {
                setSubastas(dataAuctions.history);
            }
        } catch (error) {
            alert(error);
        }
    };

    const handleOpenLink = (link) => {
        window.open(link, '_blank');
    };

    return (
        <div>
            <h2>Historial de Compras</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID de Venta</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Cantidad</th>
                        <th>Producto</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.map((compra) => (
                        <tr key={compra.id_sale}>
                            <td>{compra.id_sale}</td>
                            <td>{compra.date}</td>
                            <td>{compra.total}</td>
                            <td>{compra.quantity}</td>
                            <td>{compra.product}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h2>Historial de Subastas</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Imagen</th>
                        <th>Total</th>
                        <th>Factura</th>
                    </tr>
                </thead>
                <tbody>
                    {subastas.map((subasta) => (
                        <tr key={subasta.id}>
                            <td>{subasta.id}</td>
                            <td>{subasta.name}</td>
                            <td>{subasta.description}</td>
                            <td>
                                <img src={subasta.image} alt={subasta.name} height="50" />
                            </td>
                            <td>{subasta.total}</td>
                            <td>
                                <a
                                    href={subasta.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleOpenLink(subasta.link);
                                    }}
                                >
                                    <Receipt size={20} />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default HistorialComponent;
