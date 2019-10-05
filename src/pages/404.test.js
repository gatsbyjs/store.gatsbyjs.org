import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './404';

describe('Pages: 404', () => {
  it('renders a 404 page', () => {
    const component = shallow(<NotFound />);

    expect(component).toMatchSnapshot();
  });
});
