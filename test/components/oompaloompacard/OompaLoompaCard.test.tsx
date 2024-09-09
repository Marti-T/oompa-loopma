import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { OompaLoompaCard } from '../../../src/oompaloompas/components/oompaloompacard/OompaLoompaCard';
import { Gender, Result } from '../../../src/interfaces/oompaLoompas';

describe('Component OompaLoompaCard', () => {
    const mockOompaLoompa: Result = {
    id: 1,
    image: 'https://example.com/image.jpg',
    first_name: 'Marcy',
    last_name: 'Karadzas',
    gender: Gender.F,
    profession: 'Developer',
  };

  test('Renders component correctly with props', () => {
    render(
      <MemoryRouter>
        <OompaLoompaCard {...mockOompaLoompa} />
      </MemoryRouter>
    );

    //screen.debug();
    expect( screen.getByText('Marcy Karadzas') ).toBeTruthy();
    
    expect( screen.getByText('Women') ).toBeTruthy();
    
    expect( screen.getByText('Developer') ).toBeTruthy();

    const link = screen.getByLabelText('link-card');
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe(`/detail/${mockOompaLoompa.id}`);
  });
});
