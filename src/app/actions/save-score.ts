"use server";

import { createClient } from "@/utils/supabase/server";

export async function saveScoreAction(playerName: string, playerScore: number) {
  try {
    const supabase = await createClient();

    if (!playerName && !playerScore) {
      return { message: "Player name or score is missing!" };
    }

    const { error } = await supabase.from("leaderboard").insert({
      playerName,
      playerScore: playerScore,
    });

    console.log({ error });
    if (error) {
      return { message: "error" };
    }

    return { message: "success" };
  } catch (err) {
    console.log(err);
    return { message: "Something went wrong!" };
  }
}
