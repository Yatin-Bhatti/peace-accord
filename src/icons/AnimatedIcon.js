import * as React from "react";
import { motion } from "framer-motion";
import "./AnimatedIcon.css";
const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)"
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "black"
  }
};

export const AnimatedIcon = () => (
  <div className="container">
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 23 23"
      className="item"
    >
      <motion.path
        d="M9.37013 0.000282576C9.60363 -0.0064557 9.82402 0.107691 9.95267 0.302562L14.0865 6.56355L7.20467 3.12267C7.25592 3.02689 7.30862 2.93179 7.36302 2.83759C8.19762 1.39228 8.80676 0.336972 8.80676 0.336972C8.92351 0.134689 9.13667 0.00729039 9.37013 0.000282576ZM21.8836 7.21741H22.3262C22.6983 7.21741 23 7.51906 23 7.8912C23 8.26333 22.6983 8.56502 22.3262 8.56502H21.8836L20.8348 9.61382V11.1391C20.8348 16.0873 16.809 20.113 11.8609 20.113H9.61386L6.92421 22.8026C6.79785 22.929 6.62652 23 6.44777 23H2.1173C1.84481 23 1.59908 22.8358 1.49478 22.584C1.39051 22.3322 1.44815 22.0424 1.64086 21.8497L8.5423 14.9483C3.73202 14.2261 0 10.0722 0 5.00429V2.1173C0 1.88375 0.12093 1.66687 0.319574 1.54414C0.518264 1.42133 0.766277 1.41019 0.975164 1.51463L14.9757 8.5148L17.3258 6.16454C18.2922 5.19845 19.8645 5.19831 20.8308 6.16449L21.8836 7.21741Z"
        variants={icon}
        initial="hidden"
        animate="visible"
        transition={{
          default: { duration: 2, ease: "easeInOut" },
          fill: { duration: 2, ease: [1, 0, 0.8, 1] }
        }}
      />
    </motion.svg>
  </div>
);