#import "@preview/modern-cv:0.9.0": *

#show: resume.with(
  author: (
    lastname: "Eduardo Figueroa-Santiago",
    firstname: "",
    email: "jfigueroa3945@gmail.com",
    phone: "(939) 308-1163",
    positions: (
      "Computer Science Student",
      "Bioinformatics Researcher", 
      "Data Science Enthusiast",
    ),
  ),
  keywords: ("Bioinformatics", "Computer Science", "Machine Learning", "Data Science"),
  description: "Eduardo Figueroa - Computer Science & Bioinformatics CV",
  profile-picture: none,
  date: datetime.today().display(),
  language: "en",
  colored-headers: true,
  show-footer: false,
  show-address-icon: false,
  paper-size: "us-letter",
)

// Custom styling wrapper specifically for the Publications Section
#let resume-publication(
  title: "",
  authors: "",
  journal: "",
  date: "",
  doi: ""
) = {
  block(width: 100%, breakable: false)[
    #grid(
      columns: (1fr, auto),
      gutter: 1em,
      // Title and Date
      text(weight: "bold")[#title],
      text(weight: "medium", fill: rgb("#555555"))[#date]
    )
    #v(0.1em)
    
    // Authors
    #text(size: 9.5pt)[#authors]
    #v(0.1em)
    
    // Journal & Metadata info
    #grid(
      columns: (1fr, auto),
      text(size: 9.5pt, fill: rgb("#2c3e50"))[#journal],
      if doi != "" {
        text(size: 9pt, fill: rgb("#1a5276"))[DOI: #doi]
      }
    )
    #v(0.8em) // Spacing before the next resume entry
  ]
}

= Professional Summary

Undergraduate Computer Science student actively seeking research experiences or graduate schools in Bioinformatics.\
\

= Education

#resume-entry(
  title: "University of Puerto Rico, Rio Piedras",
  location: "San Juan, Puerto Rico",
  date: "Expected December 2026",
  description: "Bachelor of Science in Computer Science, minor in Cybersecurity",
)

#resume-item[
  - *Relevant Courses:* Cybersecurity, Networking, Data Science, Bioinformatics, Operating Systems, Intro to Computational Statistics, API Development
]
\
= Experience

#resume-entry(
  title: "Bioinformatics Assistant",
  location: "San Juan, Puerto Rico",
  date: "January 2026 - Present",
  description: "Genos, LLC",
)
#resume-item[
  - Pipelines for a stable connection to multiple Servers-simultaniuosly.
  - Fullstack programmer Web application
  - Configuring Vpn and Lan configuration 
  - Bioinoformatic data  analyisis 
  - Liason client-company 
]
#resume-entry(
  title: "Research Assistant - COVID-19 Diabetes Study",
  location: "San Juan, Puerto Rico", 
  date: "May 2025 - July 2025",
  description: "Abartys (Work Internship)",
)

#resume-item[
  - Organized data and created patient cohorts for COVID-19 diabetes research
  - Implemented machine learning models for data analysis
  - Conducted feature importance analysis using local datasets
  - *Mentors:* Dr. Roche-Lima, Dr. Velev
]

#resume-entry(
  title: "FAIR Metrics Development Researcher",
  location: "Pittsburgh, Pennsylvania",
  date: "January 2025 - November 2025",
  description: "Carnegie Mellon University",
)

#resume-item[
  - Developed, assessed and visualized FAIR metrics for datasets in HuBMAP
  - Created custom metrics for each HuBMAP dataset
  - Managed data evolution and new schemas
  - Designed interface to select views of FAIRness data
  - *Mentor:* I. Cao-Berg
]

#resume-entry(
  title: "Internal Tools Developer",
  location: "San Juan, Puerto Rico",
  date: "November 2025 - December 2025", 
  description: "UPR Medical Science",
)

#resume-item[
  - Evaluated and modified internal tools for data processing
  - Designed user-friendly interfaces for data management
  - *Mentors:* Brenda Nieves, Dr. Roche-Lima
]

#resume-entry(
  title: "HuBMAP Dashboard Developer",
  location: "Pittsburgh, Pennsylvania",
  date: "May 2024 - August 2024",
  description: "Carnegie Mellon University",
)

#resume-item[
  - Designed metrics for HuBMAP dashboard
  - Created different views for stakeholders (data curators, public view, PI)
  - Implemented automatic FAIRness general metrics using Python and Grafana
  - Used Bridges 2 for processing computational analysis
  - *Mentor:* I. Cao-Berg
]
\
\
\
\
#resume-entry(
  title: "HPV and Cervical Cancer Research Assistant",
  location: "San Juan, Puerto Rico",
  date: "May 2025 - August 2025",
  description: "UPR Medical Science / UAGMA Gurabo",
)

#resume-item[
  - Studied HPV relation to cervical cancer using machine learning approaches
  - Organized data and created patient cohorts
  - Conducted feature importance analysis
  - *Mentors:* Dr. Roche-Lima, Dr. Tosado
]

#resume-entry(
  title: "COVID-19 Diabetes Research Assistant",
  location: "San Juan, Puerto Rico",
  date: "January 2025 - May 2025",
  description: "UPR Medical Science / UPR Rio Piedras",
)

#resume-item[
  - Evaluated COVID patients with diabetes using ML models
  - Organized data and created cohorts
  - Analyzed feature importance
  - *Mentors:* Dr. Roche-Lima, Dra. Lluberes
]

#resume-entry(
  title: "Brain Image Library Dashboard Developer",
  location: "Pittsburgh, Pennsylvania",
  date: "June 2023 - August 2023",
  description: "Carnegie Mellon University",
)

#resume-item[
  - Designed dashboard requirements and metrics
  - Used Bridges 2 for metadata evaluation and separation
  - Implemented metrics in the dashboard system
  - *Mentor:* I. Cao-Berg
]

#resume-entry(
  title: "Bee Monitoring Interface Developer",
  location: "San Juan, Puerto Rico",
  date: "August 2023 - May 2024",
  description: "UPR Rio Piedras",
)

#resume-item[
  - Added new features to platform for live bee monitoring
  - Worked with Python, JavaScript, and MongoDB
  - Learned API development techniques
  - *Mentor:* Dr. Megret
]

#resume-entry(
  title: "Kidney Disease Reference Intervals Researcher",
  location: "San Juan, Puerto Rico",
  date: "April 2023 - June 2023",
  description: "UPR Medical Science",
)

#resume-item[
  - Developed unsupervised ML method for chronic kidney disease reference intervals
  - *Published:* Velev, J., LeBien, J. & Roche-Lima, A. Sci Rep 13, 17198 (2023)
  - *Mentor:* Dr. Roche-Lima
]

#resume-entry(
  title: "Ethnic Disparities Research Assistant",
  location: "San Juan, Puerto Rico",
  date: "September 2022 - May 2023",
  description: "UPR Medical Science / UPR Rio Piedras",
)

#resume-item[
  - Researched ethnic disparities in urinary and serum biomarkers
  - Applied ML methods for lab test reference intervals by race and ethnicity
  - Worked with Python and All of Us dataset
  - *Mentors:* Dr. Roche-Lima, Dr. H. Ortiz
]
\
= Skills

#resume-skill-item(
  "Programming Languages",
  (
    strong("Python (intermediate)"),
    strong("C++ (intermediate)"),
    strong("SQL (Basic)"),
    strong("Bash (intermediate)"),
    "JavaScript (basic)",
    "C# (basic)",
    "Visual Basic (basic)"
  ),
)

#resume-skill-item(
  "Databases & Tools",
  (
    "MongoDB",
    "Grafana",
    "All of Us (worbench v1 and v2)",
    "Bridges 2",
    "HuBMAP",
    "Git",
  ),
)

#resume-skill-item(
  "Spoken Languages", 
  (
    strong("Spanish (native)"), 
    strong("English (native)")
  )
)

#block(below: 0.65em)
\
#pagebreak()
= Teaching & Learning

#resume-entry(
  title: "AI/ML Course Assistant",
  location: "San Juan, Puerto Rico",
  date: "February 2023 - May 2023",
  description: "UPR Medical Science",
)

#resume-item[
  - Assisted with "Artificial Intelligence and Machine Learning applied to Health Disparities Research (Version 2)"
  - Expanded course to professionals outside UPR system
  - Supervised student projects and answered technical questions
  - Applied student feedback to improve course materials
  - *Mentor:* Dr. Roche-Lima
]

#resume-entry(
  title: "AI/ML Course Developer",
  location: "San Juan, Puerto Rico",
  date: "April 2022 - July 2022",
  description: "UPR Medical Science",
)

#resume-item[
  - Developed pilot course "AIML + HDR" for graduate students and professionals
  - Created PowerPoints, example exercises, and instructional videos
  - Graded assignments and provided student support
  - *Published:* Heredia-Negron, Frances, et al. Int. J. Environ. Res. Public Health 20.3 (2023): 2726
  - *Mentor:* Dr. Roche-Lima
]

#resume-entry(
  title: "STEM Instructor",
  location: "Caguas, Puerto Rico",
  date: "June - July 2019",
  description: "C3tech",
)

#resume-item[
  - Taught STEM concepts to elementary students
  - Focused on programming with Scratch and computational logic
]
\
= Awards and Fellowships

#resume-entry(
  title: "HuBMAP Underrepresented Student Internship Extension",
  location: "Remote from Puerto Rico(offince in Pittsburgh)",
  date: "November 2024 - Agosto 2025",
  description: "Pittsburgh Supercomputing Center",
)

#resume-item[
  - Continuation of HuBMAP research project
  - Conceptualing a way to display the FAIR Assesmennt of the databases and by project 
  - *Mentors:* Ivan Cao-Berg, Dr. H. Ortiz
]

#resume-entry(
  title: "REU - SSP HuBMAP Project",
  location: "Pittsburgh, Pennsylvania", 
  date: "May 2024 - August 2024",
  description: "Carnegie Mellon University"
)
#resume-item[
  - Create a tool to represent metadata easily for doing critical decisions and analysis of the data available. 
]
#resume-entry(
  title: "REU - SSP Brain Image Library",
  location: "Pittsburgh, Pennsylvania",
  date: "June 2023 - August 2023", 
  description: "Carnegie Mellon University"
)

#resume-item[
- Automating Reports 
- Cleaner interface to search and classify the metadata
- Custom report for different Stakeholders
]
#resume-entry(
  title: "PRIME Fellowship",
  location: "Online",
  date: "September 2022 - May 2023",
  description: "Ethnic Disparities Research",
)

#resume-item[
  - Machine learning methods for reference intervals by race and ethnicity
  - *Mentors:* Dr. Roche-Lima, Dr. H. Ortiz
]
\
= Conference Presentations

#resume-item[
- *SACNAS Chapter UPR-RP* (March 2026, San Juan, PR) - HuBMAP Visualization Tool for FAIR Metrics _(Presented)_
- *ABRCMS* (November 2024, Pittsburgh, PA) - HuBMAP Dashboard Development _(Accepted)_
- *SACNAS* (October 2024, Arizona) - HuBMAP Dashboard Development _(Presented)_
- *Gateway Conference* (October 2024, Montana) - HuBMAP Dashboard Development _(Accepted)_
- *SAIL Conference* (May 2024, Rio Grande, PR) - Health Disparities Reference Intervals _(Presented)_
- *SIDIM* (March 2024, Humacao, PR) - Bee Monitoring Web Application _(Presented)_
- *Mini-Symposium AI Applied to Health Disparities* (January 2024, San Juan, PR) - Health Disparities Research _(Presented)_
- *SACNAS* (October 2023, Oregon) - Brain Image Library Dashboard _(Presented)_
- *AIM-AHEAD Conference* (August 2023, Bethesda, WA) - Ethnic Disparities in Biomarkers _(Presented)_
- *CIO & IT Leader Conference* (September 2022, San Juan, PR) - Student programmer presentation _(Presented)_
]

#pagebreak()
= Certifications

#resume-entry(
  title: "VADSTI Data Science Training",
  location: "AIM-AHEAD",
  date: "February 2023",
  description: "Data Science & AI/ML Certification",
)


= Papers

#resume-publication(
  title: "Leveraging Machine Learning to Assess Post-COVID-19 Glycemic Control in Diabetic Patients",
  authors: "Marie Lluberes-Contreras, Eduardo Figueroa-Santiago,
  Hamid-Reza Kohan-Ghadr, Angel Ortiz-Ortega, Abiel Roche-Lima",
  journal: "International Journal of Environmental Research and Public Health, 23(5), 644",
  date: "Mayo 2026",
  doi: "10.3390/ijerph23050644"
)
