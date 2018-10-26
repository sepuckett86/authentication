import React from 'react';
import { shallow } from 'enzyme';

import Faq from '../Faq';

let wrapped;

it('loads content', () => {
  wrapped = shallow(<Faq />);
  expect(wrapped.render().text()).toContain("FAQ");
  wrapped.unmount();
});
