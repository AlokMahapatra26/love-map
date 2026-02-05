const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Note: using anon key might not have permission to read all, but likely has read access if app works.
// Better to use service role if available, but I don't see it in .env.local usually.
// Let's try regular client.

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPayment() {
    console.log('Checking couple bb6d4823...');
    const { data, error } = await supabase
        .from('couples')
        .select('*')
        .eq('id', 'bb6d4823')
        .single();

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Partner1 Data:', JSON.stringify(data.partner1, null, 2));
        if (data.partner1 && data.partner1.hasPaid) {
            console.log('SUCCESS: hasPaid is TRUE');
        } else {
            console.log('FAILURE: hasPaid is MISSING or FALSE');
        }
    }
}

checkPayment();
