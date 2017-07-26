import Shartan from "./Shartan";
import React from 'react';
import renderer from 'react-test-renderer';

test('renders default', () => {
    const tree = renderer.create(
        <Shartan width={400}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test('renders when sett specified', () => {
    const tree = renderer.create(
        <Shartan sett="K4 R24 K9 R15 Y4" width={400}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});