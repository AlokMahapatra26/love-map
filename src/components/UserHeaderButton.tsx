'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function UserHeaderButton({ onLoginClick }: { onLoginClick: () => void }) {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (user) {
        return (
            <Link href="/profile" className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-rose-600 transition-colors">
                <User size={18} />
                <span className="hidden md:inline">Profile</span>
            </Link>
        );
    }

    return (
        <button
            onClick={onLoginClick}
            className="text-sm font-medium text-stone-600 hover:text-rose-600 transition-colors"
        >
            Log In
        </button>
    );
}
