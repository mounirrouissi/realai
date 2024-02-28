

import Layout from '../components/Layout';
import Canvas from '../components/Canvas'
import Customizer from './components/Customizer';

import React, { useEffect, useState } from 'react';


export default function HomePage() {
  const [type, setType] = useState('Tshirt');

  useEffect(() => {

    console.log("type "+localStorage.getItem('selectedType'))
     setType(localStorage.getItem('selectedType'));
  },[])


  return (
    <Layout>
      <Canvas type={type}   />
      <Customizer type={type}  setType={setType} />
    </Layout>
  );
}



