import Layout from '../components/Layout';
import Canvas from '../components/Canvas';
import Customizer from './components/Customizer';

import React, { useEffect, useState } from 'react';

export default function HomePage() {
 const [type, setType] = useState('');
 const [isTypeLoaded, setIsTypeLoaded] = useState(false); // Add a new state to track if the type is loaded

 useEffect(() => {
    const selectedType = localStorage.getItem('selectedType');
    console.log("type " + selectedType);
    setType(selectedType);
    setIsTypeLoaded(true); // Set the flag to true after setting the type
 }, []);

 return (
    <Layout>
      <Canvas type={type} />
      {isTypeLoaded && <Customizer type={type} setType={setType} />} {/* Conditionally render Customizer */}
    </Layout>
 );
}