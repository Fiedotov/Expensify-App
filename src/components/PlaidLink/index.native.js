import {useEffect} from 'react';
import {openLink, useDeepLinkRedirector, usePlaidEmitter} from 'react-native-plaid-link-sdk';
import Log from '../../libs/Log';
import {plaidLinkPropTypes, plaidLinkDefaultProps} from './plaidLinkPropTypes';

function PlaidLink(props) {
    useDeepLinkRedirector();
    usePlaidEmitter((event) => {
        Log.info('[PlaidLink] Handled Plaid Event: ', false, event);
        props.onEvent(event.eventName, event.metadata);
    });
    useEffect(() => {
        openLink({
            tokenConfig: {
                token: props.token,
            },
            onSuccess: ({publicToken, metadata}) => {
                props.onSuccess({publicToken, metadata});
            },
            onExit: (exitError, metadata) => {
                Log.info('[PlaidLink] Exit: ', false, {exitError, metadata});
                props.onExit();
            },
        });

        // We generally do not need to include the token as a dependency here as it is only provided once via props and should not change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null;
}

PlaidLink.propTypes = plaidLinkPropTypes;
PlaidLink.defaultProps = plaidLinkDefaultProps;
PlaidLink.displayName = 'PlaidLink';

export default PlaidLink;
