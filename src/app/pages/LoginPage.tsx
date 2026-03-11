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
    <div className="min-h-screen w-full bg-slate-950 text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* simple background */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-950 via-slate-950 to-cyan-950 opacity-80" />
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-fuchsia-500/20 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
          <div className="h-1 w-full rounded-t-3xl bg-gradient-to-r from-fuchsia-500 to-cyan-400" />

          <div className="p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-600 to-cyan-500 shadow-lg">
                <Gamepad2 className="h-8 w-8 text-white" />
              </div>

              <h1 className="text-3xl font-bold text-white">
                Ridzhan SASS
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Gameclub Admin Access
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Username
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-700 bg-slate-800/80 pl-10 pr-4 text-white placeholder:text-slate-500 outline-none focus:border-fuchsia-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-700 bg-slate-800/80 pl-10 pr-12 text-white placeholder:text-slate-500 outline-none focus:border-cyan-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
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
                className="h-12 w-full rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-semibold text-white transition hover:opacity-90"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500">
              Demo: <span className="text-fuchsia-400">tharih</span> /{" "}
              <span className="text-cyan-400">hacker</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}