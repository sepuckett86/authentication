import React from 'react';
import { shallow } from 'enzyme';

import About from '../About';

let wrapped;

it('loads content', () => {
  wrapped = shallow(<About />);
  expect(wrapped.render().text()).toContain("About");
  wrapped.unmount();
});
