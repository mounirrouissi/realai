

import Layout from '../components/Layout';
import Canvas from '../components/Canvas'
import Customizer from './components/Customizer';

import React, { useEffect, useState } from 'react';


export default function HomePage() {
  const [type, setType] = useState('Tshirt');

  return (
    <Layout>
      <Canvas type={type}  setType={setType} />
      <Customizer type={type}  setType={setType} />
    </Layout>
  );
}



