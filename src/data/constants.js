import {FaAppStore, FaGithub, FaGlobe, FaGooglePlay} from "react-icons/fa";

export const Bio = {
  name: "Jakub Olszewski",
  roles: [
    "Mobile Developer",
    "Android Developer",
    "iOS Developer",
    "Backend Developer"
  ],
  description:
    "I am a motivated and versatile individual, always eager to take on new challenges. With a passion for learning I am dedicated to delivering high-quality results. With a positive attitude and a growth mindset, I am ready to make a meaningful contribution and achieve great things.",
  github: "https://github.com/Olszewski-Jakub",
  resume:
    "https://drive.google.com/file/d/1Mc8z4KKP4jYNVINUufJUJesAkpjKWGee/view?usp=sharing",
  linkedin: "https://www.linkedin.com/in/j-olszewski/",
};

export const skills = [
  {
    title: "Frontend",
    skills: [
      {
        name: "React Js",
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
      },
      {
        name: "HTML",
        image: "https://www.w3.org/html/logo/badge/html5-badge-h-solo.png",
      },
      {
        name: "CSS",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png",
      },
      {
        name: "JavaScript",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
      },
      {
        name: "Material UI",
        image:
          "data:image/png;base64,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",
      },
    ],
  },
  {
    title: "Backend",
    skills: [
      {
        name: "Node Js",
        image: "https://nodejs.org/static/images/logo.svg",
      },
      {
        name: "Python",
        image:
          "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
      },
      {
        name: "MySQL",
        image:
          "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg",
      },
      {
        name: "Firebase",
        image: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
      },
      {
        name: "Java",
        image: "https://www.vectorlogo.zone/logos/java/java-vertical.svg",
      },
      {
        name: "Spring Boot",
        image: "https://www.vectorlogo.zone/logos/springio/springio-icon.svg",
      },
    ],
  },
  {
    title: "Android",
    skills: [
      {
        name: "Java",
        image:
          "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
      },
      {
        name: "Kotlin",
        image:
          "https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg",
      },
      {
        name: "XML",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBMw6_RdwKQ9bDFfnKDX1iwMl4bVJEvd9PP53XuIw&s",
      },
      {
        name: "Android Studio",
        image:
          "https://developer.android.com/static/studio/images/new-studio-logo-1_1920.png",
      },
      {
        name: "Hilt",
        image:
          "https://developer.android.com/static/images/brand/Android_Robot.svg",
      },
      {
        name: "Retrofit",
        image: "https://avatars.githubusercontent.com/u/82592?s=48&v=4",
      },
      {
        name: "Android Room",
        image:
          "https://developer.android.com/static/images/brand/Android_Robot.svg",
      },
      {
        name: "Firebase",
        image: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
      },
      {
        name: "Azure AAD",
        image:
          "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg",
      },
    ],
  },
  {
    title: "Others",
    skills: [
      {
        name: "Git",
        image:
          "https://camo.githubusercontent.com/fbfcb9e3dc648adc93bef37c718db16c52f617ad055a26de6dc3c21865c3321d/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f6769742d73636d2f6769742d73636d2d69636f6e2e737667",
      },
      {
        name: "GitHub",
        image:
          "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      },
      {
        name: "GitLab",
        image: "https://www.vectorlogo.zone/logos/gitlab/gitlab-icon.svg",
      },
      {
        name: "Jira",
        image:
          "https://raw.githubus ercontent.com/devicons/devicon/master/icons/jira/jira-original.svg",
      },
      {
        name: "C",
        image:
          "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg",
      },
      {
        name: "C++",
        image:
          "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
      },
      {
        name: "Docker",
        image:
          "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg",
      },
      {
        name: "VS Code",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png?20210804221519",
      },
      {
        name: "Postman",
        image:
          "https://camo.githubusercontent.com/93b32389bf746009ca2370de7fe06c3b5146f4c99d99df65994f9ced0ba41685/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f676574706f73746d616e2f676574706f73746d616e2d69636f6e2e737667",
      },
      {
        name: "Figma",
        image:
          "https://camo.githubusercontent.com/ed93c2b000a76ceaad1503e7eb9356591b885227e82a36a005b9d3498b303ba5/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f6669676d612f6669676d612d69636f6e2e737667",
      },
    ],
  },
];

export const experiences = [
  {
    id: 0,
    img: "https://images.seeklogo.com/logo-png/35/1/tractive-logo-png_seeklogo-354786.png",
    role: "Android Developer",
    company: "Tractive",
    companyUrl: "https://tractive.com",
    date: "May 2025 - September 2025",
    location: "On-site, Linz, Austria",
    desc: "",
    skills: [
      "Kotlin"
    ],
    pdf: "", 
    additionalImage: "",
    additionalResources: [
      {
        title: "Google Play Store",
        url: "https://play.google.com/store/apps/details?id=com.tractive.android.gps",
        icon: <FaGooglePlay size={14} />
      }
    ]
  },
  {
    id: 1,
    img: "https://i.imgur.com/c6wNgb0.png",
    role: "Lead Mobile Developer",
    company: "Magnate",
    companyUrl: "https://magnate-software.com",
    date: "August 2024 - February 2025",
    location: "On-site, New York",
    desc: '•	Architected and launched scalable modules, improving system stability by 40% and reducing downtime.\n\•	Applied MVVM with Clean Architecture principles to develop a cross-platform mobile app using Kotlin and Swift, ensuring a clean codebase that enhanced maintainability and improved user experience.\n•	Oversaw a high-performing team, streamlining communication protocols and increasing overall productivity by 25%.\n•	Architected and implemented robust features for Android and iOS platforms using Kotlin Multiplatform, optimizing resource allocation to enhance performance by 30%.\n•	Coordinated streamlined deployment pipelines, successfully managing app releases on both the App Store and Google Play, achieving a 98% success rate in on-time releases.',
    skills: [
      "Kotlin",
      "Swift",
      "Kotlin Multiplatform",
      "Ktor",
      "Koin",
      "MVVM",
      "Docker",
      "CI/CD pipelines",
      "Github Actions",
    ],
    pdf: "", 
    additionalImage: "",
    additionalResources: [
      {
        title: "Google Play Store",
        url: "https://play.google.com/store/apps/details?id=com.magnatesoftware.magnate.release&pli=1",
        icon: <FaGooglePlay size={14} />
      },
      {
        title: "App Store",
        url: "https://apps.apple.com/ie/app/magnate-software/id6670550097",
        icon: <FaAppStore size={14} />
      }
    ]
  },
  {
    id: 2,
    img: "https://i.imgur.com/AbC9492.png",
    role: "Mobile Developer",
    company: "DOZ S.A",
    companyUrl: "https://dozsa.pl",
    date: "May 2024 - August 2024",
    location: "On-site, Warsaw, Poland",
    desc: "",
    skills: [
      "Kotlin",
      "Kotlin Multiplatform",
      "Azure AAD",
      "Koin",
      "MVVM",
      "Docker",
      "CI/CD pipelines",
    ],
    pdf: "", 
    additionalImage: "",
  },
  {
    id: 3,
    img: "https://i.imgur.com/83DsYER.png",
    role: "Programming Coach for children and teenagers",
    company: "Coding Giants",
    companyUrl: "https://codinggiants.com",
    date: "December 2023 - Present",
    location: "Remote, Poland",
    desc: "As a Programming Coach at Coding Giants, I have the privilege of inspiring and educating young minds in the fields of programming, graphic design, and new technologies. In this role, I am responsible for delivering engaging curriculum tailored to the diverse interests and learning styles of children and teenagers aged 7-19.\n\nKey Responsibilities:\n\n- Develop and lead interactive classes, workshops, and projects to introduce students to the fundamentals of programming, graphic design, and emerging technologies.\n\n- Collaborate with colleagues to enhance and refine training materials, lesson plans, and presentations, ensuring they remain current and relevant in an ever-evolving technological landscape.\n\n- Foster a supportive and inclusive learning environment where students feel empowered to explore, create, and innovate.\n\n- Adapt teaching methods and strategies to accommodate both in-person and online learning environments, leveraging digital tools and resources to enhance engagement and accessibility.",
    skills: [
      "c#",
      "C++",
      "Python",
      "Scratch",
      "MIT App Creator",
      "Minecraft Education Edition",
      "Web Development",
      "Communication Skills",
      "Differentiated Instruction",
      "Teamwork",
      "Teaching",
    ],
    pdf: "", 
    additionalImage: "",
  },
  {
    id: 4,
    img: "https://i.imgur.com/AbC9492.png",
    role: "Android Developer",
    company: "DOZ S.A",
    companyUrl: "https://dozsa.pl",
    date: "June 2023 - September 2023",
    location: "Warsaw, Poland",
    desc: "As a Android Developer at DOZ S.A., I spearheaded the conception, development, and execution of independent project aimed at revolutionizing operations within the pharmaceutical sector.\n\nKey Responsibilities:\n\n- Led the conception, development, and execution of an independent project aimed at revolutionizing operations within the pharmaceutical sector.\n\n- Worked closely with pharmacists to identify key pain points and introduced advanced functionalities that markedly improved efficiency and precision in day-to-day activities.\n\n- Meticulously documented each initiative, providing comprehensive user manuals, system diagrams, and flowcharts to facilitate seamless knowledge transfer and support ongoing maintenance efforts.\n\n- Leveraged automation to streamline development workflows, significantly reducing manual labor while optimizing processes for enhanced performance.\n\nAchievements:\n- Successfully revolutionized pharmaceutical operations through the introduction of advanced functionalities, resulting in tangible improvements in efficiency and precision.\n\n- Implemented automation solutions that streamlined development workflows, resulting in significant reductions in manual labor and enhanced overall performance.",
    skills: [
      "Kotlin",
      "Azure AAD",
      "Hilt",
      "Retrofit2",
      "Android Room",
      "MVVM",
      "Basic Chemistry",
      "Docker",
      "CI/CD pipelines",
    ],
    pdf: "", 
    additionalImage: "",
  },
];

export const education = [
  {
    id: 0,
    img: "https://universityofgalway.ie/cdn/images/email/university_of_galway_logo__positive_landscape1.jpg",
    school: "University Of Galway, Galway, Ireland",
    date: "September 2023 - May 2027",
    desc: "I am currently pursuing a Bachelor's degree in Computer Science and Information Technology at University of Galway, Ireland. My coursework includes Data Structures, Algorithms, Database Management, Web Development, and Software Engineering practices. I've participated in various hackathons and coding competitions organized by the university.",
    degree: "Bachelor of Science - BSc, Computer Science and Information Technology",
    website: "https://universityofgalway.ie/",
    grade: "Current grade: 1.1 (First Class Honours)"
  },
  {
    id: 1,
    img: "http://www.lo1.gliwice.pl/wp-content/uploads/2015/04/logo_zso10.png",
    school: "I Liceum Ogólnokształcące Dwujęzyczne im. E. Dembowskiego, Gliwice, Poland",
    date: "September 2019 - May 2023",
    grade: "Average percentile: 75%",
    desc: "I completed my high school education at I Liceum Ogólnokształcące Dwujęzyczne im. E. Dembowskiego, Gliwice, where I studied Maths and Physics. During my time there, I participated in the school's programming club and mathematics olympiad, developing a strong foundation in analytical thinking and problem-solving.",
    degree: "High School Leaving Certificate, Mathematics and Physics",
    website: "http://www.lo1.gliwice.pl/"
  }
];

export const projects = [
  {
    id: 0,
    title: "3D Gravity Simulator",
    date: "March 2025 - now",
    description:
        "A modern, interactive 3D simulation of Newtonian gravitational physics. Users can create, edit, and observe celestial bodies in space with real-time orbit visualization and accurate physics calculations. Built with React, Three.js, and Tailwind CSS, this web application offers an intuitive interface for exploring gravitational interactions between planets, stars, and black holes.",
    image: "https://images.pexels.com/photos/5439/earth-space.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: [
      "React JS",
      "Three.js",
      "React Three Fiber",
      "JavaScript",
      "Tailwind CSS",
      "Physics Engine",
      "Next.js"
    ],
    category: ["web app", "simulation"],
    github: "https://github.com/Olszewski-Jakub/3d-gravity-simulation",
    webapp: "https://gravity-simulator.jakubolszewski.dev/",
    status: "Work in progress",
  },
  {
    id: 1,
    title: "RMS",
    date: "September 2024 - now",
    description:
        "A comprehensive solution that transforms how restaurants operate. Our system bridges the gap between customers and restaurant management with powerful, intuitive interfaces.",
    image: "https://avatars.githubusercontent.com/u/182916697?s=200&v=4",
    tags: [
      "Javascript",
      "React JS",
      "HTML",
      "CSS",
      "Styled Components",
      "Firebase",
      "RMS API",
    ],
    category: ["web app", "RMS"],
    github: "https://github.com/Unemployed-CS-Majors/RMS",
    webapp: "https://restaurant-management-sy-1a0cd.web.app/#Home",
    status: "Work in progress",
  },
  {
    id: 2,
    title: "RMS API",
    date: "September 2024 - now",
    description:
        "A comprehensive solution that transforms how restaurants operate. Our system bridges the gap between customers and restaurant management with powerful, intuitive interfaces.",
    image:
        "https://avatars.githubusercontent.com/u/182916697?s=200&v=4",
    tags: [
      "JavaScript",
      "Node JS",
      "Express",
      "Docker",
      "CI/CD pipelines",
      "Swagger"
    ],
    category: ["api", "RMS"],
    github: "https://github.com/Unemployed-CS-Majors/RMS-API",
    webapp: "https://bump.sh/olszewski/doc/rms-api/",
    status: "Work in progress",
  },
  {
    id: 3,
    title: "The Bouncer",
    date: "January 2025 - now",
    description: "The Bouncer is an authentication API based on JWT that allows users to create accounts using email and password or third-party authentication providers such as Google. The API also supports role-based access control (RBAC) with router-based privileges, including wildcard privileges for flexible access management. Additionally, it incorporates a custom authentication plugin for the Kong API Gateway, enhancing security and access control.",
    image: "https://avatars.githubusercontent.com/u/199120511?s=200&v=4",
    tags: ["Kotlin", "Ktor Server", "Koin", "JWT","Docker", "Docker Compose", "PostgreSQL"],
    category: ["api", "Bus Hive"],
    github: "https://github.com/Bus-Hive/The-Bouncer",
    webapp: "https://bump.sh/olszewski/doc/the-bouncer/",
    status: "Work in progress",
  },
  {
    id: 4,
    title: "The Keg",
    date: "January 2025 - now",
    description: "The KEG is a GTFS-based API designed for efficient fetching and management of GTFS data for a real-time public transport tracking app. It uses a PostgreSQL database for data storage and integrates OpenTripPlanner to help users find optimal trips. Authentication is handled by The Bouncer API, meaning Keg relies on it and does not require project-specific authentication implementations.",
    image: "https://avatars.githubusercontent.com/u/199120511?s=200&v=4",
    tags: ["Kotlin", "Ktor Server", "Koin", "GTFS", "OpenTripPlanner", "Docker", "Docker Compose", "PostgreSQL"],
    category: ["api", "Bus Hive"],
    github: "https://github.com/Bus-Hive/The-Bouncer",
    webapp: "https://bump.sh/olszewski/doc/the-keg/",
    status: "Work in progress",
  },
  {
    id: 5,
    title: "Portfolio",
    date: "September 2023 - now",
    description:
        "Current portfolio website. It was created using React Js and styled components. It is fully responsive and it is using dark mode.",
    image:
        "https://images.pexels.com/photos/14936128/pexels-photo-14936128.jpeg?cs=srgb&dl=pexels-ann-h-14936128.jpg&fm=jpg",
    tags: ["Javascript", "React JS", "HTML", "CSS", "Styled Components"],
    category: ["web app"],
    github: "https://github.com/Olszewski-Jakub/portfolio",
    webapp: "#about",
    status: "Deployed",
  },
  {
    id: 6,
    title: "Kalkulator w Recepturze",
    date: "September 2019 - September 2022",
    description:
        "Kalkulator w Recepturze was a simple app made for pharmacists to help them be more accurate when prepring medicines in pharmacies. It includes many diffrent formulas for dufrent subsatnces ",
    image:
        "https://play-lh.googleusercontent.com/rcZCp0l8tEvbzmhwrGVB1XUbRhMYG22Ftci974FyG0ZqnAlkNB0Tjbuxv62oWvV7jIkQ=w240-h480-rw",
    tags: ["Java", "Firebase", "XML"],
    category: ["android app"],
    github: "https://github.com/Olszewski-Jakub/kalkulatorRecepturowy",
    webapp:
        "https://play.google.com/store/apps/details?id=com.jakubolszewski.kalkulatorrecepturowy",
    status: "Sold in 2023",
  },
  {
    id: 7,
    title: "1LO Glwice",
    date: "September 2019 - November 2021",
    description:
        "1LO Glwice was an application created for my high school. It was created to help students and teachers with their daily school life. It was created using java and Firebase. It was my first android application. It's main purpose was to make students life easier.",
    image:
        "https://play-lh.googleusercontent.com/ibqxWu9DTjwaXvpMse_wRPpGA7VJLyYz9MpZ3eUlUE6k1ehpC-YHeH0-CPLArkV81OQ=w240-h480-rw",
    tags: ["Java", "Firebase", "XML"],
    category: ["android app"],
    github: "https://github.com/Olszewski-Jakub/1LO-Glwice-v2",
    webapp:
        "https://play.google.com/store/apps/details?id=com.jakubolszewski.lo1gliwice",
    status: "End of support",
  },
];

// Add this to your constants.js file

// Add this to your constants.js file

export const certificates = [
  {
    title: "Certificate in Advanced English (CAE)",
    category: "language",
    date: "September 2022",
    issuer: "Cambridge English",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    skills: ["English Language", "Advanced Communication", "C1 Level"],
    score: "Score: 195"
  },
  {
    title: "IELTS Academic",
    category: "language",
    date: "September 2022",
    issuer: "IELTS Official",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    skills: ["English Proficiency", "Academic English", "International Communication"],
    score: "Score: 7.0"
  },
  {
    title: "Java (Basic)",
    category: "programming",
    date: "October 2022",
    issuer: "HackerRank",
    image: "https://images.unsplash.com/photo-1588239034647-25783cbfcfc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    url: "https://www.hackerrank.com/certificates/6cdba8fac6d0", // Replace with your actual certificate link
    skills: ["Java", "Object-Oriented Programming", "Problem Solving"]
  },
  {
    title: "Introduction to R",
    category: "datascience",
    date: "September 2024",
    issuer: "DataCamp",
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2047&q=80",
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/course/e1a3bfdfa2d4cf5eefe980273ae5f28a7b011bba", // Replace with your actual certificate link
    skills: ["R Programming", "Data Analysis", "Statistical Computing"]
  },
  {
    title: "Kotlin Essential Training: Object-Oriented and Async Code",
    category: "programming",
    date: "October 2023",
    issuer: "LinkedIn Learning",
    image: "https://images.unsplash.com/photo-1588239034647-25783cbfcfc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    url: "https://www.linkedin.com/learning/certificates/9cfedc92cfd366a9efd004f234b4c96e54d86b38bb38bded77e0b9969dc0c05e?trk=share_certificate",
    skills: ["Kotlin", "Object-Oriented Programming", "Asynchronous Programming"]
  }
];