import {CSSProperties} from 'react';
import {ViewStyle} from 'react-native';

/**
 * Display utilities with Bootstrap inspired naming.
 *
 * Note: Only some are acceptable states for use in React Native
 * do not add new styles here unless React Native has changed
 * to support them.
 *
 * RN: https://reactnative.dev/docs/0.62/layout-props#display
 * BS: https://getbootstrap.com/docs/5.0/utilities/display/
 */
export default {
    dFlex: {
        display: 'flex',
    },

    dNone: {
        display: 'none',
    },

    dInline: {
        display: 'inline',
    },

    dInlineFlex: {
        display: 'inline-flex',
    },

    dBlock: {
        display: 'block',
    },
} satisfies Record<string, ViewStyle | CSSProperties>;
