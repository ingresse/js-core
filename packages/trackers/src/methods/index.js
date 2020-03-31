/**
 * Triggers
 */
import {
    fbq,
    gtag,
    legiti,
} from '../triggers';

/**
 * Methods
 */
import * as generics from './generic.methods';
import { auth } from './auth.methods';
import { cart } from './cart.methods';
import { password } from './password.methods';
import { purchase } from './purchase.methods';
import { user } from './user.methods';

/**
 * Reference
 */
const methods = {
    auth,
    cart,
    password,
    purchase,
    user,

    ...generics,

    fbq,
    gtag,
    legiti,
};

/**
 * Exporting
 */
export default methods;
