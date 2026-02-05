import { supabase } from './supabase';

export async function saveAssessment(coupleId: string, role: 'partner1' | 'partner2', data: any, userId?: string) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    // Check if couple exists
    const { data: existing } = await supabase
        .from('couples')
        .select('*')
        .eq('id', coupleId)
        .single();

    if (existing) {
        // Update existing row
        const updateData: any = { [role]: data };
        // If userId is provided and not set, or if we want to ensure ownership (logic depends on requirements)
        // For now, only set user_id if it's null on the record? Or just overwrite?
        // Let's assume partner1 creation sets the user_id.
        if (userId && role === 'partner1') {
            updateData.user_id = userId;
        }

        const { error } = await supabase
            .from('couples')
            .update(updateData)
            .eq('id', coupleId);

        if (error) console.error(`Error updating ${role}:`, JSON.stringify(error, null, 2));
    } else {
        // Create new row
        const insertData: any = { id: coupleId, [role]: data };
        if (userId) {
            insertData.user_id = userId;
        }

        const { error } = await supabase
            .from('couples')
            .insert(insertData);

        if (error) console.error(`Error inserting ${role}:`, JSON.stringify(error, null, 2));
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
            console.error('Error fetching couple:', JSON.stringify(error, null, 2));
        }
        return null;
    }
    return data;
}

export async function getUserAssessments(userId: string) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];

    const { data, error } = await supabase
        .from('couples')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false }); // Assuming created_at exists, otherwise remove order

    if (error) {
        console.error('Error fetching user assessments:', error);
        return [];
    }
    return data || [];
}

export async function deleteAssessment(coupleId: string) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return false;

    const { error } = await supabase
        .from('couples')
        .delete()
        .eq('id', coupleId);

    if (error) {
        console.error('Error deleting assessment:', error);
        return false;
    }
    return true;
}
