import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);

  const handleLogout = () => {
    if (!confirming) {
      setConfirming(true);
      // Auto-cancel confirmation after 3 seconds
      setTimeout(() => setConfirming(false), 3000);
      return;
    }

    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <motion.button
      onClick={handleLogout}
      className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/10 text-sm sm:text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${
        confirming
          ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
          : "bg-white/10 text-zinc-100 hover:bg-white/15"
      }`}
      whileHover={{
        y: -2,
        scale: 1.04,
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.6)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <LogOut size={16} className="opacity-80" />
      {confirming ? "Click again to confirm" : "Logout"}
    </motion.button>
  );
};

export default LogoutButton;
