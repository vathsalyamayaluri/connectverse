import React from 'react';
import './About.css';
import {Link} from 'react-router-dom';
function AboutPage() {
    return (
        <div>
        <style>
            {`
            body {
            
              font-family: 'Times New Roman', Times, serif;
              background-image:url('6026986.jpg');
              margin-top:'10%';
            }
        `}
        </style>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
            <div style={{ width: '45%', paddingRight: '20px' }}>
                <h1 style={{  marginTop: '10%',color:'white' }}>
                    ABOUT US
                </h1>
                <p style={{ lineHeight: '2',marginTop:'10%',color:'white' }}>
                    In this module there are several pdfs which are related to academic subjects in year and branch wise.
                    In this module, students can directly access their written notes and records of their academic year where all the students can directly access those notes.
                    In this module, students can directly access their written notes and records of their academic year where all the students can directly access those notes.
                    In this module, students can share their project-related works with their sources so it helps other students which domain of projects are in trend and how to develop a project.
                    In this module, the artworks of students will be shared so talents of students will explore and lead to learning new things and effective communication among the students.
                </p>
                <button type="button" className="btn btn-primary" style={{ marginTop: '95px' }}><Link to='/options'>Sign In</Link></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '50%' ,padding:'20px'}}>
                <div style={{ marginTop: '20px' }}>
                    <img src="4380.jpg" alt="" id="ig"  style={{  marginBottom: '10px' }} />
                    <img src="not.avif" alt="" id="ig"  style={{ marginLeft:'20px' }} />
                </div>
                <div style={{marginTop:'2px'}}>
                    <img src="reco.avif" alt="" id="ig"  style={{ marginBottom: '10px' }} />
                    <img src="art.avif" alt="" id="ig"  style={{marginLeft:'20px'}} />
                </div>
            </div>
        </div>
        </div>
    );
}

export default AboutPage;
