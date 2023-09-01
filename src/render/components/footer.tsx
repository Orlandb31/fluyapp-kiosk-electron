'use strict';

import React from 'react';
import img from "../assets/images/fbiz-white.png"

const Index = () => {
  
  return (
    <div className='flex flex-rows justify-center items-center'> 
      <h4 className='mr-4'>
        Powered by:
      </h4>
      <img 
        className='mx-auto'
        src={img}
        style={{
          height: 35,
          width: 119,
          marginTop: 20  
        }}
      />
    </div>
  );
};

export const Footer =  Index;
