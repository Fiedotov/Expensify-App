import React from 'react';
import Checkbox from '../components/Checkbox';

/**
 * We use the Component Story Format for writing stories. Follow the docs here:
 *
 * https://storybook.js.org/docs/react/writing-stories/introduction#component-story-format
 */
export default {
    title: 'Components/Checkbox',
    component: Checkbox,
};

function Template(args) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Checkbox {...args} />;
}

// Arguments can be passed to the component by binding
// See: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Default = Template.bind({});
Default.args = {
    onPress: () => {},
    isChecked: true,
    accessibilityLabel: '',
};

export {Default};
