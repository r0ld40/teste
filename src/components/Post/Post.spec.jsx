import { render } from "@testing-library/react";
import { Post } from "./Post";


describe('Post', () => { 
    it('should render posts', () => {
        render(<Post />);
    });
})