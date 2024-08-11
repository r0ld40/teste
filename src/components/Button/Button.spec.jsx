import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Button from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('<Button />', () => {
  it('should render the button with the text "Load more"', () => {
    render(<Button text="Load more" />);

    // expect.assertions(1);

    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const fn = jest.fn(); // Mock
    
    render(<Button text="Load more" onClick={fn}/>);

    const button = screen.getByRole('button', { name: /load more/i });

    // fireEvent.click(button); // Acao
    userEvent.click(button); // Acao mais natural

    // expect(fn).toHaveBeenCalled(); // Se foi chamado
    expect(fn).toHaveBeenCalledTimes(1); // Quantas vezes foi chamado
  });

  it('should be disabled is false', () => {
    render(<Button text="Load more" disabled={false}/>); 

    // expect(screen.getByRole('button', { name: /load more/i })).toBeDisabled(); // Se esta desativado
    expect(screen.getByRole('button', { name: /load more/i }))
      .toBeEnabled(); // Se esta ativado
  }); 

  it('should match snapshot', () => {
    const { container } = render(<Button text="Load more" disabled={false}/>);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild)
      .toMatchSnapshot();
  });
});