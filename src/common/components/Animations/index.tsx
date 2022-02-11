import React, { useEffect } from "react";

import { motion, usePresence } from "framer-motion";

type FadeAnimationProps = {
  className?: string;
};

export const CardListAnimation: React.FC = ({ children }) => {
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    !isPresent && safeToRemove && setTimeout(safeToRemove, 800);
  }, [isPresent, safeToRemove]);

  const animations: any = {
    layout: true,
    initial: { y: 30, opacity: 0 },
    animate: isPresent ? "in" : "out",
    style: {
      position: isPresent ? "static" : "absolute",
      width: isPresent ? "100%" : "358px",
    },
    variants: {
      in: { y: 0, opacity: 1 },
      out: { y: -30, scale: 0.4, opacity: 0, zIndex: -1 },
    },
    transition: {
      type: "spring",
      bounce: 0.2,
    },
  };
  return <motion.div {...animations}>{children}</motion.div>;
};

export const ListAnimation: React.FC = ({ children }) => {
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    !isPresent && safeToRemove && setTimeout(safeToRemove, 300);
  }, [isPresent, safeToRemove]);

  const animations: any = {
    layout: true,
    initial: { opacity: 0 },
    animate: isPresent ? "in" : "out",
    variants: {
      in: { y: 0, opacity: 1 },
      out: { scale: 0.3, opacity: 0, zIndex: -1 },
    },
    transition: {
      type: "spring",
      bounce: 0.2,
    },
  };
  return <motion.div {...animations}>{children}</motion.div>;
};

export const FadeAnimation: React.FC<FadeAnimationProps> = (props) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -60 }}
      exit={{ opacity: 0, y: -60 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {props.children}
    </motion.div>
  );
};
