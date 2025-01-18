/*import React, { useEffect, useState } from 'react';
import { IoMdCloudUpload } from "react-icons/io";
import Navbar from './Navbar1';
import Modal from 'react-modal'; // Import the Modal component
import './Notes.css';
function File() {
  const [allData, setAllData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [notes, setNotes] = useState("notes");
  const [selectedYear, setSelectedYear] = useState(""); // State to store selected year
 // const [selectedSemester, setSelectedSemester] = useState(""); // State to store selected semester
  const [selectedBranch, setSelectedBranch] = useState(""); // State to store selected branch
  const [selectedSub, setSelectedSub] = useState(""); // State to store selected subject

  // Map of year and semester to subjects
  const subjectsMap = {
    "3": {
        computer: ["M1", "pspc", "Beee", "Egcd","Ic"],
        electronics: ["Analog Circuits", "Digital Electronics", "Signals and Systems", "Microcontrollers"],
        mechanical: ["Thermodynamics", "Fluid Mechanics", "Mechanics of Materials", "Machine Design"],
        civil: ["Structural Analysis", "Geotechnical Engineering", "Transportation Engineering", "Environmental Engineering"],
        eee: ["Analog Circuits", "Digital Electronics", "Signals and Systems", "Microcontrollers"]
       
    },
    "4": {
        computer: ["Data structures", "Java", "Datamining", "Mefa"],
        electronics: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
        eee: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
      
        mechanical: ["CAD/CAM", "Robotics", "Automobile Engineering", "Advanced Materials"],
        civil: ["Concrete Technology", "Hydrology", "Surveying", "Remote Sensing"]
    },
    "5": {
        computer: ["Daa", "Dld", "Probability and Statistics", "Database Management System"],
        electronics: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
        eee: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
       
        mechanical: ["CAD/CAM", "Robotics", "Automobile Engineering", "Advanced Materials"],
        civil: ["Concrete Technology", "Hydrology", "Surveying", "Remote Sensing"]
    },
    "6": {
        computer: ["Data Science using Python", "COA", "Compiler and Design", "Operations and Research"],
        electronics: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
        eee: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
       
        mechanical: ["CAD/CAM", "Robotics", "Automobile Engineering", "Advanced Materials"],
        civil: ["Concrete Technology", "Hydrology", "Surveying", "Remote Sensing"]
    },
    "7": {
        computer: ["Computer Networks", "DataMining", "Operating Systems", "Software Engineering","Mfds"],
        electronics: ["Embedded Systems Design", "Wireless Communication", "Network Security", "Optical Communication"],
        eee: ["Embedded Systems Design", "Wireless Communication", "Network Security", "Optical Communication"],
       
        mechanical: ["Heat Transfer", "Industrial Engineering", "Operations Research", "Finite Element Analysis"],
        civil: ["Transportation Planning", "Earthquake Engineering", "Construction Management", "Water Resources Engineering"]
    },
    "17": {
        computer: ["Computer Networks", "Operating Systems", "Software Engineering","ECLS LAB-II"],
        electronics: ["Embedded Systems Design", "Wireless Communication", "Network Security", "Optical Communication"],
        eee: ["Embedded Systems Design", "Wireless Communication", "Network Security", "Optical Communication"],
       
        mechanical: ["Heat Transfer", "Industrial Engineering", "Operations Research", "Finite Element Analysis"],
        civil: ["Transportation Planning", "Earthquake Engineering", "Construction Management", "Water Resources Engineering"]
    },
    "8": {
        computer: ["Artifical Intelligence", "Human Computer INteraction", "OOAD", "Cryptography and Network Security","CDC","Software Testing"],
        electronics: ["Biomedical Instrumentation", "Satellite Communication", "MEMS Technology", "Power Electronics"],
        eee: ["Biomedical Instrumentation", "Satellite Communication", "MEMS Technology", "Power Electronics"],
      
        mechanical: ["Renewable Energy Systems", "Aerospace Engineering", "Nano Technology", "Industrial Automation"],
        civil: ["Environmental Impact Assessment", "Green Building Design", "Sustainable Urban Infrastructure", "Disaster Management"]
    },
    "18": {
        computer: ["ECLS LAB-III"],
        electronics: ["Biomedical Instrumentation", "Satellite Communication", "MEMS Technology", "Power Electronics"],
        eee: ["Biomedical Instrumentation", "Satellite Communication", "MEMS Technology", "Power Electronics"],
      
        mechanical: ["Renewable Energy Systems", "Aerospace Engineering", "Nano Technology", "Industrial Automation"],
        civil: ["Environmental Impact Assessment", "Green Building Design", "Sustainable Urban Infrastructure", "Disaster Management"]
    },
    "9": {
        computer: ["Data Science", "Natural Language Processing", "Parallel Computing", "Distributed Systems"],
        electronics: ["Internet of Things", "Machine Vision", "Biometric Systems", "Artificial Neural Networks"],
        eee: ["Internet of Things", "Machine Vision", "Biometric Systems", "Artificial Neural Networks"],
        
        mechanical: ["Automotive Engineering", "Advanced Manufacturing Processes", "Energy Management", "Composite Materials"],
        civil: ["Smart Structures", "Urban Planning", "Transportation Infrastructure", "Environmental Modeling"]
    },
    "10": {
        computer: ["Augmented Reality", "Virtual Reality", "Human-Computer Interaction", "Computational Intelligence"],
        electronics: ["Bioelectronics", "Embedded Robotics", "Cognitive Radio", "Photonics"],
        eee: ["Bioelectronics", "Embedded Robotics", "Cognitive Radio", "Photonics"],
       
        mechanical: ["Robotics and Automation", "CAD/CAM/CAE", "Nanomaterials", "Renewable Energy Systems"],
        civil: ["Geographic Information Systems", "Advanced Construction Materials", "Disaster Resilient Infrastructure", "Environmental Pollution Control"]
    }
    // Add more mappings as needed
  };

  // Function to fetch images
  const fetchImg = async () => {
    const res = await fetch(`http://localhost:19875/getImg?category=${notes}&year=${selectedYear}&branch=${selectedBranch}&subject=${selectedSub}`);
    const data = await res.json();
    setAllData(data.data);
  }

  // Function to display PDF and open modal
  const displayPdf = (pdf) => {
    setPdfUrl(pdf);
    setModalIsOpen(true);
  }

  // Function to handle subject change
  const handleSubjectChange = (e) => {
    setSelectedSub(e.target.value);
  }

  useEffect(() => {
    // Fetch all PDFs when the component mounts
    const fetchAllData = async () => {
      const res = await fetch(`http://localhost:19875/getImg?category=${notes}`);
      const data = await res.json();
      setAllData(data.data);
    };
    fetchAllData();
  }, []);
  const fetchFilteredData = async () => {
    const res = await fetch(`http://localhost:19875/getImg?category=${notes}&year=${selectedYear}&branch=${selectedBranch}&subject=${selectedSub}`);
    const data = await res.json();
    setAllData(data.data);
  }
  useEffect(() => {
    fetchFilteredData();
  }, [selectedYear, selectedBranch, selectedSub]); // Fetch filtered data whenever filters change

  return (
    <>
      <Navbar />
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">Select Year</option>
                                <option value="1">PUC1</option>
                                <option value="2">PUC2</option>
                                <option value="3">First Year Sem1</option>
                                <option value="4">First Year Sem2</option>
                                <option value="5">Second Year Sem1</option>
                                <option value="6">Second Year Sem2</option>
                                <option value="7">Third Year Sem1</option>
                                <option value="8">Third Year Sem2</option>
                                <option value="9">Fourth Year</option>
                                <option value="10">Fourth Year</option>
          </select>
    
          <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
            <option value="">Select Branch</option>
            <option value="computer">Computer Science</option>
            <option value="electronics">Electronics</option>
            <option value="mechanical">Mechanical</option>
            <option value="civil">Civil</option>
            <option value="eee">EEE</option>
          </select>
       
          <select value={selectedSub} onChange={handleSubjectChange}>
            <option value="">Select Subject</option>
            {subjectsMap[selectedYear] && subjectsMap[selectedYear][selectedBranch] &&
              subjectsMap[selectedYear][selectedBranch].map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
          </select>
      <div className='ImageContainer'>
        <div className='allimg'>
   
        

          {allData.map((el, index) => (
            <div key={index} className="card1" >
              <h3>{el.pdfName}</h3>
              <img src="pdf.png" onClick={() => displayPdf(el.pdf1)} />
              <div className="card-body">
                <p>{el.pdf1}</p>
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
import Navbar1 from './Navbar1';
import Modal from 'react-modal';
import {BACKEND_URL} from '../Services/Helper';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Notes.css';


function File() {
  const [allData, setAllData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [notes, setNotes] = useState("notes");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [isRGUKTian, setIsRGUKTian] = useState(false);
  const location = useLocation();
  const email = location.state.username;

  const subjectsMap = {
    "1": {
        "all": ["Physics", "Chemistry", "English", "Telugu","IT","Maths"]
    },
    "2": {
        "all": ["Physics", "Chemistry", "English", "Telugu","IT","Maths"]
    },
    "3": {
        computer: ["M1", "pspc", "Beee", "Egcd","Ic"],
        electronics: ["Analog Circuits", "Digital Electronics", "Signals and Systems", "Microcontrollers"],
        mechanical: ["Thermodynamics", "Fluid Mechanics", "Mechanics of Materials", "Machine Design"],
        civil: ["Structural Analysis", "Geotechnical Engineering", "Transportation Engineering", "Environmental Engineering"],
        eee: ["Analog Circuits", "Digital Electronics", "Signals and Systems", "Microcontrollers"]
       
    },
    "4": {
        computer: ["Data structures", "Java", "Datamining", "Mefa"],
        electronics: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
        eee: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
      
        mechanical: ["CAD/CAM", "Robotics", "Automobile Engineering", "Advanced Materials"],
        civil: ["Concrete Technology", "Hydrology", "Surveying", "Remote Sensing"]
    },
    "5": {
        computer: ["Daa", "Dld", "Probability and Statistics", "Database Management System"],
        electronics: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
        eee: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
       
        mechanical: ["CAD/CAM", "Robotics", "Automobile Engineering", "Advanced Materials"],
        civil: ["Concrete Technology", "Hydrology", "Surveying", "Remote Sensing"]
    },
    "6": {
        computer: ["Data Science using Python", "COA", "Compiler and Design", "Operations and Research"],
        electronics: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
        eee: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
       
        mechanical: ["CAD/CAM", "Robotics", "Automobile Engineering", "Advanced Materials"],
        civil: ["Concrete Technology", "Hydrology", "Surveying", "Remote Sensing"]
    },
    "7": {
        computer: ["Computer Networks", "DataMining", "Operating Systems", "Software Engineering","Mfds"],
        electronics: ["Embedded Systems Design", "Wireless Communication", "Network Security", "Optical Communication"],
        eee: ["Embedded Systems Design", "Wireless Communication", "Network Security", "Optical Communication"],
       
        mechanical: ["Heat Transfer", "Industrial Engineering", "Operations Research", "Finite Element Analysis"],
        civil: ["Transportation Planning", "Earthquake Engineering", "Construction Management", "Water Resources Engineering"]
    },
    "17": {
        computer: ["Computer Networks", "Operating Systems", "Software Engineering","ECLS LAB-II"],
        electronics: ["Embedded Systems Design", "Wireless Communication", "Network Security", "Optical Communication"],
        eee: ["Embedded Systems Design", "Wireless Communication", "Network Security", "Optical Communication"],
       
        mechanical: ["Heat Transfer", "Industrial Engineering", "Operations Research", "Finite Element Analysis"],
        civil: ["Transportation Planning", "Earthquake Engineering", "Construction Management", "Water Resources Engineering"]
    },
    "8": {
        computer: ["Artifical Intelligence", "Human Computer INteraction", "OOAD", "Cryptography and Network Security","CDC","Software Testing"],
        electronics: ["Biomedical Instrumentation", "Satellite Communication", "MEMS Technology", "Power Electronics"],
        eee: ["Biomedical Instrumentation", "Satellite Communication", "MEMS Technology", "Power Electronics"],
      
        mechanical: ["Renewable Energy Systems", "Aerospace Engineering", "Nano Technology", "Industrial Automation"],
        civil: ["Environmental Impact Assessment", "Green Building Design", "Sustainable Urban Infrastructure", "Disaster Management"]
    },
    "18": {
        computer: ["ECLS LAB-III"],
        electronics: ["Biomedical Instrumentation", "Satellite Communication", "MEMS Technology", "Power Electronics"],
        eee: ["Biomedical Instrumentation", "Satellite Communication", "MEMS Technology", "Power Electronics"],
      
        mechanical: ["Renewable Energy Systems", "Aerospace Engineering", "Nano Technology", "Industrial Automation"],
        civil: ["Environmental Impact Assessment", "Green Building Design", "Sustainable Urban Infrastructure", "Disaster Management"]
    },
    "9": {
        computer: ["Data Science", "Natural Language Processing", "Parallel Computing", "Distributed Systems"],
        electronics: ["Internet of Things", "Machine Vision", "Biometric Systems", "Artificial Neural Networks"],
        eee: ["Internet of Things", "Machine Vision", "Biometric Systems", "Artificial Neural Networks"],
        
        mechanical: ["Automotive Engineering", "Advanced Manufacturing Processes", "Energy Management", "Composite Materials"],
        civil: ["Smart Structures", "Urban Planning", "Transportation Infrastructure", "Environmental Modeling"]
    },
    "10": {
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
                      background:url('n.jpg');
                      background-size: cover;
                      background-position: center;
                      font-family: 'Times New Roman', Times, serif;
                    }
                `}
                </style>
    
       <Navbar1 username={email} isRGUKTian={isRGUKTian} />
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
      <option value="">Select Year</option>
      <option value="1">PUC1</option>
                                <option value="2">PUC2</option>
                                <option value="3">First Year Sem1</option>
                                <option value="4">First Year Sem2</option>
                                <option value="5">Second Year Sem1</option>
                                <option value="6">Second Year Sem2</option>
                                <option value="7">Third Year Sem1</option>
                                <option value="8">Third Year Sem2</option>
                                <option value="9">Fourth Year</option>
                                <option value="10">Fourth Year</option>
      </select>
      {selectedYear !== "1" && selectedYear!="2" && (
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
    subjectsMap[selectedYear] && subjectsMap[selectedYear][selectedBranch] &&
    subjectsMap[selectedYear][selectedBranch].map((subject, index) => (
      <option key={index} value={subject}>{subject}</option>
    ))
  ) : (
    (selectedYear === "1" || selectedYear === "2") ? (
      selectedYear && subjectsMap[selectedYear] &&
      Object.values(subjectsMap[selectedYear]).map((subjects) =>
        subjects.map((subject, index) => (
          <option key={index} value={subject}>{subject}</option>
        ))
      ).flat()
    ) : (
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
        <div className='allimg' style={{marginLeft:"40%"}}>
          {allData.map((el, index) => (
            <div key={index} className="card1" >
              <h3>{el.pdfName}</h3>
              <img src="pdf.svg" onClick={() => displayPdf(el.pdf1)} style={{width:'200px'}} />
              <div className="card-body">
                <p>{el.pdf1}</p>
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
