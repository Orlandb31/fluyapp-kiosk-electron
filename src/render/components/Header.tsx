'use strict';

import React from 'react';
import img from "../assets/images/metrored.png";

const Index = () => {
  
  return (
    <div className=''> 
      <img 
        className='mx-auto'
        src={img}
        style={{
          height: 140,
          width: 476,
          marginTop: 20  
        }}
      />
    </div>
  );
};

export const Header =  Index;
