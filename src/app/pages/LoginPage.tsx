import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Eye, EyeOff, Gamepad2, Lock, User } from "lucide-react";

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
      return;
    }

    setError("Username yoki parol noto‘g‘ri");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#16001f] via-[#050816] to-[#031a24]" />

      {/* Neon blobs */}
      <div className="absolute -left-24 top-[-80px] h-72 w-72 rounded-full bg-fuchsia-600/25 blur-3xl" />
      <div className="absolute right-[-60px] top-1/4 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-[-80px] left-1/3 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />

      <div className="relative w-full max-w-md">
        {/* Neon outer glow */}
        <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-r from-fuchsia-500/60 via-violet-400/50 to-cyan-400/60 blur-sm" />

        {/* Card */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          {/* iOS glass highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/14 via-white/6 to-transparent" />

          {/* top neon line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300" />

          <div className="relative p-8 sm:p-9">
            {/* Logo */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/15 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br from-fuchsia-500 via-violet-400 to-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                  <Gamepad2 className="h-7 w-7 text-white" />
                </div>
              </div>

              <h1 className="bg-gradient-to-r from-white via-fuchsia-100 to-cyan-100 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                Ridzhan SASS
              </h1>
              <p className="mt-2 text-sm text-slate-300/80">
                Gameclub Admin Access
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-xs font-medium uppercase tracking-[0.18em] text-slate-200/80"
                >
                  Username
                </Label>

                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-13 rounded-2xl border border-white/10 bg-white/8 pl-11 text-slate-100 placeholder:text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 focus:border-fuchsia-400/60 focus:bg-white/10 focus:ring-2 focus:ring-fuchsia-400/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-medium uppercase tracking-[0.18em] text-slate-200/80"
                >
                  Password
                </Label>

                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-13 rounded-2xl border border-white/10 bg-white/8 pl-11 pr-12 text-slate-100 placeholder:text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-300"
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
                <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200 backdrop-blur-xl">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="h-13 w-full rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400 font-semibold text-white shadow-[0_10px_30px_rgba(34,211,238,0.18)] transition-all duration-300 hover:scale-[1.01] hover:from-fuchsia-400 hover:via-violet-300 hover:to-cyan-300 hover:shadow-[0_16px_40px_rgba(217,70,239,0.28)]"
              >
                Sign In
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-400">
                Receptionist Portal
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Demo: <span className="text-fuchsia-300">tharih</span> /{" "}
                <span className="text-cyan-300">hacker</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}