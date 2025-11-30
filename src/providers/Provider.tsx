"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useEffect } from "react";
import { setUser, setRole, clearUser, setLoading, setError } from "@/redux/slices/authSlice";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { getUserRole } from "@/lib/auth/roles";
import QueryProvider from "./QueryProvider";


export default function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Check for existing session on mount to restore auth state
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                store.dispatch(setUser(session.user));

                // Fetch role separately (non-blocking)
                getUserRole(session.user.id).then((role) => {
                    if (role) {
                        store.dispatch(setRole(role));
                    }
                }).catch((err) => {
                    console.error("Error fetching role:", err);
                });
            } else {
                store.dispatch(clearUser());
            }
            // 🛡️ Safety: Always reset loading/error on mount in case of stale persisted state
            store.dispatch(setLoading(false));
            store.dispatch(setError(null));
        });

        // Listen for auth state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
            if (session?.user) {
                store.dispatch(setUser(session.user));

                // Fetch role separately (non-blocking)
                getUserRole(session.user.id).then((role) => {
                    if (role) {
                        store.dispatch(setRole(role));
                    }
                }).catch((err) => {
                    console.error("Error fetching role:", err);
                });
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
                <QueryProvider>
                    {children}
                </QueryProvider>
            </PersistGate>
        </Provider>
    );
}
