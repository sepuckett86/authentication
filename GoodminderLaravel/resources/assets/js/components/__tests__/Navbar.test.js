import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Root from '../../Root';
import Navbar from '../Navbar';


let wrapped;

it('loads content', () => {
  wrapped = mount(
    <Root>
      <MemoryRouter initialEntries={[ '/' ]}>
        <Navbar />
      </MemoryRouter>
    </Root>
  );
  expect(wrapped.render().text()).toContain("Goodminder");
});

afterEach(() => {
  wrapped.unmount();
});
