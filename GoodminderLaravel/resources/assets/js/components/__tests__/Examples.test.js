import React from 'react';
import { shallow } from 'enzyme';

import Examples from '../Examples';

let wrapped;

it('loads content', () => {
  wrapped = shallow(<Examples />);
  expect(wrapped.render().text()).toContain("Examples");
  wrapped.unmount();
});
