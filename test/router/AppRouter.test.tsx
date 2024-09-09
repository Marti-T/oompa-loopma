import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/router/AppRouter';

import { DetailPage, HomePage } from '../../src/oompaloompas/pages';
import { Navbar } from '../../src/ui';

jest.mock('../../src/oompaloompas/pages/homepage/HomePage');
jest.mock('../../src/oompaloompas/pages/detailpage/DetailPage');
jest.mock('../../src/ui/navbar/Navbar');

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
  
      expect(screen.getByText('Navbar Mock')).not.toBeNull();
  
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