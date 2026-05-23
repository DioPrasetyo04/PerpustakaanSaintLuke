import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import { PageProps as AppPageProps } from './';

type SnapCallbacks = {
    onSuccess?: (result: unknown) => void;
    onPending?: (result: unknown) => void;
    onError?: (result: unknown) => void;
    onClose?: () => void;
};

interface MidtransSnap {
    pay: (token: string, callbacks?: SnapCallbacks) => void;
}

declare global {
    interface Window {
        axios: AxiosInstance;
        snap?: MidtransSnap;
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}
