import { createClient } from "@/utils/supabase/server";
import BackButton from "../components/back-button";
import prettyMilliseconds from "pretty-ms";

export default async function Leaderboard() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leaderboard")
    .select("playerName, playerScore")
    .order("playerScore", { ascending: true });
  console.log({ data });

  if (error) {
    return <div>Something went wrong!</div>;
  }

  return (
    <div className="py-8 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <BackButton />
        <h1 className="text-3xl text-balance flex items-center">
          <span className="text-[#34B27B]">supa</span>-aim &nbsp;
          <span>leaderboard 🏆</span>
        </h1>
      </div>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((player, index) => {
            return (
              <tr key={index} className="text-center">
                <td>{index + 1}</td>
                <td>
                  <a
                    href={`https://x.com/${player.playerName}`}
                    target="_blank"
                    className="underline"
                  >
                    {player.playerName}
                  </a>
                </td>
                <td>
                  {prettyMilliseconds(player.playerScore, {
                    secondsDecimalDigits: 3,
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
