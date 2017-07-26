import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Shartan from '../src/Shartan';

storiesOf('Shartan', module).add('default', () => {
    return <Shartan />;
});
