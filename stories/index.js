import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Shartan from '../src/Shartan';

storiesOf('Shartan', module).add('default, big', () => {
    return <Shartan width={400}/>;
}).add('default, small', () => {
    return <Shartan width={100}/>;
});
