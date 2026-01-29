import React from 'react';
import { Link, useLocation } from "react-router-dom";
import AnimatedLink from './animatedLink/AnimatedLink';

const LearnMore = ({to, className}) => {
  return (
      <AnimatedLink className={`${className}`} to={to} >
      <p>LEARN MORE</p>
    </AnimatedLink>
  );
}

export default LearnMore;
