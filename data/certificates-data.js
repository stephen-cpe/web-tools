// Certificate data extracted from certificate filenames
// Format: Certificate_Name_Issuer_DD_DD_YYYY.png
// Month is 0-indexed (October = 9)
const certificatesData = [
    {
        filename: "Network-Fundamentals_QUANTIC_08_16_2026.png",
        name: "Network Fundamentals",
        issuer: "QUANTIC",
        date: new Date(2026, 7, 16),
        dateFormatted: "August 16, 2026",
    },
    {
        filename: "Master-Of-Science-In-Software-Engineering_QUANTIC_08_13_2026.png",
        name: "Master of Science in Software Engineering",
        issuer: "QUANTIC",
        date: new Date(2026, 7, 13),
        dateFormatted: "August 13, 2026",
        parchmentUrl: "https://www.parchment.com/lp/award/7aa39fe2-81ef-4a89-807f-51ec8733003f?unclaimedAward=580160e4-97e5-11f1-ba3c-17a9cda8a824",
        isDegree: true
    },
    {
        filename: "Decentralized-Finance_QUANTIC_08_10_2026.png",
        name: "Decentralized Finance",
        issuer: "QUANTIC",
        date: new Date(2026, 7, 10),
        dateFormatted: "August 10, 2026",
    },
    {
        filename: "Blockchains-In-Practice_QUANTIC_08_07_2026.png",
        name: "Blockchains In Practice",
        issuer: "QUANTIC",
        date: new Date(2026, 7, 7),
        dateFormatted: "August 7, 2026",
    },
    {
        filename: "Decentralized-Applications_QUANTIC_08_05_2026.png",
        name: "Decentralized Applications",
        issuer: "QUANTIC",
        date: new Date(2026, 7, 5),
        dateFormatted: "August 5, 2026",
    },
    {
        filename: "Introduction-To-Blockchain_QUANTIC_08_03_2026.png",
        name: "Introduction to Blockchain",
        issuer: "QUANTIC",
        date: new Date(2026, 7, 3),
        dateFormatted: "August 3, 2026",
    },
    {
        filename: "Talent-Management_QUANTIC_07_23_2026.png",
        name: "Talent Management",
        issuer: "QUANTIC",
        date: new Date(2026, 6, 23),
        dateFormatted: "July 23, 2026",
    },
    {
        filename: "Business-Ethics-And-Social-Responsibility_QUANTIC_07_22_2026.png",
        name: "Business Ethics and Social Responsibility",
        issuer: "QUANTIC",
        date: new Date(2026, 6, 22),
        dateFormatted: "July 22, 2026",
    },
    {
        filename: "Modern-Theories-Of-Leadership_QUANTIC_07_19_2026.png",
        name: "Modern Theories of Leadership",
        issuer: "QUANTIC",
        date: new Date(2026, 6, 19),
        dateFormatted: "July 19, 2026",
    },
    {
        filename: "Developing-A-Corporate-Philosophy_QUANTIC_07_16_2026.png",
        name: "Developing a Corporate Philosophy",
        issuer: "QUANTIC",
        date: new Date(2026, 6, 16),
        dateFormatted: "July 16, 2026",
    },
    {
        filename: "Corporate-Governance_QUANTIC_07_15_2026.png",
        name: "Corporate Governance",
        issuer: "QUANTIC",
        date: new Date(2026, 6, 15),
        dateFormatted: "July 15, 2026",
    },
    {
        filename: "Organizational-Structure-And-Culture_QUANTIC_07_10_2026.png",
        name: "Organizational Structure and Culture",
        issuer: "QUANTIC",
        date: new Date(2026, 6, 10),
        dateFormatted: "July 10, 2026",
    },
    {
        filename: "The-Art-Of-Presentation_QUANTIC_07_06_2026.png",
        name: "The Art of Presentation",
        issuer: "QUANTIC",
        date: new Date(2026, 6, 6),
        dateFormatted: "July 6, 2026",
    },
    {
        filename: "Effective-Business-Writing_QUANTIC_07_04_2026.png",
        name: "Effective Business Writing",
        issuer: "QUANTIC",
        date: new Date(2026, 6, 4),
        dateFormatted: "July 4, 2026",
    },
    {
        filename: "Storytelling-With-Data_QUANTIC_07_01_2026.png",
        name: "Storytelling With Data",
        issuer: "QUANTIC",
        date: new Date(2026, 6, 1),
        dateFormatted: "July 1, 2026",
    },
    {
        filename: "Data-Visualization_QUANTIC_06_30_2026.png",
        name: "Data Visualization",
        issuer: "QUANTIC",
        date: new Date(2026, 5, 30),
        dateFormatted: "June 30, 2026",
    },
    {
        filename: "AI-And-Augmented-Productivity-QUANTIC_06_04_2026.png",
        name: "AI And Augmented Productivity",
        issuer: "QUANTIC",
        date: new Date(2026, 5, 4),
        dateFormatted: "June 4, 2026",
    },
    {
        filename: "AI-Leadership-And-Management-QUANTIC_06_02_2026.png",
        name: "AI Leadership And Management",
        issuer: "QUANTIC",
        date: new Date(2026, 5, 2),
        dateFormatted: "June 2, 2026",
    },
    {
        filename: "AI-And-Business-Transformation-QUANTIC_05_28_2026.png",
        name: "AI and Business Transformation",
        issuer: "QUANTIC",
        date: new Date(2026, 4, 28),
        dateFormatted: "May 28, 2026",
    },
    {
        filename: "Microservices-3-Scaling-And-Kubernetes_QUANTIC_04_30_2026.png",
        name: "Microservices 3: Scaling and Kubernetes",
        issuer: "QUANTIC",
        date: new Date(2026, 3, 30),
        dateFormatted: "April 30, 2026",
    },
    {
        filename: "Microservices-2-Deploying-And-Testing_QUANTIC_04_18_2026.png",
        name: "Microservices 2: Deploying and Testing",
        issuer: "QUANTIC",
        date: new Date(2026, 3, 18),
        dateFormatted: "April 18, 2026",
    },
    {
        filename: "Microservices-1-Designing-And-Building_QUANTIC_04_12_2026.png",
        name: "Microservices 1: Designing and Building",
        issuer: "QUANTIC",
        date: new Date(2026, 3, 12),
        dateFormatted: "April 12, 2026",
    },
    {
        filename: "Model-Fine-Tuning_QUANTIC_03_22_2026.png",
        name: "Model Fine-Tuning",
        issuer: "QUANTIC",
        date: new Date(2026, 2, 22),
        dateFormatted: "March 22, 2026",
    },
    {
        filename: "LLM-Based-Apps_QUANTIC_03_14_2026.png",
        name: "LLM-Based Apps",
        issuer: "QUANTIC",
        date: new Date(2026, 2, 14),
        dateFormatted: "March 14, 2026",
    },
    {
        filename: "Adopting-AI-In-Your-Organization_QUANTIC_03_07_2026.png",
        name: "Adopting AI in Your Organization",
        issuer: "QUANTIC",
        date: new Date(2026, 2, 7),
        dateFormatted: "March 7, 2026",
    },
    {
        filename: "Introduction-To-Deep-Learning_QUANTIC_02_03_2026.png",
        name: "Introduction To Deep Learning",
        issuer: "QUANTIC",
        date: new Date(2026, 1, 3), 
        dateFormatted: "February 3, 2026",
    },
    {
        filename: "Clustering-With-Unsupervised-Learning_QUANTIC_01_31_2026.png",
        name: "Clustering With Unsupervised Learning",
        issuer: "QUANTIC",
        date: new Date(2026, 0, 31), 
        dateFormatted: "January 31, 2026",
    },
    {
        filename: "Decision-Trees-And-Random-Forests_QUANTIC_01_27_2026.png",
        name: "Decision Trees And Random Forests",
        issuer: "QUANTIC",
        date: new Date(2026, 0, 27), 
        dateFormatted: "January 27, 2026",
    },
    {
        filename: "Logistic-Regression_QUANTIC_01_27_2026.png",
        name: "Logistic Regression",
        issuer: "QUANTIC",
        date: new Date(2026, 0, 27), 
        dateFormatted: "January 27, 2026",
    },
    {
        filename: "Linear-Algebra-For-Machine-Learning_QUANTIC_01_20_2026.png",
        name: "Linear Algebra For Machine Learning",
        issuer: "QUANTIC",
        date: new Date(2026, 0, 20), 
        dateFormatted: "January 20, 2026",
    },
    {
        filename: "Data-Preprocessing_QUANTIC_01_19_2026.png",
        name: "Data Preprocessing",
        issuer: "QUANTIC",
        date: new Date(2026, 0, 19), 
        dateFormatted: "January 19, 2026",
    },
    {
        filename: "AWS-Certified-AI-Practitioner_CODECADEMY_01_12_2026.png",
        name: "AIF-C01 AWS Certified AI Practitioner",
        issuer: "CODECADEMY",
        date: new Date(2026, 0, 12), 
        dateFormatted: "January 12, 2026",
    },
    {
        filename: "AWS-Certified-AI-Practitioner_AWS_01_12_2026.png",
        name: "AWS Certified AI Practitioner",
        issuer: "AWS",
        date: new Date(2026, 0, 12), 
        dateFormatted: "January 12, 2026",
        credlyUrl: "https://www.credly.com/badges/f5452386-703d-4eb1-b4c6-617b434406d8"
    },
    {
        filename: "AWS-Certified-Cloud-Practitioner_AWS_01_12_2026.png",
        name: "AWS Certified Cloud Practitioner",
        issuer: "AWS",
        date: new Date(2025, 11, 15), 
        dateFormatted: "December 15, 2025",
        credlyUrl: "https://www.credly.com/badges/ad4d2fd0-a693-4ea3-8a9d-0e2f6bea3114"
    },
    {
        filename: "AWS-Artificial-Intelligence-Practitioner-Learning-Plan_AWS_12_22_2025.png",
        name: "AWS Artificial Intelligence Practitioner Learning Plan",
        issuer: "AWS",
        date: new Date(2025, 11, 22),
        dateFormatted: "December 22, 2025",
        
    },
    {
        filename: "Essentials-Of-Prompt-Engineering_AWS_12_22_2025.png",
        name: "Essentials of Prompt Engineering",
        issuer: "AWS",
        date: new Date(2025, 11, 22),
        dateFormatted: "December 22, 2025",
        
    },
    {
        filename: "Security-Compliance-And-Governance-For-AI-Solutions_AWS_12_22_2025.png",
        name: "Security, Compliance, and Governance for AI Solutions",
        issuer: "AWS",
        date: new Date(2025, 11, 22),
        dateFormatted: "December 22, 2025",
        
    },
    {
        filename: "Optimizing-Foundation-Models_AWS_12_20_2025.png",
        name: "Optimizing Foundation Models",
        issuer: "AWS",
        date: new Date(2025, 11, 20),
        dateFormatted: "December 20, 2025",
        
    },
    {
        filename: "Developing-Machine-Learning-Solutions_AWS_12_20_2025.png",
        name: "Developing Machine Learning Solutions",
        issuer: "AWS",
        date: new Date(2025, 11, 20),
        dateFormatted: "December 20, 2025",
        
    },
    {
        filename: "Developing-Generative-Artificial-Intelligence-Solutions_AWS_12_20_2025.png",
        name: "Developing Generative Artificial Intelligence Solutions",
        issuer: "AWS",
        date: new Date(2025, 11, 20),
        dateFormatted: "December 20, 2025",
        
    },
    {
        filename: "Responsible-Artificial-Intelligence-Practices_AWS_12_19_2025.png",
        name: "Responsible Artificial Intelligence Practices",
        issuer: "AWS",
        date: new Date(2025, 11, 19),
        dateFormatted: "December 19, 2025",
        
    },
    {
        filename: "Exploring-Artificial-Intelligence-Use-Cases-And-Applications_AWS_12_18_2025.png",
        name: "Exploring Artificial Intelligence Use Cases and Applications",
        issuer: "AWS",
        date: new Date(2025, 11, 18),
        dateFormatted: "December 18, 2025",
        
    },
    {
        filename: "Fundamentals-Of-Machine-Learning-And-Artificial-Intelligence_AWS_12_18_2025.png",
        name: "Fundamentals of Machine Learning and Artificial Intelligence",
        issuer: "AWS",
        date: new Date(2025, 11, 18),
        dateFormatted: "December 18, 2025",
        
    },
    {
        filename: "AWS-Cloud-Practitioner-Essentials_AWS_12_09_2025.png",
        name: "AWS Cloud Practitioner Essentials",
        issuer: "AWS",
        date: new Date(2025, 11, 9),
        dateFormatted: "December 9, 2025",
        
    },
    {
        filename: "Serverless-Application-Development-II_QUANTIC_12_04_2025.png",
        name: "Serverless Application Development II",
        issuer: "QUANTIC",
        date: new Date(2025, 11, 4),
        dateFormatted: "December 4, 2025",
        
    },
    {
        filename: "Serverless-Application-Development-I_QUANTIC_12_02_2025.png",
        name: "Serverless Application Development I",
        issuer: "QUANTIC",
        date: new Date(2025, 11, 2),
        dateFormatted: "December 2, 2025",
        
    },
    {
        filename: "Migrating-An-Existing-Web-Application-II_QUANTIC_11_28_2025.png",
        name: "Migrating an Existing Web Application II",
        issuer: "QUANTIC",
        date: new Date(2025, 10, 28),
        dateFormatted: "November 28, 2025",
        
    },
    {
        filename: "Migrating-An-Existing-Web-Application-I_QUANTIC_11_26_2025.png",
        name: "Migrating an Existing Web Application I",
        issuer: "QUANTIC",
        date: new Date(2025, 10, 26),
        dateFormatted: "November 26, 2025",
        
    },
    {
        filename: "AWS-Academy-Cloud-Foundations_QUANTIC_11_25_2025.png",
        name: "AWS Academy Cloud Foundations",
        issuer: "QUANTIC",
        date: new Date(2025, 10, 25),
        dateFormatted: "November 25, 2025",
        
    },
    {
        filename: "Cloud-Foundations_AWS_ACADEMY_11_24_2025.png",
        name: "Cloud Foundations",
        issuer: "AWS ACADEMY",
        date: new Date(2025, 10, 24),
        dateFormatted: "November 24, 2025",
        
    },
    {
        filename: "AWS-Technical-Essentials_AWS_11_19_2025.png",
        name: "AWS Technical Essentials",
        issuer: "AWS",
        date: new Date(2025, 10, 19),
        dateFormatted: "November 19, 2025",
        
    },
    {
        filename: "Performance-Monitoring_QUANTIC_10_28_2025.png",
        name: "Performance Monitoring",
        issuer: "QUANTIC",
        date: new Date(2025, 9, 28),
        dateFormatted: "October 28, 2025",
        
    },
    {
        filename: "Learn-How-To-Use-AI-For-Coding_CODECADEMY_10_09_2025.png",
        name: "Learn How to Use AI for Coding",
        issuer: "CODECADEMY",
        date: new Date(2025, 9, 9),
        dateFormatted: "October 9, 2025",
        
    },
    {
        filename: "Learn-How-To-Use-ChatGPT_CODECADEMY_10_06_2025.png",
        name: "Learn How to Use ChatGPT",
        issuer: "CODECADEMY",
        date: new Date(2025, 9, 6),
        dateFormatted: "October 6, 2025",
        
    },
    {
        filename: "CICD-And-Software-Maintenance_QUANTIC_10_08_2025.png",
        name: "CI/CD And Software-Maintenance",
        issuer: "QUANTIC",
        date: new Date(2025, 9, 8),
        dateFormatted: "October 8, 2025",
        
    },
    {
        filename: "Generative-AI-For-Everyone_CODECADEMY_10_09_2025.png",
        name: "Generative AI for Everyone",
        issuer: "CODECADEMY",
        date: new Date(2025, 9, 9),
        dateFormatted: "October 9, 2025",
        
    },
    {
        filename: "Intro-To-Vibe-Coding_CODECADEMY_09_26_2025.png",
        name: "Intro to Vibe Coding",
        issuer: "CODECADEMY",
        date: new Date(2025, 8, 26),
        dateFormatted: "September 26, 2025",
        
    },
    {
        filename: "Software-Testing_QUANTIC_09_25_2025.png",
        name: "Software Testing",
        issuer: "QUANTIC",
        date: new Date(2025, 8, 25),
        dateFormatted: "September 25, 2025",
        
    },
    {
        filename: "Cloud-Services-And-Architectures_QUANTIC_09_10_2025.png",
        name: "Cloud Services And Architectures",
        issuer: "QUANTIC",
        date: new Date(2025, 8, 10),
        dateFormatted: "September 10, 2025",
        
    },
    {
        filename: "Introduction-To-Git-And-Github_QUANTIC_09_06_2025.png",
        name: "Introduction to Git And Github",
        issuer: "QUANTIC",
        date: new Date(2025, 8, 6),
        dateFormatted: "September 6, 2025",
        
    },
    {
        filename: "Enterprise-Architectures_QUANTIC_08_22_2025.png",
        name: "Enterprise Architectures",
        issuer: "QUANTIC",
        date: new Date(2025, 7, 22),
        dateFormatted: "August 22, 2025",
        
    },
    {
        filename: "Paradigms-And-Patterns_QUANTIC_08_09_2025.png",
        name: "Paradigms And Patterns",
        issuer: "QUANTIC",
        date: new Date(2025, 7, 9),
        dateFormatted: "August 9, 2025",
        
    },
    {
        filename: "Organizational-Behavior-Working-In-Groups-And-Teams_QUANTIC_07_05_2025.png",
        name: "Organizational Behavior: Working in Groups and Teams",
        issuer: "QUANTIC",
        date: new Date(2025, 6, 5),
        dateFormatted: "July 5, 2025",
        
    },
    {
        filename: "Design-And-UML_QUANTIC_06_29_2025.png",
        name: "Design And UML",
        issuer: "QUANTIC",
        date: new Date(2025, 5, 29),
        dateFormatted: "June 29, 2025",
        
    },
    {
        filename: "Back-Ends_QUANTIC_06_23_2025.png",
        name: "Back Ends",
        issuer: "QUANTIC",
        date: new Date(2025, 5, 23),
        dateFormatted: "June 23, 2025",
        
    },
    {
        filename: "Relational-Databases_QUANTIC_06_16_2025.png",
        name: "Relational Databases",
        issuer: "QUANTIC",
        date: new Date(2025, 5, 16),
        dateFormatted: "June 16, 2025",
        
    },
    {
        filename: "Interactive-Web-Pages_QUANTIC_06_10_2025.png",
        name: "Interactive Web Pages",
        issuer: "QUANTIC",
        date: new Date(2025, 5, 10),
        dateFormatted: "June 10, 2025",
        
    },
    {
        filename: "Cultural-Intelligence_QUANTIC_06_02_2025.png",
        name: "Cultural Intelligence",
        issuer: "QUANTIC",
        date: new Date(2025, 5, 2),
        dateFormatted: "June 2, 2025",
        
    },
    {
        filename: "Web-Application-Foundations_QUANTIC_06_04_2025.png",
        name: "Web Application Foundations",
        issuer: "QUANTIC",
        date: new Date(2025, 5, 4),
        dateFormatted: "June 4, 2025",
        
    },
    {
        filename: "Cloud-Foundations_QUANTIC_05_29_2025.png",
        name: "Cloud Foundations",
        issuer: "QUANTIC",
        date: new Date(2025, 4, 29),
        dateFormatted: "May 29, 2025",
        
    },
    {
        filename: "Professionalism-And-Ethics_QUANTIC_05_31_2025.png",
        name: "Professionalism And Ethics",
        issuer: "QUANTIC",
        date: new Date(2025, 4, 31),
        dateFormatted: "May 31, 2025",
        
    },
    {
        filename: "Change-Leadership_QUANTIC_03_05_2025.png",
        name: "Change Leadership",
        issuer: "QUANTIC",
        date: new Date(2025, 2, 5),
        dateFormatted: "March 5, 2025",
        
    },
    {
        filename: "Manager-Mindset_QUANTIC_03_04_2025.png",
        name: "Manager Mindset",
        issuer: "QUANTIC",
        date: new Date(2025, 2, 4),
        dateFormatted: "March 4, 2025",
        
    },
    {
        filename: "Blue-Ocean-Strategy_QUANTIC_03_06_2025.png",
        name: "Blue Ocean Strategy",
        issuer: "QUANTIC",
        date: new Date(2025, 2, 6),
        dateFormatted: "March 6, 2025",
        
    },
    {
        filename: "Entrepreneurship-1-Customer-Discovery_QUANTIC_02_24_2025.png",
        name: "Entrepreneurship 1 Customer Discovery",
        issuer: "QUANTIC",
        date: new Date(2025, 1, 24),
        dateFormatted: "February 24, 2025",
        
    },
    {
        filename: "User-Centered-Design_QUANTIC_02_21_2025.png",
        name: "User-Centered Design",
        issuer: "QUANTIC",
        date: new Date(2025, 1, 21),
        dateFormatted: "February 21, 2025",
        
    },
    {
        filename: "Learn-To-Code-With-ChatGPT_QUANTIC_02_20_2025.png",
        name: "Learn to Code with ChatGPT",
        issuer: "QUANTIC",
        date: new Date(2025, 1, 20),
        dateFormatted: "February 20, 2025",
        
    },
    {
        filename: "Introduction-To-Machine-Learning_QUANTIC_02_27_2025.png",
        name: "Introduction to Machine Learning",
        issuer: "QUANTIC",
        date: new Date(2025, 1, 27),
        dateFormatted: "February 27, 2025",
        
    },
    {
        filename: "Introduction-To-Artificial-Intelligence_QUANTIC_02_19_2025.png",
        name: "Introduction to Artificial Intelligence",
        issuer: "QUANTIC",
        date: new Date(2025, 1, 19),
        dateFormatted: "February 19, 2025",
        
    },
    {
        filename: "Managing-Application-Development_QUANTIC_02_18_2025.png",
        name: "Managing Application Development",
        issuer: "QUANTIC",
        date: new Date(2025, 1, 18),
        dateFormatted: "February 18, 2025",
        
    }
].sort((a, b) => b.date - a.date); // Sort by most recent date first