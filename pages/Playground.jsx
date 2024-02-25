

import Layout from '../components/Layout';
import Canvas from '../components/Canvas'
import Customizer from './components/Customizer';

import React, { useEffect, useState } from 'react';


export default function HomePage() {

  return (
    <Layout>
      <Canvas />
      <Customizer  />
    </Layout>
  );
}



