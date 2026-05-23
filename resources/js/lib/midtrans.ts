import axios from 'axios';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';

type StartResult = { ok: boolean; message?: string };

/**
 * Opens the Midtrans Snap popup for a fine and routes the user to the matching
 * result page based on the outcome. Shared by the Fines tab "Pay Now" button and
 * the "Try Payment Again" buttons on the result pages.
 */
export async function payFine(fineId: string): Promise<StartResult> {
    try {
        const { data } = await axios.post('/payments', { fine_id: fineId });
        const snapToken: string | undefined = data?.snap_token;

        if (!snapToken || !window.snap) {
            router.get(route('payment.error'), {
                fine_id: fineId,
                message: 'Payment gateway is unavailable. Please try again later.',
            });
            return { ok: false };
        }

        window.snap.pay(snapToken, {
            onSuccess: () => router.get(route('payment.success'), { fine_id: fineId }),
            onPending: () => router.get(route('payment.pending'), { fine_id: fineId }),
            onError: () => router.get(route('payment.failed'), { fine_id: fineId }),
            onClose: () => router.get(route('payment.cancel'), { fine_id: fineId }),
        });

        return { ok: true };
    } catch (e) {
        const message =
            (axios.isAxiosError(e) && (e.response?.data?.error as string)) ||
            'We could not start your payment. Please try again.';

        router.get(route('payment.error'), { fine_id: fineId, message });
        return { ok: false, message };
    }
}
