import React from 'react'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Features from './components/Features/Features'
import ProductPreview from './components/ProductsPreview/ProductPreview'
import Contact from './components/Contact/Contact'
import Bio from './components/About/Bio'
import FeaturesCard from './components/Features/FeaturesCard'

export default function page() {
  return (
    <div className=''>

  <Hero/>
  <About/>
  <FeaturesCard/>
  <Bio/>
  <ProductPreview/>
  <Features/>
  <Contact/>

    </div>
  )
}

