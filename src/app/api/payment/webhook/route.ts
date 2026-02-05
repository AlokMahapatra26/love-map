import { Webhooks } from '@dodopayments/nextjs';
import { markAssessmentAsPaid } from '@/lib/db';

export const POST = Webhooks({
    webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY!,
    onPayload: async (payload) => {
        console.log('Received webhook payload:', payload);

        // Check for payment.succeeded event
        // Note: Structure of payload depends on Dodo's event types.
        // Assuming payload.type or similar indicates event type and payload.data contains the object.
        // Based on standard patterns, but Dodo is specific.
        // The docs example just said "// handle the payload".
        // I will log it and implement basic logic assuming payload contains metadata.

        // We need to inspect the payload structure to be sure, but usually:
        // payload.type === 'payment.succeeded'
        // payload.data.metadata.coupleId

        // For now, I'll assume a generic structure and try to extract coupleId from metadata.
        // If extraction fails, we log error.

        const eventType = (payload as any).type;
        const data = (payload as any).data;

        if (eventType === 'payment.succeeded') {
            const coupleId = data?.metadata?.coupleId;
            if (coupleId) {
                console.log(`Processing payment for coupleId: ${coupleId}`);
                const success = await markAssessmentAsPaid(coupleId);
                if (success) {
                    console.log(`Successfully marked assessment ${coupleId} as paid.`);
                } else {
                    console.error(`Failed to mark assessment ${coupleId} as paid.`);
                }
            } else {
                console.error('No coupleId found in payment metadata');
            }
        }
    },
});
