import React from 'react'
import AutoPlayMethods from '../components/Layout/Hero'
import Explore from '../components/Layout/Explore';
import Gendercollection from '../components/Products/Gendercollection.jsx';
import Bestseller from '../components/Products/Bestseller.jsx';
import SimilerProduct from '../components/Products/SimilerProduct.jsx';
import GirlGrid from '../components/Products/GirlGrid.jsx';
import Marque from '@components/Layout/Marque';
import ShopKnow from '@components/Layout/ShopKnow';
import MovingText from '@components/Layout/MovingText';
import FastDelivery from '@components/Layout/FastDelivery';
import TrustSection from '@components/Layout/TrustSection';

function Home() {
  return (
    <>
      <Explore />
      <Gendercollection />
      <AutoPlayMethods />
      <Bestseller />
      <SimilerProduct />
      <GirlGrid />
      <Marque />
      <ShopKnow />
      <MovingText />
      <FastDelivery />
      <TrustSection />

    </>

  )
}

export default Home;