import Lottie from "lottie-react";
import React, { useState, useEffect } from "react";
import animation from "./assets/docca-animation.json";

const DoccaBetaSignup = () => {
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = () => {
    if (email.trim() === "") return;
    console.log("Beta access requested for DOCCA:", email);
    setTimeout(() => setIsSignedUp(true), 300);
  };

  if (isSignedUp) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center animate-fadeIn">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Gradient Overlays */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, rgba(79, 70, 229, 0.2) 25%, transparent 50%)`,
            }}
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/30 via-violet-500/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-500/30 via-purple-500/20 to-transparent rounded-full blur-3xl" />

          {/* Floating Particles */}
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Success Content */}
        <div className="relative z-10 w-full max-w-md mx-auto px-6 text-center">
          {/* Success Animation */}
          <div className="mb-8 animate-bounceIn animation-delay-300">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-2xl shadow-green-500/30">
              <svg className="w-12 h-12 text-white animate-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Success Card */}
          <div className="relative animate-slideUp animation-delay-500">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-2xl blur opacity-30 animate-pulse" />
            
            <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl border border-green-500/30 p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fadeInUp animation-delay-700">
                Welcome to the Future!
              </h2>
              <p className="text-green-300 mb-6 text-lg animate-fadeInUp animation-delay-900">
                You've successfully signed up for DOCCA beta access
              </p>
              <p className="text-purple-300 text-sm mb-8 animate-fadeInUp animation-delay-1100">
                We'll notify you at <span className="text-white font-semibold animate-glow">{email}</span> when your access is ready
              </p>
              
              {/* Beta Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 backdrop-blur-sm mb-6 animate-fadeInUp animation-delay-1300 animate-pulse">
                <span className="text-green-300 text-sm font-medium tracking-wider">
                  BETA ACCESS REQUESTED
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setIsSignedUp(false)}
                className="w-full relative group overflow-hidden mt-6 animate-fadeInUp animation-delay-1500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/30" />
                <div className="relative px-6 py-3 text-white font-medium tracking-wide transition-all duration-300 group-hover:scale-105">
                  Back to Sign Up
                </div>
              </button>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-8 animate-fadeInUp animation-delay-1700">
            <p className="text-green-300/80 text-sm font-light tracking-wide animate-pulse">
              TRAIN YOUR SYNTHETIC INTELLIGENCE, OWN THE FUTURE
            </p>
          </div>
        </div>

        {/* Corner Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-green-500/20 rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-green-500/20 rounded-br-3xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center transition-all duration-500">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Overlays */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, rgba(79, 70, 229, 0.2) 25%, transparent 50%)`,
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/30 via-violet-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-500/30 via-purple-500/20 to-transparent rounded-full blur-3xl" />

        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* 3D Geometric Shape */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-20">
        <div
          className="w-full h-full border border-purple-400/30 rounded-lg transform rotate-12 animate-spin"
          style={{ animationDuration: "20s" }}
        >
          <div className="w-full h-full border border-violet-400/40 rounded-lg transform -rotate-45 animate-pulse" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        {/* Logo/Title */}
        <div className="text-center mb-12">
          <Lottie animationData={animation} loop={false} autoplay={true} />;
          {/* <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-purple-300 mb-4 tracking-wider">
            DOCCA
          </h1> */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mt-4 rounded-full bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-400/30 backdrop-blur-sm">
            <span className="text-purple-300 text-sm font-medium tracking-wider">
              BETA
            </span>
          </div>
        </div>

        {/* Form Card */}
        <div className="relative">
          {/* Glowing Border Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-violet-500 to-purple-500 rounded-2xl blur opacity-30 animate-pulse" />

          {/* Main Card */}
          <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 shadow-2xl">
            {/* Hexagonal Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-5 rounded-2xl"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2 text-center">
                Apply for exclusive beta access
              </h2>
              <p className="text-purple-300 text-center mb-8 text-sm">
                Join the future of synthetic intelligence
              </p>

              <div className="space-y-6">
                <div>
                  <div className="block text-purple-300 text-sm font-medium mb-3">
                    Email address
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-4 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-purple-400/60 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-violet-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full relative group overflow-hidden"
                >
                  {/* Button Background with Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 rounded-xl transition-all duration-300 group-hover:scale-105" />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 rounded-xl transition-all duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Button Content */}
                  <div className="relative px-6 py-4 text-white font-semibold tracking-wide transition-all duration-300 group-hover:scale-105">
                    <span className="relative z-10">Apply for Beta Access</span>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-violet-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 group-hover:animate-pulse" />
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 text-center">
                <p className="text-purple-400/60 text-xs">
                  By applying, you agree to our{" "}
                  <a href="/terms-of-use.html" className="text-purple-400 hover:text-purple-300 underline transition-colors">
                    Terms of Use
                  </a>
                  {" "}and{" "}
                  <a href="/privacy-policy.html" className="text-purple-400 hover:text-purple-300 underline transition-colors">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-8">
          <p className="text-purple-300/80 text-sm font-light tracking-wide">
            TRAIN YOUR SYNTHETIC INTELLIGENCE, OWN THE FUTURE
          </p>
        </div>
      </div>

      {/* Corner Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-purple-500/20 rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-purple-500/20 rounded-br-3xl" />

      {/* Floating Code-like Elements */}
      <div className="absolute top-1/4 left-10 text-purple-400/30 text-xs font-mono">
        {`{ ai: "synthetic" }`}
      </div>
      <div className="absolute bottom-1/4 right-10 text-violet-400/30 text-xs font-mono">
        {`<future />`}
      </div>
    </div>
  );
};

export default DoccaBetaSignup;
