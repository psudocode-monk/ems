import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <motion.button
      onClick={handleLogout}
      className="px-4 py-2 rounded-xl border border-white/10 bg-white/10 text-zinc-100 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
      whileHover={{
        y: -2,
        scale: 1.05,
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.6)",
        backgroundColor: "rgba(255,255,255,0.15)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      Logout
    </motion.button>
  );
};

export default LogoutButton;
