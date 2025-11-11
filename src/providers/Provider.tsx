"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useEffect } from "react";
import { setUser, clearUser } from "@/redux/slices/authSlice";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";


export default function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Check for existing session on mount to restore auth state
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                store.dispatch(setUser(session.user));
            } else {
                store.dispatch(clearUser());
            }
        });

        // Listen for auth state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
            if (session?.user) {
                store.dispatch(setUser(session.user));
            } else {
                store.dispatch(clearUser());
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
