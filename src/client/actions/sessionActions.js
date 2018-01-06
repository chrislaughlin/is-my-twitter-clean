/* @flow */
import type {Session} from "../types/session";

export const setSession = (session: Session) => {
    return {
        type: 'SESSION',
        session
    };
};