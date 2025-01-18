/*import React, { useEffect, useState } from 'react';
import { IoMdCloudUpload } from "react-icons/io";
import Navbar from './Navbar1';
import Modal from 'react-modal'; // Import the Modal component

function File() {
  const [allData, setAllData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
    const [records,setpro]=useState("records")
    // Function to convert image into base64

    // Function to fetch images
    const fetchImg = async () => {
        const res = await fetch(`http://localhost:19875/getImg?category=${records}`);
        const data = await res.json();
        setAllData(data.data);
    }

    // Function to display PDF and open modal
    const displayPdf = (pdf) => {
        setPdfUrl(pdf);
        setModalIsOpen(true);
    }

    useEffect(() => {
        fetchImg();
    }, []);

    return (
        <>
            <Navbar />
            <div className='ImageContainer'>
        <div className='allimg'>
            {allData
            .map((el, index) => (
                <div key={index} className="card1" >
                    <h3>{el.pdfName}</h3>
                   <img src="pdf.png" onClick={() => displayPdf(el.pdf1)}/>
                      <div className="card-body">
                      <p>{el.subject}.pdf</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
           
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <button onClick={() => setModalIsOpen(false)}>Close Pdf</button>
                <iframe src={`${pdfUrl}`} width="100%" height="600px" title="PDF Viewer"></iframe>
            </Modal>
        </>
    );
}

export default File;*/

import React, { useEffect, useState } from 'react';
import { IoMdCloudUpload } from "react-icons/io";
import Navbar from './Navbar1';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Notes.css';
import {BACKEND_URL} from '../Services/Helper';
function File() {
  const [allData, setAllData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [notes, setNotes] = useState("records");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [isRGUKTian, setIsRGUKTian] = useState(false);
  const location = useLocation();
  const email = location.state.username;
  const subjectsMap = {
    "11": {
        "all": ["Physics", "Chemistry", "English","IT"]
    },
    "12": {
        "all": ["Physics", "Chemistry", "English","IT"]
    },
    "13": {
        computer: ["M1", "pspc", "Beee", "Egcd","Ic"],
        electronics: ["Analog Circuits", "Digital Electronics", "Signals and Systems", "Microcontrollers"],
        mechanical: ["Thermodynamics", "Fluid Mechanics", "Mechanics of Materials", "Machine Design"],
        civil: ["Structural Analysis", "Geotechnical Engineering", "Transportation Engineering", "Environmental Engineering"],
        eee: ["Analog Circuits", "Digital Electronics", "Signals and Systems", "Microcontrollers"]
       
    },
    "14": {
        computer: ["Data structures", "Java", "Datamining", "Mefa"],
        electronics: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
        eee: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
      
        mechanical: ["CAD/CAM", "Robotics", "Automobile Engineering", "Advanced Materials"],
        civil: ["Concrete Technology", "Hydrology", "Surveying", "Remote Sensing"]
    },
    "15": {
        computer: ["Daa", "Dld", "Probability and Statistics", "Database Management System"],
        electronics: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
        eee: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
       
        mechanical: ["CAD/CAM", "Robotics", "Automobile Engineering", "Advanced Materials"],
        civil: ["Concrete Technology", "Hydrology", "Surveying", "Remote Sensing"]
    },
    "16": {
        computer: ["Data Science using Python", "COA", "Compiler and Design", "Operations and Research"],
        electronics: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
        eee: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
       
        mechanical: ["CAD/CAM", "Robotics", "Automobile Engineering", "Advanced Materials"],
        civil: ["Concrete Technology", "Hydrology", "Surveying", "Remote Sensing"]
    },
   
    "17": {
        computer: ["Computer Networks", "Operating Systems", "Software Engineering","ECLS LAB-II"],
        electronics: ["Embedded Systems Design", "Wireless Communication", "Network Security", "Optical Communication"],
        eee: ["Embedded Systems Design", "Wireless Communication", "Network Security", "Optical Communication"],
       
        mechanical: ["Heat Transfer", "Industrial Engineering", "Operations Research", "Finite Element Analysis"],
        civil: ["Transportation Planning", "Earthquake Engineering", "Construction Management", "Water Resources Engineering"]
    },
   
    "18": {
        computer: ["ECLS LAB-III"],
        electronics: ["Biomedical Instrumentation", "Satellite Communication", "MEMS Technology", "Power Electronics"],
        eee: ["Biomedical Instrumentation", "Satellite Communication", "MEMS Technology", "Power Electronics"],
      
        mechanical: ["Renewable Energy Systems", "Aerospace Engineering", "Nano Technology", "Industrial Automation"],
        civil: ["Environmental Impact Assessment", "Green Building Design", "Sustainable Urban Infrastructure", "Disaster Management"]
    },
    "19": {
        computer: ["Data Science", "Natural Language Processing", "Parallel Computing", "Distributed Systems"],
        electronics: ["Internet of Things", "Machine Vision", "Biometric Systems", "Artificial Neural Networks"],
        eee: ["Internet of Things", "Machine Vision", "Biometric Systems", "Artificial Neural Networks"],
        
        mechanical: ["Automotive Engineering", "Advanced Manufacturing Processes", "Energy Management", "Composite Materials"],
        civil: ["Smart Structures", "Urban Planning", "Transportation Infrastructure", "Environmental Modeling"]
    },
    "20": {
        computer: ["Augmented Reality", "Virtual Reality", "Human-Computer Interaction", "Computational Intelligence"],
        electronics: ["Bioelectronics", "Embedded Robotics", "Cognitive Radio", "Photonics"],
        eee: ["Bioelectronics", "Embedded Robotics", "Cognitive Radio", "Photonics"],
       
        mechanical: ["Robotics and Automation", "CAD/CAM/CAE", "Nanomaterials", "Renewable Energy Systems"],
        civil: ["Geographic Information Systems", "Advanced Construction Materials", "Disaster Resilient Infrastructure", "Environmental Pollution Control"]
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const res = await fetch(`${BACKEND_URL}/getImg?category=${notes}`);
      const data = await res.json();
      setAllData(data.data);
    };
    fetchAllData();
    checkIsRGUKTian();
  }, []);
  const fetchFilteredData = async () => {
    const res = await fetch(`${BACKEND_URL}/getImg?category=${notes}&year=${selectedYear}&branch=${selectedBranch}&subject=${selectedSub}`);
    const data = await res.json();
    setAllData(data.data);
  }
  const displayPdf = (pdfPath) => {
    setPdfUrl(`${BACKEND_URL}/uploads/${pdfPath}`); 
    setModalIsOpen(true);
  };

  const handleSubjectChange = (e) => {
    setSelectedSub(e.target.value);
  }
  const checkIsRGUKTian = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getIsRGUKTian/${email}`);
        const isRGUKTianValue = response.data.isRGUKTian;
      console.log(isRGUKTianValue)
      setIsRGUKTian(isRGUKTianValue === "yes");

    } catch (error) {
      console.error('Error checking if RGUKTian:', error);
    }
  };
  useEffect(() => {
    fetchFilteredData();
  }, [selectedYear, selectedBranch, selectedSub]); 

  return (
    <>
      <div>
                <style>
                    {`
                    body {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      min-height: 100vh;
                      background:whitesmoke;
                      background-size: cover;
                      background-position: center;
                      font-family: 'Times New Roman', Times, serif;
                    }
                    .navbar{
                      background-color:black;
                    }
                    .card1{
                      background-color:rgba(255, 215, 255, 0.1);
                    }
                    .card1 img{
                      width:100%;
                      padding:0'
                    }
                    .card-image {
                      width: 100%;
                      height: 200px;
                      object-fit: cover;
                      transition: transform 0.3s;
                  }
                  .card-body{
                    background-color:rgba(255,215,0,0.1)
                  }

                `}
                </style>
       <Navbar username={email} isRGUKTian={isRGUKTian} />
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
      <option value="">Select Year</option>
      <option value="11">PUC1</option>
                                <option value="12">PUC2</option>
                                <option value="13">First Year Sem1</option>
                                <option value="14">First Year Sem2</option>
                                <option value="15">Second Year Sem1</option>
                                <option value="16">Second Year Sem2</option>
                                <option value="17">Third Year Sem1</option>
                                <option value="18">Third Year Sem2</option>
                                <option value="19">Fourth Year</option>
                                <option value="20">Fourth Year</option>
      </select>
      {selectedYear !== "11" && selectedYear!= "12" && (
      <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
      <option value="">Select Branch</option>
            <option value="computer">Computer Science</option>
            <option value="electronics">Electronics</option>
            <option value="mechanical">Mechanical</option>
            <option value="civil">Civil</option>
            <option value="eee">EEE</option>
      </select>)}
      <select value={selectedSub} onChange={handleSubjectChange}>
  <option value="">Select Subject</option>
  {selectedBranch ? (
    // If a branch is selected, display subjects based on the selected branch
    subjectsMap[selectedYear] && subjectsMap[selectedYear][selectedBranch] &&
    subjectsMap[selectedYear][selectedBranch].map((subject, index) => (
      <option key={index} value={subject}>{subject}</option>
    ))
  ) : (
    // If no branch is selected, display subjects for the selected year
    (selectedYear === "11" || selectedYear === "12") ? (
      // For non-branch years 1 and 2, display all subjects available for those years
      selectedYear && subjectsMap[selectedYear] &&
      Object.values(subjectsMap[selectedYear]).map((subjects) =>
        subjects.map((subject, index) => (
          <option key={index} value={subject}>{subject}</option>
        ))
      ).flat()
    ) : (
      // For other non-branch years, display subjects based on the selected year
      selectedYear && subjectsMap[selectedYear] &&
      Object.keys(subjectsMap[selectedYear]).map((branch) =>
        subjectsMap[selectedYear][branch].map((subject, index) => (
          <option key={index} value={subject}>{subject}</option>
        ))
      ).flat()
    )
  )}
</select>

      <div className='ImageContainer'>
        <div className='allimg'>
          {allData.map((el, index) => (
            <div key={index} className="card1" >
              <h3>{el.pdfName}</h3>
              <img src="lab.png" className='card-image' onClick={() => displayPdf(el.pdf1)} />
              <div className="card-body">
                <p style={{color:'black',fontWeight:'bold'}}>{el.pdf1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <button onClick={() => setModalIsOpen(false)}>Close Pdf</button>
        <iframe src={`${pdfUrl}`} width="100%" height="600px" title="PDF Viewer"></iframe>
      </Modal>
      </div>
    </>
  );
}

export default File;
