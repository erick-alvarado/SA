import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RegistroNegocio from '../pages/proveedor/Registro';
test('Validar datos de registro de proveedor', () => {

  render(<RegistroNegocio />);

  // Simulate user input
  fireEvent.change(screen.getByPlaceholderText('Ingrese su nombre'), { target: { value: 'Natanael' } });
  fireEvent.change(screen.getByPlaceholderText('Ingrese su direccion'), { target: { value: 'dir1' } });
  fireEvent.change(screen.getByPlaceholderText('Ingrese su correo'), { target: { value: 'natanael@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Ingrese su contrasena'), { target: { value: '1234' } });

  // Submit the form
  fireEvent.click(screen.getByText('Guardar'));

});
