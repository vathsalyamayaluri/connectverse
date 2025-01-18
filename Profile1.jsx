import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; 
import { IoIosHome } from 'react-icons/io';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import './Profile1.css';
import { MdEdit } from "react-icons/md";
import { FaBook, FaFileAlt, FaBookOpen, FaPalette } from 'react-icons/fa';
import { IoMdCloudUpload } from "react-icons/io";
import {BACKEND_URL} from '../Services/Helper';
function File({ email }) {
    const [img, setImg] = useState(null);
    const navigate=useNavigate();
    const [pdf, setPdf] = useState(null);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [isRGUKTian, setIsRGUKTian] = useState(false);
    const [allData, setAllData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState("");
    const [selectedCategory,  handleOptionClick] = useState("projects");
    const [year, setYear] = useState('');
    const [branch, setBranch] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDescription, setSelectedDescription] = useState(null); // Track selected description
    useEffect(() => {
        checkIsRGUKTian();
      }, []);
      const checkIsRGUKTian = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/getIsRGUKTian/${email}`);
          const isRGUKTianValue = response.data.isRGUKTian;
          setIsRGUKTian(isRGUKTianValue === "yes");
        } catch (error) {
          console.error('Error checking if RGUKTian:', error);
        }
      };
    const handleImage = (e) => {
        const file = e.target.files[0];
        setImg(file);
    };

    const handlePdf = (e) => {
        const file = e.target.files[0];
        setPdf(file);
    };

    const fetchAllData = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/getImg?email=${email}&category=${selectedCategory}`);
            setAllData(res.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const displayPdf = (pdfPath) => {
        setPdfUrl(`${BACKEND_URL}/uploads/${pdfPath}`);
        setModalIsOpen(true);
      };
    

    useEffect(() => {
        fetchAllData();
    }, [selectedCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', img);
        formData.append('pdf', pdf);
        formData.append('email', email);
        formData.append('description', text);
        formData.append('title',title)

        try {
            const res = await axios.post(`${BACKEND_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.data.success) {
                alert("Files uploaded successfully");
                setImg(null);
                setPdf(null);
                setText('');
                fetchAllData();
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Error uploading files. Please try again later.');
        }
    };
    const handleSubmit1 = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', img);
        formData.append('email', email);

        try {
            const res = await axios.post(`${BACKEND_URL}/uploadart`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.data.success) {
                alert("image uploaded successfully");
                setImg(null);
                setPdf(null);
                setText('');
                fetchAllData();
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Error uploading files. Please try again later.');
        }
    };

    const handlerecordSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('pdf', pdf);
        formData.append('year', year);
        formData.append('branch', branch);
        formData.append('subject', subject);
        formData.append('description', description);
        formData.append('email', email);

        try {
            const res = await axios.post(`${BACKEND_URL}/uploadrecord`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            if (res.data.success) {
                alert("Record uploaded successfully");
                setPdf(null);
                setYear('');
                setBranch('');
                setSubject('');
                setDescription('');
            }
        } catch (error) {
            console.error('Error uploading notes:', error);
            alert('Error uploading notes. Please try again later.');
        }
    };
    const handleNotesSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', pdf);
        formData.append('year', year);
        formData.append('branch', branch);
        formData.append('subject', subject);
        formData.append('description', description);
        formData.append('email', email);

        try {
            const res = await axios.post(`${BACKEND_URL}/uploadNotes`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            if (res.data.success) {
                alert("Notes uploaded successfully");
                setPdf(null);
                setYear('');
                setBranch('');
                setSubject('');
                setDescription('');
            }
        } catch (error) {
            console.error('Error uploading notes:', error);
            alert('Error uploading notes. Please try again later.');
        }
    };

    const subjectsBySemester = {
        "1": {
            "all": ["Physics", "Chemistry", "English","IT","Maths","Telugu"]
        },
        "11": {
            "all": ["Physics", "Chemistry", "English","IT"]
        },
        "2": {
            "all": ["Physics", "Chemistry", "English","IT","Maths","Telugu"]
        },
        "12": {
            "all": ["Physics", "Chemistry", "English","IT"]
        },
        
        "3": {
            computer: ["M1", "pspc", "Beee", "Egcd","Ic"],
            electronics: ["Analog Circuits", "Digital Electronics", "Signals and Systems", "Microcontrollers"],
            mechanical: ["Thermodynamics", "Fluid Mechanics", "Mechanics of Materials", "Machine Design"],
            civil: ["Structural Analysis", "Geotechnical Engineering", "Transportation Engineering", "Environmental Engineering"],
            eee: ["Analog Circuits", "Digital Electronics", "Signals and Systems", "Microcontrollers"]
           
        },
        "13": {
            computer: [ "pspc", "Beee", "Egcd"],
            electronics: ["Analog Circuits", "Digital Electronics", "Signals and Systems", "Microcontrollers"],
            mechanical: ["Thermodynamics", "Fluid Mechanics", "Mechanics of Materials", "Machine Design"],
            civil: ["Structural Analysis", "Geotechnical Engineering", "Transportation Engineering", "Environmental Engineering"],
            eee: ["Analog Circuits", "Digital Electronics", "Signals and Systems", "Microcontrollers"]
           
        },
        "4": {
            computer: ["Data structures", "Java", "Discrete Mathematics", "Mefa","physics","Environmental Science"],
            electronics: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
            eee: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
          
            mechanical: ["CAD/CAM", "Robotics", "Automobile Engineering", "Advanced Materials"],
            civil: ["Concrete Technology", "Hydrology", "Surveying", "Remote Sensing"]
        },
        "14": {
            computer: ["Data structures", "Java","physics"],
            electronics: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
            eee: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
          
            mechanical: ["CAD/CAM", "Robotics", "Automobile Engineering", "Advanced Materials"],
            civil: ["Concrete Technology", "Hydrology", "Surveying", "Remote Sensing"]
        },
        "5": {
            computer: ["Daa", "Dld", "Probability and Statistics", "Database Management System","Flat"],
            electronics: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
            eee: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
           
            mechanical: ["CAD/CAM", "Robotics", "Automobile Engineering", "Advanced Materials"],
            civil: ["Concrete Technology", "Hydrology", "Surveying", "Remote Sensing"]
        },
        "15": {
            computer: ["Daa", "Dld", "Database Management System"],
            electronics: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
            eee: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
           
            mechanical: ["CAD/CAM", "Robotics", "Automobile Engineering", "Advanced Materials"],
            civil: ["Concrete Technology", "Hydrology", "Surveying", "Remote Sensing"]
        },
        "6": {
            computer: ["Data Science using Python","Web Technologies", "COA", "Compiler and Design", "Operations and Research"],
            electronics: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
            eee: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Communication Systems"],
           
            mechanical: ["CAD/CAM", "Robotics", "Automobile Engineering", "Advanced Materials"],
            civil: ["Concrete Technology", "Hydrology", "Surveying", "Remote Sensing"]
        }, "16": {
            computer: ["Data Science using Python", "COA", "Web Technologies"],
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
    const toggleDescription = (description) => {
        setSelectedDescription(selectedDescription === description ? null : description);
    }
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const handleprofile=()=>{
        navigate('/profile',{ state:{username:email}});
    }
    const handleLogout = () => {
        localStorage.removeItem('isLogged');
        localStorage.removeItem('emailsai');
        navigate('/options');
    };
    const handleHome=()=>{
        if(isRGUKTian){
            navigate('/home')
        }else{
            navigate('/home1')
        }
    }
    const handleprofileClick=()=>{
        navigate('/profile',{ state:{username:email}})
    }
    return (
        <>
         <div className="mainrow">
         <div className="columm">
         <div className="sidebar1">
      <div className="sidebar-header1">Dashboard</div>
      <ul className="sidebar-menu1">
        <li className={selectedCategory === 'projects' ? 'active' : ''} onClick={() => handleOptionClick('projects')}>
          <FaBook />
          <span>Projects</span>
        </li>
        <li className={selectedCategory === 'notes' ? 'active' : ''} onClick={() => handleOptionClick('notes')}>
          <FaFileAlt />
          <span>Written Notes & PDFs</span>
        </li>
        <li className={selectedCategory === 'records' ? 'active' : ''} onClick={() => handleOptionClick('records')}>
          <FaBookOpen />
          <span>Lab Manuals</span>
        </li>
        <li className={selectedCategory === 'arts' ? 'active' : ''} onClick={() => handleOptionClick('arts')}>
          <FaPalette />
          <span>Art Works</span>
        </li>
        <li  onClick={() => handleprofileClick()}>
         <MdEdit />
          <span>Update Profile</span>
        </li>
          <span >{localStorage.getItem('isLogged') && (
                            <li><span onClick={handleLogout}><FaSignOutAlt className="logout-icon" />LOGOUT</span></li>
                        )}</span>
                        
                    <li> <span onClick={handleHome} className='logout-icon'><IoIosHome />Home</span></li>   
        
      </ul>
    </div>
   </div>
    <div className="columm1">
            {selectedCategory === "projects" && (
                <div className='ImageContainer'>
                    <div className='allimg'>
                        {allData
                        .filter(el => el.email === email)
                        .map((el, index) => (
                            <div key={index} className="card">
                               <img 
                        src={`${BACKEND_URL}/uploads/${el.image}`} 
                        width={"300px"} 
                        height={"230px"} 
                        alt={`Image ${index}`} 
                        onClick={() => displayPdf(el.pdf)} 
                    /> <div className="card-body">
                                <h3 onClick={() => toggleDescription(el.description)}>{el.title}</h3>
                            {selectedDescription === el.description && <p className="card-description">Description: {el.description}</p>}
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
             {selectedCategory === "arts" && (
                <div className='ImageContainer'>
                    <div className='allimg'>
                        {allData
                        .filter(el => el.email === email)
                        .map((el, index) => (
                            <div key={index} className="card">
                                <img src={`${BACKEND_URL}/uploads/${el.image}`} width={"300px"} height={"230px"} alt={`Image ${index}`} />
                                
                            </div>
                        ))}
                    </div>
                </div>
            )}
         {selectedCategory === "notes" && (
    <div className='NotesContainer'>
        <h2>Upload Notes</h2>
        <form onSubmit={handleNotesSubmit}>
            <label htmlFor="uploadPdf">
                <div className='uploadBox'>
                    <input type="file" id="uploadPdf"  accept=".pdf,.docx,.doc,.pptx" onChange={handlePdf} />
                    {pdf ? <span>PDF Selected: {pdf.name}</span> : "Select PDF"}
                </div>
            </label>
            <div className='form-group'>
                <label>Year</label>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
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
            </div>
            {year === "1" || year === "2" ? (
                <div className='form-group'>
                    <label>Subject</label>
                    <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                        <option value="">Select Subject</option>
                        {subjectsBySemester[year]["all"].map((sub) => (
                            <option key={sub} value={sub}>{sub}</option>
                        ))}
                    </select>
                </div>
            ) : (
                <>
                    <div className='form-group'>
                        <label>Branch</label>
                        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
                            <option value="">Select Branch</option>
                            <option value="computer">Computer science Engineering</option>
                            <option value="electronics">Electronics and Communication Engineering</option>
                            <option value="mechanical">Mechanical Engineering</option>     
                            <option value="civil">Civil</option>
                            <option value="eee">Electrical And Electronics Engineering</option>
                        </select>
                    </div>
                    {branch && (
                        <div className='form-group'>
                            <label>Subject</label>
                            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                                <option value="">Select Subject</option>
                                {subjectsBySemester[year][branch].map((sub) => (
                                    <option key={sub} value={sub}>{sub}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </>
            )}
            <div className='form-group'>
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <button type="submit" disabled={!pdf || !year || (!subject && (year !== "1" && year !== "2"))}>Upload Notes</button>
            </div>
        </form>
    </div>
)}


{selectedCategory === "records" && (
                <div className='NotesContainer'>
                    <h2>Upload Records</h2>
                    <form onSubmit={handlerecordSubmit}>
                        <label htmlFor="uploadPdf">
                            <div className='uploadBox'>
                                <input type="file" id="uploadPdf" onChange={handlePdf} />
                                {pdf ? <span>PDF Selected: {pdf.name}</span> : "Select PDF"}
                            </div>
                        </label>
                        <div className='form-group'>
                            <label>Year</label>
                            <select value={year} onChange={(e) => setYear(e.target.value)}>
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
                        </div>
                        {year === "1" || year === "2" ? (
                <div className='form-group'>
                    <label>Subject</label>
                    <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                        <option value="">Select Subject</option>
                        {subjectsBySemester[year]["all"].map((sub) => (
                            <option key={sub} value={sub}>{sub}</option>
                        ))}
                    </select>
                </div>
            ) : (
                <>
                    <div className='form-group'>
                        <label>Branch</label>
                        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
                            <option value="">Select Branch</option>
                            <option value="computer">Computer science Engineering</option>
                            <option value="electronics">Electronics and Communication Engineering</option>
                            <option value="mechanical">Mechanical Engineering</option>     
                            <option value="civil">Civil</option>
                            <option value="eee">Electrical And Electronics Engineering</option>
                        </select>
                    </div>
                    {branch && (
                        <div className='form-group'>
                            <label>Subject</label>
                            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                                <option value="">Select Subject</option>
                                {subjectsBySemester[year][branch].map((sub) => (
                                    <option key={sub} value={sub}>{sub}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </>
            )}
            <div className='form-group'>
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <button type="submit" disabled={!pdf || !year || (!subject && (year !== "1" && year !== "2"))}>Upload Record</button>
            </div>
        </form>
    </div>
            )}

            {selectedCategory === "notes" && (
                <div className='ImageContainer'>
                    <div className='allimg'>
                        {allData
                        .filter(el => el.email === email)
                        .map((el, index) => (
                            <div key={index} className="card1" >
                                <h3>{el.pdfName}</h3>
                                <img src="pdf.svg" style={{width:'100%'}} onClick={() => displayPdf(el.pdf1)}/>
                                <div className="card-body">
                                    <p>{el.pdf1}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {selectedCategory === "records" && (
                <div className='ImageContainer'>
                    <div className='allimg'>
                        {allData
                        .filter(el => el.email === email)
                        .map((el, index) => (
                            <div key={index} className="card1" >
                                <h3>{el.pdfName}</h3>
                                <img src="lab.png" onClick={() => displayPdf(el.pdf1)}/>
                                <div className="card-body">
                                    <p>{el.pdf1}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

           
            {selectedCategory === "projects" && (
                <>
        
              
                <div className='form-cont' >
                   <h1 style={{ textAlign: 'center', color: 'black', animation: 'fadeIn 1s ease-in-out' }}>Upload Your Posts Here</h1>

                    <form onSubmit={handleSubmit}>
                    <div className="title-container">
     <label>Enter Title</label><input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title text..."
        className="custom-input"
      />
      <h1 className="title">{title}</h1>
    </div>
                        <label htmlFor="uploadImage">

                            <div className='uploadBox'>

                                Select Image:<input type="file" id="uploadImage" onChange={handleImage} />
                                {img ? <img src={URL.createObjectURL(img)} alt="Preview" width="100" height="100" /> : <IoMdCloudUpload />}
                            </div>
                        </label>
                        <label htmlFor="uploadPdf">
                            <div className='uploadBox'>
                                Select Project Pdf: <input type="file" id="uploadPdf" onChange={handlePdf} />
                                {pdf ? <span>PDF Selected: {pdf.name}</span> : <IoMdCloudUpload />} 
                            </div>
                        </label>
                        <label>Enter Description:</label><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter description here..." className="custom-textarea" />
 <div className='btn'>
                            <button type="submit" id="post">Upload Post</button>
                        </div>
                    </form>
                </div></>
            )}
               {selectedCategory === "arts" && (
                <>
        
              
                <div className='form-cont'>
                   <h1 style={{ textAlign: 'center', color: '#007bff', animation: 'fadeIn 1s ease-in-out' }}>Upload Your Art Works Here</h1>

                    <form onSubmit={handleSubmit1}>
                    
                        <label htmlFor="uploadImage">

                            <div className='uploadBox'>

                                Select Image:<input type="file" id="uploadImage" onChange={handleImage} />
                                {img ? <img src={URL.createObjectURL(img)} alt="Preview" width="100" height="100" /> : <IoMdCloudUpload />}
                            </div>
                        </label>
                            <button type="submit">Upload Post</button>
                    </form>
                </div></>
            )}
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <button onClick={() => setModalIsOpen(false)}>Close Pdf</button>
                <iframe src={`${pdfUrl}`} width="100%" height="600px" title="PDF Viewer"></iframe>
            </Modal>
            </div>
            </div>
        </>
    );
}

export default File;
