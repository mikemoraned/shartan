import Shartan from "./Shartan";
import React from 'react';
import renderer from 'react-test-renderer';

test('renders default', () => {
    const tree = renderer.create(
        <Shartan width={400}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
