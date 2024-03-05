'use client'
import React, { useState } from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { useSnapshot } from 'valtio';
import state from '../../store'
import { set } from 'valtio';
import Header from "@/components/Header";
import Loading from '@/components/Loading'
import { useRouter } from "next/navigation";

export default function PrintOptionsComponent() {
  const [loading,setLoading] = useState(false)
  const [selectedColorHoodie, setSelectedColorHoodie] = useState('#f3f4f6'); // Default color for Hoodie
  const [colorIndexHoodie, setColorIndexHoodie] = useState(0); // Index to cycle through colors for Hoodie
const snap = useSnapshot(state); // Subscribe to state changes
  const [selectedColorTshirt, setSelectedColorTshirt] = useState('#f3f4f6'); // Default color for Tshirt
  const [colorIndexTshirt, setColorIndexTshirt] = useState(0); // Index to cycle through colors for Tshirt
  const router = useRouter();

 

 
 // Define the two categories of colors
 const HoodieColors = ["black", "white", "blue", "#D3D3D3", "brown", "#654321", "pink", "grey"];
const tshirtColors =  ["gray", "white", "black", "red", "blue", "green", "yellow", "pink", "purple", "orange", "brown", "navy", "teal", "maroon", "beige"];



const colorNameMapping = {
  "#FFFFFF": "white",
  "#D3D3D3": "light gray",
  "#654321": "brown",
  // Add other color mappings as needed
};
  // Function to handle color selection
  const handleColorSelect = (color, type) => {
    console.log("selected color:", color);
    console.log("selected type:", type);
    
  // Use the color name from the mapping, or the color itself if no mapping exists
  const colorName = colorNameMapping[color] || color;

  console.log("selected color name:", colorName);
  state.color = colorName; // Update the state directly
  localStorage.setItem('selectedColor', colorName);
    localStorage.setItem('selectedType',type);
    state["type"] = type

    state["selectedColor"] = colorName; // Update the state directly
     state.selectedType = type; // Update the state directly
     state.type = type; // Update the state directly
     state.intro =true
    // setColor(color);
    router.push(`/Home`);
    setLoading(true)
  };


 const handleFameSelected = (type) => {
  state.selectedType = type; // Update the state directly
  localStorage.setItem('selectedType',type);

  state.type = type; // Update the state directly
 // setColor(color);
 router.push(`/Home`);
 setLoading(true)
 }
 // Function to handle color change with arrows for Hoodie (Hoodie)
const handleColorChangeHoodie = (direction) => {
  const newIndex = direction === 'next' ? colorIndexHoodie +  1 : colorIndexHoodie -  1;
  if (newIndex >=  0 && newIndex < HoodieColors.length) {
    setColorIndexHoodie(newIndex);
    setSelectedColorHoodie(HoodieColors[newIndex]);
  }
};

// Function to handle color change with arrows for Tshirt (T-shirt)
const handleColorChangeTshirt = (direction) => {
  const newIndex = direction === 'next' ? colorIndexTshirt +  1 : colorIndexTshirt -  1;
  if (newIndex >=  0 && newIndex < tshirtColors.length) {
    setColorIndexTshirt(newIndex);
    setSelectedColorTshirt(tshirtColors[newIndex]);
  }
};

// Function to render a row of three colors
const renderColorRow = (startIndex, type) => {
  const colors = type === 'Hoodie' ? HoodieColors : tshirtColors;
  const selectedColor = type === 'Hoodie' ? selectedColorHoodie : selectedColorTshirt;
  const colorIndex = type === 'Hoodie' ? colorIndexHoodie : colorIndexTshirt;
  return colors.slice(startIndex, startIndex +  3).map((color, index) => (
    <Box
      key={index}
      sx={{
        backgroundColor: color,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        margin: '0  5px',
        cursor: 'pointer',
        transition: 'transform  0.3s',
        '&:hover': {
          transform: 'scale(1.1)',
        },
        // Highlight selected color
        border: selectedColor === color ? '2px solid #000' : 'none',
      }}
      onClick={() => handleColorSelect(color, type)}
    />
  ));
};
  return (
    <div className="">
    <Header />
  { loading ? <Loading/> : 
       
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap:   4, p:   5, flex: '0 1 auto' }}>
        {/* tshirt Box */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '75vh', // Adjust the height as needed
            width:'55vh',
            m:   1,
            p:   1,
            backgroundColor: '#f3f4f6',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0   10px   15px -3px rgba(0,   0,   0,   0.1),   0   4px   6px -2px rgba(0,   0,   0,   0.05)',
            transition: 'transform   0.5s',
            '&:hover': {
              transform: 'scale(0.95)',
            },
          }}
        >
          <Link
      
            onClick={() => (state.intro = false)} // Make sure 'state' is defined in your component or context
            sx={{
              flex: '1   0 auto',
              width: '100%', // Ensure the link takes the full width of the parent Box
              position: 'relative',
            }}
          >
            <img src={'./img/t-shirt.svg'} alt="Phone Accessories Image" style={{ width: '100%', objectFit: 'cover' }} />
            <Box
              sx={{
                position: 'absolute',
                top:   0,
                bottom:   0,
                left:   0,
                right:   0,
                background: 'linear-gradient(to top, rgba(0,   0,   0,   0.7), transparent)',
                transition: 'background   0.5s',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                bottom:   0,
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                p:   0.5,
                color: '#ffffff',
              }}
            >
              Tshirt
            </Typography>
          </Link>
          <Typography variant="subtitle1" sx={{ marginTop:   2, textAlign: 'center' }}>
            Choose a color
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:3,  marginLeft:1,marginRight:1 }}>
          <IconButton 
  className="text-3xl sm:text-5xl"
  onClick={() => handleColorChangeTshirt('prev')}
>
  <ArrowBackIos />
</IconButton>


            <Box sx={{ display: 'flex', gap:   2 }}>
              {renderColorRow(colorIndexTshirt,'Tshirt')}
            </Box>
            <IconButton
  className="text-3xl sm:text-5xl" 
  onClick={() => handleColorChangeTshirt('next')}
>
  <ArrowForwardIos />  
</IconButton>
          </Box>
        </Box>
        {/* hoodie Box */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '75vh', // Adjust the height as needed
            width:'55vh',
            m:   1,
            p:   1,
            backgroundColor: '#f3f4f6',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0   10px   15px -3px rgba(0,   0,   0,   0.1),   0   4px   6px -2px rgba(0,   0,   0,   0.05)',
            transition: 'transform   0.5s',
            '&:hover': {
              transform: 'scale(0.95)',
            },
          }}
        >
          <Link
      
            onClick={() => (state.intro = false)} // Make sure 'state' is defined in your component or context
            sx={{
              flex: '1   0 auto',
              width: '100%', // Ensure the link takes the full width of the parent Box
              position: 'relative',
            }}
          >
            <img src={'./img/hoodie-solid-color-clothing.png'} alt="Hoodie Image" style={{ width: '100%', objectFit: 'cover' }} />
            <Box
              sx={{
                position: 'absolute',
                top:   0,
                bottom:   0,
                left:   0,
                right:   0,
                background: 'linear-gradient(to top, rgba(0,   0,   0,   0.7), transparent)',
                transition: 'background   0.5s',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                bottom:   0,
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                p:   0.5,
                color: '#ffffff',
              }}
            >
              Hoodie
            </Typography>
          </Link>
          <Typography variant="subtitle1" sx={{ marginTop:   2, textAlign: 'center' }}>
            Choose a color
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:3,  marginLeft:1,marginRight:1 }}>
            <IconButton 
              onClick={() => handleColorChangeHoodie('prev')}

            >
              <ArrowBackIos   />
            </IconButton>
            <Box sx={{ display: 'flex', gap:   2 }}>
              {renderColorRow(colorIndexHoodie,'Hoodie')}
            </Box>
            <IconButton 
  onClick={() => handleColorChangeHoodie('next')}
            >
              <ArrowForwardIos   />
            </IconButton>
          </Box>
        </Box>




      
         {/* Sticker Box */}
        <Box
          onClick={() => {handleFameSelected("Frame")}}

          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '75vh', // Adjust the height as needed
            width:'55vh',
            m:   1,
            p:   1,
            backgroundColor: '#f3f4f6',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0   10px   15px -3px rgba(0,   0,   0,   0.1),   0   4px   6px -2px rgba(0,   0,   0,   0.05)',
            transition: 'transform   0.5s',
            '&:hover': {
              transform: 'scale(0.95)',
            },
          }}
        >
          <Link
      
            onClick={() => {state.intro = false}} // Make sure 'state' is defined in your component or context
            sx={{
              flex: '1   0 auto',
              width: '100%', // Ensure the link takes the full width of the parent Box
              position: 'relative',
            }}
          >
            <img src={'./images/frame.jpg'} alt="Hoodie Image" style={{ width: '100%', objectFit: 'cover' }} />
            <Box
              sx={{
                position: 'absolute',
                top:   0,
                bottom:   0,
                left:   0,
                right:   0,
                background: 'linear-gradient(to top, rgba(0,   0,   0,   0.7), transparent)',
                transition: 'background   0.5s',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                bottom:   0,
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                p:   0.5,
                color: '#ffffff',
              }}
            >
              Sticker
            </Typography>
            
          </Link>
          <Typography variant="subtitle1" sx={{ marginTop:   2, textAlign: 'center' }}>
            
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:   2 }}>
       
          </Box>
          {/* <Typography variant="subtitle1" sx={{ marginTop:   2, textAlign: 'center' }}>
            Choose a color
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:   2 }}>
            <IconButton onClick={() => handleColorChangeHoodie('prev')}>
              <ArrowBackIos />
            </IconButton>
            <Box sx={{ display: 'flex', gap:   2 }}>
              {renderColorRow(colorIndexHoodie,'Frame')}
            </Box>
            <IconButton onClick={() => handleColorChangeHoodie('next')}>
              <ArrowForwardIos />
            </IconButton>
          </Box> */}
        </Box>             {/* frame Box */}
        <Box
          onClick={() => {handleFameSelected("Frame")}}

          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '75vh', // Adjust the height as needed
            width:'55vh',
            m:   1,
            p:   1,
            backgroundColor: '#f3f4f6',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0   10px   15px -3px rgba(0,   0,   0,   0.1),   0   4px   6px -2px rgba(0,   0,   0,   0.05)',
            transition: 'transform   0.5s',
            '&:hover': {
              transform: 'scale(0.95)',
            },
          }}
        >
          <Link
      
            onClick={() => {state.intro = false}} // Make sure 'state' is defined in your component or context
            sx={{
              flex: '1   0 auto',
              width: '100%', // Ensure the link takes the full width of the parent Box
              position: 'relative',
            }}
          >
            <img src={'./images/frame.jpg'} alt="Hoodie Image" style={{ width: '100%', objectFit: 'cover' }} />
            <Box
              sx={{
                position: 'absolute',
                top:   0,
                bottom:   0,
                left:   0,
                right:   0,
                background: 'linear-gradient(to top, rgba(0,   0,   0,   0.7), transparent)',
                transition: 'background   0.5s',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                bottom:   0,
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                p:   0.5,
                color: '#ffffff',
              }}
            >
              Frame
            </Typography>
            
          </Link>
          <Typography variant="subtitle1" sx={{ marginTop:   2, textAlign: 'center' }}>
            
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:   2 }}>
       
          </Box>
          {/* <Typography variant="subtitle1" sx={{ marginTop:   2, textAlign: 'center' }}>
            Choose a color
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:   2 }}>
            <IconButton onClick={() => handleColorChangeHoodie('prev')}>
              <ArrowBackIos />
            </IconButton>
            <Box sx={{ display: 'flex', gap:   2 }}>
              {renderColorRow(colorIndexHoodie,'Frame')}
            </Box>
            <IconButton onClick={() => handleColorChangeHoodie('next')}>
              <ArrowForwardIos />
            </IconButton>
          </Box> */}
        </Box>     
        
        
        
        
     
      </Box>}
    </div>
  );
}