import { supabase } from './supabase';

export async function saveAssessment(coupleId: string, role: 'partner1' | 'partner2', data: any) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    // Check if couple exists
    const { data: existing } = await supabase
        .from('couples')
        .select('*')
        .eq('id', coupleId)
        .single();

    if (existing) {
        // Update existing row
        const { error } = await supabase
            .from('couples')
            .update({ [role]: data })
            .eq('id', coupleId);

        if (error) console.error(`Error updating ${role}:`, error);
    } else {
        // Create new row
        const { error } = await supabase
            .from('couples')
            .insert({ id: coupleId, [role]: data });

        if (error) console.error(`Error inserting ${role}:`, error);
    }
}

export async function getCoupleData(coupleId: string) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;

    const { data, error } = await supabase
        .from('couples')
        .select('*')
        .eq('id', coupleId)
        .single();

    if (error) {
        // Ignore error if row not found (common for new couples)
        if (error.code !== 'PGRST116') {
            console.error('Error fetching couple:', error);
        }
        return null;
    }
    return data;
}
