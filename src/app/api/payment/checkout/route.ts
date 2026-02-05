import DodoPayments from 'dodopayments';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { coupleId } = await request.json();

        if (!coupleId) {
            return NextResponse.json({ error: 'Missing coupleId' }, { status: 400 });
        }

        const client = new DodoPayments({
            bearerToken: process.env.DODO_PAYMENTS_API_KEY,
            environment: process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode',
        });

        const payment = await client.payments.create({
            billing: {
                country: 'US',
            },
            customer: {
                email: `guest_${coupleId}@example.com`,
                name: 'Guest',
            },
            product_cart: [
                {
                    product_id: process.env.DODO_PAYMENTS_PRODUCT_ID!,
                    quantity: 1,
                },
            ],
            payment_link: true,
            return_url: `${process.env.DODO_PAYMENTS_RETURN_URL}?payment=success&coupleId=${coupleId}`,
            metadata: {
                coupleId: coupleId,
            },
        });

        return NextResponse.json({ url: payment.payment_link });
    } catch (error) {
        console.error('Payment creation error:', error);
        return NextResponse.json({ error: 'Failed to create payment session' }, { status: 500 });
    }
}
