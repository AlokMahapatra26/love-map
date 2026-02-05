import { NextRequest, NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';
import { markAssessmentAsPaid } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const { paymentId, coupleId } = await request.json();

        if (!paymentId || !coupleId) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        const client = new DodoPayments({
            bearerToken: process.env.DODO_PAYMENTS_API_KEY,
            environment: process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode',
        });

        // Fetch payment details from Dodo
        const payment = await client.payments.retrieve(paymentId);

        if (payment.status === 'succeeded') {
            const success = await markAssessmentAsPaid(coupleId);
            if (success) {
                return NextResponse.json({ success: true });
            } else {
                return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
            }
        } else {
            return NextResponse.json({ error: 'Payment not succeeded', status: payment.status }, { status: 400 });
        }

    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
    }
}
