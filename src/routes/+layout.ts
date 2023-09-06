import { Amplify } from 'aws-amplify';
import awsmobile from '../aws-exports';
Amplify.configure(awsmobile);
export function load({ url }) {
    return {
        url_pathname: url.pathname,
    }
}
