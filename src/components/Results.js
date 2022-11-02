import { motion } from "framer-motion";
import { State } from "../hooks/useEngine";
import { formatPercentage } from "../utils/helpers";


const Results = ({
  state,
  errors,
  accuracyPercentage,
  total,
  wordErrors,
  wpm,
  className = "",
}) => {
  if (state !== "finish") {
    return null;
  }

  const initial = { opacity: 0 };
  const animate = { opacity: 1 };


  const ListingVariants = () => {
    let array = []
    const listVariants = [
      { 
        transition: { duration: 0.3 },
        className: "text-xl font-semibold",
        content: 'Results'
      },
      { 
        transition: { duration: 0.3, delay: 0.5 },
        className: "",
        content: `Accuracy: ${formatPercentage(accuracyPercentage)}`
      },
      { 
        transition: { duration: 0.3, delay: 1 },
        className: "text-red-500",
        content: `Errors: ${errors}`
      },
      { 
        transition: { duration: 0.3, delay: 1 },
        className: "text-red-700",
        content: `Word Errors: ${wordErrors}`
      },
      { 
        transition: { duration: 0.3, delay: 1.4 },
        className: "",
        content: `Total: ${total}`
      },
      { 
        transition: { duration: 0.3, delay: 1.7 },
        className: "",
        content: `WPM: ${wpm}`
      },
    ]

    listVariants.map((variant, index) => {
      array.push (
        <motion.li
          key={index}
          initial={initial}
          animate={animate}
          transition={variant.transition}
          className={variant.className}
        >
          {variant.content}
        </motion.li>
      )
    })

    return array
  }

  return (
    <motion.ul
      initial={initial}
      animate={animate}
      className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
    >
      {ListingVariants()}
    </motion.ul>
  );
};

export default Results;