import { useState } from "react";
import { useNavigate } from "react-router";
import { Gamepad2, Lock, User, Eye, EyeOff } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "tharih" && password === "hacker") {
      setError("");
      navigate("/");
    } else {
      setError("Username yoki parol noto‘g‘ri");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_bottom_center,rgba(168,85,247,0.18),transparent_32%)]" />

      {/* Grid effect */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px]" />

      {/* Blur blobs */}
      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-fuchsia-600/30 blur-3xl" />
      <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Neon border wrapper */}
          <div className="rounded-[28px] bg-gradient-to-r from-fuchsia-500/70 via-pink-500/60 to-cyan-400/70 p-[1px] shadow-[0_0_45px_rgba(236,72,153,0.25)]">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80 backdrop-blur-2xl">
              {/* Top neon line */}
              <div className="h-1 w-full bg-gradient-to-r from-fuchsia-500 via-pink-400 to-cyan-400" />

              {/* Scan lines */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.18)_0px,rgba(255,255,255,0.18)_1px,transparent_2px,transparent_4px)]" />

              <div className="relative px-8 py-10">
                {/* Header */}
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500 via-pink-500 to-cyan-500 shadow-[0_0_35px_rgba(236,72,153,0.35)]">
                    <Gamepad2 className="h-9 w-9 text-white" />
                  </div>

                  <h1 className="text-4xl font-extrabold tracking-wide uppercase bg-gradient-to-r from-fuchsia-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                    Ridzhan SASS
                  </h1>

                  <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/55">
                    Gameclub Admin Access
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label
                      htmlFor="username"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.22em] text-fuchsia-200/85"
                    >
                      Username
                    </label>

                    <div className="group relative">
                      <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fuchsia-300/65 transition-colors group-focus-within:text-fuchsia-300" />
                      <input
                        id="username"
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-12 w-full rounded-xl border border-fuchsia-500/20 bg-white/5 pl-11 pr-4 text-white outline-none placeholder:text-white/30 transition-all focus:border-fuchsia-400 focus:shadow-[0_0_0_1px_rgba(236,72,153,0.35),0_0_24px_rgba(236,72,153,0.15)]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.22em] text-cyan-200/85"
                    >
                      Password
                    </label>

                    <div className="group relative">
                      <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300/65 transition-colors group-focus-within:text-cyan-300" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 w-full rounded-xl border border-cyan-500/20 bg-white/5 pl-11 pr-12 text-white outline-none placeholder:text-white/30 transition-all focus:border-cyan-400 focus:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_24px_rgba(34,211,238,0.15)]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 transition hover:text-cyan-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="h-12 w-full rounded-xl border border-white/10 bg-gradient-to-r from-fuchsia-600 via-pink-500 to-cyan-500 font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_30px_rgba(236,72,153,0.28)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(236,72,153,0.42)] active:scale-[0.99]"
                  >
                    Enter Arena
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/35">
                    Receptionist Portal
                  </p>
                </div>

                {/* Demo hint */}
                <div className="mt-4 text-center text-xs text-white/35">
                  Demo:{" "}
                  <span className="text-fuchsia-300">tharih</span>
                  {" / "}
                  <span className="text-cyan-300">hacker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}