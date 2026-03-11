import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
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
      setError("Login yoki parol noto‘g‘ri");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07010f] flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,0,140,0.25),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(0,255,255,0.18),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(180,0,255,0.20),_transparent_30%)]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow blobs */}
      <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-fuchsia-600/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[300px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full" />

      <div className="relative w-full max-w-md">
        {/* Outer glow */}
        <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-400 opacity-70 blur-md" />

        {/* Card */}
        <div className="relative rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(255,0,153,0.18)] overflow-hidden">
          {/* scanline */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.2)_0px,rgba(255,255,255,0.2)_1px,transparent_2px,transparent_4px)]" />

          {/* top neon line */}
          <div className="h-1 w-full bg-gradient-to-r from-fuchsia-500 via-pink-400 to-cyan-400" />

          <div className="relative px-8 py-10">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/80 via-pink-500/70 to-cyan-500/80 shadow-[0_0_30px_rgba(255,0,180,0.35)]">
                <Gamepad2 className="h-10 w-10 text-white" />
              </div>

              <h1 className="text-4xl font-extrabold tracking-wide uppercase bg-gradient-to-r from-fuchsia-400 via-pink-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,0,180,0.35)]">
                Cyber Login
              </h1>

              <p className="mt-2 text-sm text-fuchsia-100/70 tracking-[0.25em] uppercase">
                Gameclub Admin Access
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-xs uppercase tracking-[0.2em] text-fuchsia-100/80"
                >
                  Username
                </Label>

                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-fuchsia-300/70 group-focus-within:text-fuchsia-300" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 pl-11 rounded-xl border border-fuchsia-500/20 bg-[#12081f]/80 text-white placeholder:text-white/35 focus-visible:ring-0 focus:border-fuchsia-400 focus:shadow-[0_0_0_1px_rgba(255,0,180,0.4),0_0_20px_rgba(255,0,180,0.12)]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs uppercase tracking-[0.2em] text-fuchsia-100/80"
                >
                  Password
                </Label>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-300/70 group-focus-within:text-cyan-300" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-11 pr-12 rounded-xl border border-cyan-500/20 bg-[#12081f]/80 text-white placeholder:text-white/35 focus-visible:ring-0 focus:border-cyan-400 focus:shadow-[0_0_0_1px_rgba(0,255,255,0.35),0_0_20px_rgba(0,255,255,0.10)]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-cyan-300 transition-colors"
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
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 shadow-[0_0_18px_rgba(255,0,0,0.12)]">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="h-12 w-full rounded-xl border border-white/10 bg-gradient-to-r from-fuchsia-600 via-pink-500 to-cyan-500 text-white font-bold uppercase tracking-[0.18em] shadow-[0_0_25px_rgba(255,0,170,0.28)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,0,170,0.45)]"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs tracking-[0.25em] uppercase text-white/35">
                Receptionist Portal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}