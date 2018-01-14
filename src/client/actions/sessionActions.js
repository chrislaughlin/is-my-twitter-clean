/* @flow */
import type {Session} from "../types/session";

export const setSession = (session: Session) => {
    return {
        type: 'SET_SESSION',
        session
    };
};