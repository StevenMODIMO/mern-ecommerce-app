import { motion } from "framer-motion";

export default function Backdrop({ children, close }) {
  return (
    <motion.div
    onClick={close}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full z-10 absolute top-0 overflow-auto left-0 bg-black"
    >
      {children}
    </motion.div>
  );
}
