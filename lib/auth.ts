import { supabase } from "./supabaseClient";

export type Profile = {
  id: string;
  email: string;
  plan: string;
  company: string | null;
  role: string;
};

export async function getProfile() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  if (!session?.user) {
    throw new Error("No active user session.");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, plan, company, role")
    .eq("id", session.user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return data;
}
