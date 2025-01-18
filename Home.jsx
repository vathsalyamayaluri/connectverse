
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Home1';
import Navbar from './Navbar';
import AboutPage from './About';
import ContactPage from './Contact';
import Footer from './Footer';

function App() {
return (
<>
<Navbar />
<Routes>
<Route path="/" element={<HomePage />} />

</Routes>


<>

<section id='abt'>
<div className='about'>
<AboutPage />
</div>
</section>
<section id='cnt'>
<div className='contact'>
<ContactPage />
</div>
</section>
<section id='foot'>
<div className='foot'>
<Footer />
</div>
</section>
</>
</>
);
}

export default App;