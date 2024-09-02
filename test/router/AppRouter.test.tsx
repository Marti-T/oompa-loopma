import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/router/AppRouter'; // Ajusta la ruta según sea necesario
import { HomePage } from '../../src/oompaloompas/pages/HomePage';
import { DetailPage } from '../../src/oompaloompas/pages/DetailPage';
import { Navbar } from '../../src/ui/Navbar';

jest.mock('../../src/oompaloompas/pages/HomePage');
jest.mock('../../src/oompaloompas/pages/DetailPage');
jest.mock('../../src/ui/Navbar');

describe('AppRouter Component', () => {
    beforeEach(() => {
      (HomePage as jest.Mock).mockReturnValue(<div>HomePage Mock</div>);
      (DetailPage as jest.Mock).mockReturnValue(<div>DetailPage Mock</div>);
      (Navbar as jest.Mock).mockReturnValue(<div>Navbar Mock</div>);
    });
  
    test('should render HomePage when the path is "/"', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <AppRouter />
        </MemoryRouter>
      );
  
      // Verifica que el Navbar se renderiza
      expect(screen.getByText('Navbar Mock')).not.toBeNull();
  
      // Verifica que HomePage se renderiza en la ruta "/"
      expect(screen.getByText('HomePage Mock')).not.toBeNull();
    });
  
    test('should render DetailPage when the path is "/detail/:id"', () => {
      render(
        <MemoryRouter initialEntries={['/detail/1']}>
          <AppRouter />
        </MemoryRouter>
      );
  
      expect( screen.getByText('Navbar Mock') ).toBeTruthy();

      expect( screen.getByText('DetailPage Mock') ).toBeTruthy();
    });
  
    test('should navigate to HomePage when the path is not recognized', () => {
      render(
        <MemoryRouter initialEntries={['/unknown']}>
          <AppRouter />
        </MemoryRouter>
      );
  
      expect( screen.getByText('Navbar Mock') ).toBeTruthy();
      
      expect( screen.getByText('HomePage Mock') ).toBeTruthy();      
    });
  });