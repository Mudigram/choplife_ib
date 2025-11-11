"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/authSlice";
import { supabase } from "@/lib/supabase/supabaseClient";
import { LogOutIcon } from 'lucide-react';

function LogoutButton() {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        dispatch(logoutUser());
        router.push("/login");
    };
    return (
        <Button variant="destructive" onClick={handleLogout} className='w-2/3 mx-auto h-10 py-2 rounded-lg bg-chop-accent-error text-chop-text-light shadow-neon-error transition'>
            <LogOutIcon className='w-4 h-4' />
            Logout
        </Button>
    )
}

export default LogoutButton