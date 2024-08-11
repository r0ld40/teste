import { render, screen } from "@testing-library/react";
import { PostData } from ".";
import { React } from "react";
import '@testing-library/jest-dom'
import { postCardPropsMock } from "./mock";

const props = postCardPropsMock;

describe('<PostData />0', () => {
    it('should render PostData correctly', () => {
        render(<PostData {...postCardPropsMock} />)

        expect(screen.getByRole('img', { name: /title 1/i }))
            .toHaveAttribute('src', 'img/img.png');

        expect(screen.getByRole('heading', { name: /title 1/i }))
            .toBeInTheDocument();

        expect(screen.getByText('body 1'))
            .toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<PostData {...props} />);

        // eslint-disable-next-line testing-library/no-node-access
        expect(container.firstChild).toMatchSnapshot();
    });
});