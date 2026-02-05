import { NextRequest, NextResponse } from 'next/server';
import { markAssessmentAsPaid } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const { coupleId } = await request.json();

        if (!coupleId) {
            return NextResponse.json({ error: 'Missing coupleId' }, { status: 400 });
        }

        // In a real production app, you might want to protect this with an admin secret header
        // For now, as per user request for easy testing/usage:
        const success = await markAssessmentAsPaid(coupleId);

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
        }

    } catch (error) {
        console.error('Bypass error:', error);
        return NextResponse.json({ error: 'Failed to bypass payment' }, { status: 500 });
    }
}
