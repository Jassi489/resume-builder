import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [objective, setObjective] = useState("");
  const [college, setCollege] = useState("");
  const [degree, setDegree] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [experience, setExperience] = useState("");
  const [certifications, setCertifications] = useState("");
  const [achievements, setAchievements] = useState("");
  const [languages, setLanguages] = useState("");

  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const [photo, setPhoto] = useState("");

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const downloadPDF = async () => {
    const resume = document.getElementById("resume");

    if (!resume) return;

    const canvas = await html2canvas(resume, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pageHeight = 297;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(
      imageData,
      "PNG",
      0,
      position,
      pdfWidth,
      pdfHeight
    );

    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;

      pdf.addPage();

      pdf.addImage(
        imageData,
        "PNG",
        0,
        position,
        pdfWidth,
        pdfHeight
      );

      heightLeft -= pageHeight;
    }

    pdf.save("my-resume.pdf");
  };

  return (
    <div>
      <h1>Resume Builder</h1>

      <div className="container">

        {/* FORM SECTION */}
        <div className="form-section">

          <h2>Enter Your Details</h2>

          <label>Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
          />

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Phone</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label>Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <h2>Career Objective</h2>

          <textarea
            placeholder="Enter your career objective"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          />

          <h2>Education</h2>

          <label>Degree</label>
          <input
            type="text"
            placeholder="Enter your degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />

          <label>College</label>
          <input
            type="text"
            placeholder="Enter your college name"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          />

          <h2>Skills</h2>

          <textarea
            placeholder="Enter skills separated by comma"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <h2>Projects</h2>

          <textarea
            placeholder="Enter your project details"
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
          />

          <h2>Experience</h2>

          <textarea
            placeholder="Enter your experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <h2>Certifications</h2>

          <textarea
            placeholder="Enter your certifications"
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
          />

          <h2>Achievements</h2>

          <textarea
            placeholder="Enter your achievements"
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
          />

          <h2>Languages</h2>

          <textarea
            placeholder="Enter languages separated by comma"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
          />

          <h2>Professional Links</h2>

          <label>LinkedIn</label>
          <input
            type="text"
            placeholder="https://linkedin.com/in/yourname"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />

          <label>GitHub</label>
          <input
            type="text"
            placeholder="https://github.com/yourname"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />

          <label>Portfolio</label>
          <input
            type="text"
            placeholder="https://yourportfolio.com"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
          />

          <button onClick={downloadPDF}>
            Download Resume PDF
          </button>

        </div>

        {/* RESUME PREVIEW */}
        <div className="resume-section" id="resume">

          <div className="resume-header">

            {photo && (
              <img
                src={photo}
                alt="Profile"
                className="profile-photo"
              />
            )}

            <h1>{name || "Your Name"}</h1>

            <p>
              {email || "your@email.com"} |{" "}
              {phone || "Your Phone"}
            </p>

            <p>{address || "Your Address"}</p>

            {(linkedin || github || portfolio) && (
              <p>
                {linkedin && `LinkedIn: ${linkedin} `}
                {github && `| GitHub: ${github} `}
                {portfolio && `| Portfolio: ${portfolio}`}
              </p>
            )}

          </div>

          <div className="resume-content">

            <h3>Career Objective</h3>
            <p>
              {objective ||
                "Your career objective will appear here."}
            </p>

            <h3>Education</h3>

            <p>
              <b>{degree || "Your Degree"}</b>
            </p>

            <p>
              {college || "Your College Name"}
            </p>

            <h3>Skills</h3>

            <ul>
              {skills ? (
                skills.split(",").map((skill, index) => (
                  <li key={index}>{skill.trim()}</li>
                ))
              ) : (
                <li>Your skills will appear here.</li>
              )}
            </ul>

            <h3>Projects</h3>

            <p>
              {projects ||
                "Your project details will appear here."}
            </p>

            <h3>Experience</h3>

            <p>
              {experience ||
                "Your experience will appear here."}
            </p>

            <h3>Certifications</h3>

            <p>
              {certifications ||
                "Your certifications will appear here."}
            </p>

            <h3>Achievements</h3>

            <p>
              {achievements ||
                "Your achievements will appear here."}
            </p>

            <h3>Languages</h3>

            <ul>
              {languages ? (
                languages.split(",").map((language, index) => (
                  <li key={index}>{language.trim()}</li>
                ))
              ) : (
                <li>Your languages will appear here.</li>
              )}
            </ul>

          </div>

        </div>

      </div>
    </div>
  );
}

export default App;