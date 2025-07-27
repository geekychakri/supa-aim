"use client";

import { useState, useRef, useEffect } from "react";

import prettyMilliseconds from "pretty-ms";
import { Toaster, toast } from "sonner";
import useSound from "use-sound";
import { useRouter } from "next/navigation";
import { saveScoreAction } from "../actions/save-score";

let maxX: number, maxY: number;
export default function Playground() {
  const [currentTarget, setCurrentTarget] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [playerName, setPlayerName] = useState("");
  const [savingScore, setSavingScore] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const targetRef = useRef<HTMLDivElement | null>(null);
  const playgroudRef = useRef<HTMLDivElement | null>(null);

  const [playHitSound] = useSound("/tap.wav");
  const [playCelebrationSound] = useSound("/celebration.wav", {
    volume: 0.5,
  });

  const router = useRouter();

  const generateRandomPosition = () => {
    if (playgroudRef.current && targetRef.current) {
      maxX =
        playgroudRef?.current?.clientWidth - targetRef?.current?.offsetWidth;
      maxY =
        playgroudRef?.current?.clientHeight - targetRef?.current?.offsetHeight;
      console.log({ maxX, maxY });
    }

    return {
      x: Math.floor(Math.random() * (maxX + 1)),
      y: Math.floor(Math.random() * (maxY + 1)),
    };
  };

  const startGame = () => {
    setGameStarted(true);
    setGameComplete(false);
    setScore(0);
    setStartTime(Date.now());
    setEndTime(0);
    setCurrentTarget({
      ...generateRandomPosition(),
    });
  };

  const hitTarget = () => {
    playHitSound();
    const newScore = score + 1;
    setScore(newScore);

    if (newScore >= 30) {
      playCelebrationSound();
      setCurrentTarget(null);
      setGameComplete(true);

      setEndTime(Date.now());
    } else {
      // Generate next target
      setCurrentTarget({
        ...generateRandomPosition(),
      });
    }
  };

  const getTimeTaken = () => {
    if (startTime && endTime) {
      const timeTaken = endTime - startTime;
      console.log({ timeTaken });
      return prettyMilliseconds(timeTaken, {
        secondsDecimalDigits: 3,
      });
    }
    return 0;
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameComplete(false);
    setScore(0);
    setCurrentTarget(null);
    setStartTime(0);
    setEndTime(0);
  };

  console.log({ score });
  console.log({ currentTarget });

  const handleStartSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const getPlayerName = formData.get("playerName") as string;
    const playerName = getPlayerName.startsWith("@")
      ? getPlayerName.slice(1)
      : getPlayerName;

    localStorage.setItem("playerName", playerName);
    setPlayerName(playerName);
    startGame();
  };

  useEffect(() => {
    const playerName = localStorage.getItem("playerName") as string;
    setPlayerName(playerName);
  }, []);

  return (
    <>
      <div className="flex py-3 flex-1 flex-col border-b border-[#e5e5e5] border-r border-l border-dotted">
        {!gameComplete && (
          <div
            className={`flex justify-center tabular-nums ${
              gameStarted ? "opacity-100 text-center font-medium " : "opacity-0"
            }`}
          >
            <span className="text-text-secondary inline-block w-[100px]">
              Remaining:
            </span>
            <span className="tabular-nums w-[15px] text-[#34B27B] inline-block">
              {30 - score}
            </span>
          </div>
        )}
        <div className="flex-1 relative" ref={playgroudRef}>
          <div>
            {!gameStarted && !gameComplete && (
              <div className="absolute inset-0 flex items-center justify-center max-md:px-2">
                <div className="flex items-center text-center flex-col gap-8">
                  <h1 className="text-4xl font-medium">
                    <span className="text-[#34B27B]">supa</span>-aim
                  </h1>
                  <div className="border-shadow rounded-full size-[110px] flex justify-center items-center">
                    <svg
                      viewBox="0 0 109 113"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                    >
                      <path
                        d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
                        fill="url(#supabase__paint0_linear)"
                      />
                      <path
                        d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
                        fill="url(#supabase__paint1_linear)"
                        fillOpacity={0.2}
                      />
                      <path
                        d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
                        fill="#3ECF8E"
                      />
                      <defs>
                        <linearGradient
                          id="supabase__paint0_linear"
                          x1={53.9738}
                          y1={54.974}
                          x2={94.1635}
                          y2={71.8295}
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#249361" />
                          <stop offset={1} stopColor="#3ECF8E" />
                        </linearGradient>
                        <linearGradient
                          id="supabase__paint1_linear"
                          x1={36.1558}
                          y1={30.578}
                          x2={54.4844}
                          y2={65.0806}
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop />
                          <stop offset={1} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <p className="flex text-lg flex-col gap-2 text-text-secondary">
                    <span className="text-pretty">
                      Hit 30 supa-aim targets as fast as you can!
                    </span>
                  </p>
                  <form
                    className="flex gap-4 max-md:flex max-md:flex-col"
                    onSubmit={handleStartSubmit}
                  >
                    <input
                      required
                      type="text"
                      className="border-[#e5e5e5] border px-4 py-2 rounded-md outline-[#34B27B]"
                      placeholder="Your X/Twitter username"
                      name="playerName"
                      defaultValue={playerName}
                    />
                    <button className="bg-[#34B27B] px-4 py-2 rounded-md cursor-pointer text-lg font-semibold text-white">
                      Start
                    </button>
                  </form>
                </div>
              </div>
            )}

            {gameComplete && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold">Congratulations!</h2>
                    <p className="text-lg">
                      Time:{" "}
                      <span className="text-[#34B27B] font-semibold">
                        {getTimeTaken()}
                      </span>
                    </p>
                    <p className="text-text-secondary">
                      Save your score to join the leaderboard!
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      disabled={disableButton}
                      type="submit"
                      className="bg-[#34b27b] text-white flex-1 px-4 py-2 rounded-md cursor-pointer text-lg font-semibold"
                      onClick={async () => {
                        setSavingScore(true);
                        const playerScore = endTime - startTime;
                        const { message } = await saveScoreAction(
                          playerName,
                          playerScore
                        );
                        if (message === "success") {
                          playCelebrationSound();
                          toast.success("Score saved successfully!");
                          setSavingScore(false);
                          setDisableButton(true);
                          setTimeout(() => {
                            router.push("/leaderboard");
                          }, 2000);
                        } else if (message === "error") {
                          toast.error("Something went wrong!");
                          setSavingScore(false);
                        } else {
                          toast.error(message);
                          setSavingScore(false);
                        }
                      }}
                    >
                      {savingScore ? "Saving..." : "Save score"}
                    </button>

                    <button
                      onClick={resetGame}
                      className="border-shadow flex-1 px-4 py-2 rounded-md cursor-pointer text-lg font-semibold"
                    >
                      Play again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {gameStarted && currentTarget && (
              <div
                ref={targetRef}
                key={score}
                className="border-shadow rounded-full size-[110px] flex justify-center items-center absolute cursor-crosshair  transition-all duration-200  animate-fadeIn"
                style={{
                  left:
                    currentTarget.x || `${Math.floor(Math.random() * 200)}px`,
                  top:
                    currentTarget.y || `${Math.floor(Math.random() * 300)}px`,
                }}
                onClick={hitTarget}
              >
                <svg
                  viewBox="0 0 109 113"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                >
                  <path
                    d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
                    fill="url(#supabase__paint0_linear)"
                  />
                  <path
                    d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
                    fill="url(#supabase__paint1_linear)"
                    fillOpacity={0.2}
                  />
                  <path
                    d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
                    fill="#3ECF8E"
                  />
                  <defs>
                    <linearGradient
                      id="supabase__paint0_linear"
                      x1={53.9738}
                      y1={54.974}
                      x2={94.1635}
                      y2={71.8295}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#249361" />
                      <stop offset={1} stopColor="#3ECF8E" />
                    </linearGradient>
                    <linearGradient
                      id="supabase__paint1_linear"
                      x1={36.1558}
                      y1={30.578}
                      x2={54.4844}
                      y2={65.0806}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop />
                      <stop offset={1} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster
        duration={1000}
        toastOptions={{
          style: {
            fontSize: "16px",
          },
        }}
      />
    </>
  );
}
