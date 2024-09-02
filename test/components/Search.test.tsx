import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../../src/oompaloompas/components/Search';
import { useDispatch } from 'react-redux';
import { filterOompaLoompas } from '../../src/store/slices/oompaloopas/oompaLoompasSlice';
import { Gender, Result } from '../../src/interfaces/oompaLoompas';

// Mock de useDispatch
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
  }));
  
  jest.mock('../../src/store/slices/oompaloopas/oompaLoompasSlice', () => ({
    filterOompaLoompas: jest.fn(),
  }));
  
  describe('Search Component', () => {
    const dispatchMock = jest.fn();
    const mockOompasList: Result[] = [
      {
        id: 1,
        image: 'https://example.com/image-1.jpg',
        first_name: 'Marcy',
        last_name: 'Karadzas',
        gender: Gender.F,
        profession: 'Developer',
      },
      {
        id: 2,
        image: 'https://example.com/image-2.jpg',
        first_name: 'Stearne',
        last_name: 'Nunan',
        gender: Gender.M,
        profession: 'Medic',
      },
    ];
  
    beforeEach(() => {
      (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  
      jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => {
        if (key === 'oompaLoompasList') {
          return JSON.stringify(mockOompasList);
        }
        return null;
      });
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('Should clear search term and dispatch filterOompaLoompas with handleClear', () => {
      render(<Search />);
  
      const clearButton = screen.getByText('Clear');
      fireEvent.click(clearButton);
  
      const input = screen.getByPlaceholderText('Search Oompa Loompas') as HTMLInputElement;
      expect(input.value).toBe('');
  
      expect(dispatchMock).toHaveBeenCalledWith(filterOompaLoompas(mockOompasList));
  
      expect(dispatchMock).toHaveBeenCalledTimes(1);
    });
  
    test('Should filtering oompa loompas on search term (first_name, last_name, profession)', () => {
      render(<Search />);
  
      const input = screen.getByPlaceholderText('Search Oompa Loompas');
  
      fireEvent.change(input, { target: { value: 'Marcy' } });
  

      expect(dispatchMock).toHaveBeenCalledWith(
        filterOompaLoompas([mockOompasList[0]]) 
      );
  
      fireEvent.change(input, { target: { value: 'Medic' } });
  
      expect(dispatchMock).toHaveBeenCalledWith(
        filterOompaLoompas([mockOompasList[1]]) 
      );
  
      fireEvent.change(input, { target: { value: 'Nunan' } });
  
      expect(dispatchMock).toHaveBeenCalledWith(
        filterOompaLoompas([mockOompasList[1]]) 
      );
    });
  });