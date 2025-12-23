"use client";
import SignInForm from "@/src/auth/signin/SignIn";
import TaskManager from "@/src/components/todolist-ui/taskManager";

import { supabase } from "@/src/libs/supabase-client/supabaseClient";
import { useEffect, useState } from "react";
export default function Home() {
  const [session, setSession] = useState<any>(null);
  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log("Session is :", currentSession.data.session);
    setSession(currentSession.data.session);
  };
  useEffect(() => {
    fetchSession();
    const { data: authListner } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    return () => {
      authListner.subscription.unsubscribe();
    };
  }, []);
  const logout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <div>
      <button onClick={logout}>Signout</button>
      {session ? <TaskManager /> : <SignInForm />}
    </div>
  );
}
