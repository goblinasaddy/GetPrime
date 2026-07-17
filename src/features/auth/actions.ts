"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: {
  displayName: string;
  college: string;
  graduationYear: number;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  await prisma.profile.update({
    where: { id: user.id },
    data: {
      displayName: formData.displayName,
      college: formData.college,
      graduationYear: formData.graduationYear,
    },
  });

  revalidatePath("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/auth/login");
}
