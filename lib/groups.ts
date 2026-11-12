import { randomInt } from "node:crypto";
import { db, must } from "./supabase";
import type { Student, TutorGroup } from "./types";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I

function code(len = 6) {
  return Array.from({ length: len }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
}

export async function createGroup(owner: Student, name: string, currency: "NGN" | "GBP" = "NGN"): Promise<TutorGroup> {
  for (let i = 0; i < 5; i++) {
    const { data, error } = await db()
      .from("tutor_groups")
      .insert({ owner_student_id: owner.id, name: name.slice(0, 80), join_code: code(), currency })
      .select()
      .single();
    if (!error) return data as TutorGroup;
  }
  throw new Error("Could not create group");
}

export async function getGroupByCode(joinCode: string): Promise<TutorGroup | null> {
  const { data } = await db().from("tutor_groups").select("*").eq("join_code", joinCode.toUpperCase()).maybeSingle();
  return data as TutorGroup | null;
}

export async function groupsOwnedBy(studentId: string): Promise<TutorGroup[]> {
  return must(
    await db().from("tutor_groups").select("*").eq("owner_student_id", studentId).order("created_at", { ascending: false }),
    "owned groups",
  ) as TutorGroup[];
}

export async function memberCount(groupId: string) {
  const { count } = await db().from("group_members").select("*", { count: "exact", head: true }).eq("group_id", groupId);
  return count ?? 0;
}

/** Join a group. Gets a seat if the group has paid seats free. */
export async function joinGroup(student: Student, group: TutorGroup): Promise<{ already: boolean; seat: boolean }> {
  const { data: existing } = await db()
    .from("group_members")
    .select("has_seat")
    .eq("group_id", group.id)
    .eq("student_id", student.id)
    .maybeSingle();
  if (existing) return { already: true, seat: existing.has_seat };

  let seat = false;
  if (group.paid_until && new Date(group.paid_until) > new Date()) {
    const { count } = await db()
      .from("group_members")
      .select("*", { count: "exact", head: true })
      .eq("group_id", group.id)
      .eq("has_seat", true);
    seat = (count ?? 0) < group.paid_seats;
  }
  await db().from("group_members").insert({ group_id: group.id, student_id: student.id, has_seat: seat });
  return { already: false, seat };
}

export const joinLink = (botUsername: string, group: TutorGroup) => `https://t.me/${botUsername}?start=g_${group.join_code}`;
