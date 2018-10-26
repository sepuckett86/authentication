import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Intro from '../Intro';
import Root from '../../Root';


let wrapped;

it('loads content', () => {
  wrapped = shallow(
    <Root>
      <MemoryRouter initialEntries={[ '/intro' ]}>
        <Intro />
      </MemoryRouter>
    </Root>
  );
  expect(wrapped.render().text()).toContain("Focus");
});
