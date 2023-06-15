import { motion, AnimatePresence } from "framer-motion";

export default function Message({ text }) {
  return (
    <AnimatePresence>
        <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute top-0 right-0 text-lg text-center mr-3 border-b-2 border-b-red-500 border-2 p-2 rounded w-72 shadow-lg lg:top-28 lg:w-96"
    >
      <p>{text}</p>
    </motion.div>
    </AnimatePresence>
  );
}
