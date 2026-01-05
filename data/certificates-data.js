// Certificate data extracted from certificate filenames
// Format: Certificate_Name_Issuer_DD_DD_YYYY.png
// Month is 0-indexed (October = 9)
const certificatesData = [
    {
        filename: "AWS_Artificial_Intelligence_Practitioner_Learning_Plan_AWS_12_22_2025.png",
        name: "AWS Artificial Intelligence Practitioner Learning Plan",
        issuer: "AWS",
        date: new Date(2025, 11, 22),
        dateFormatted: "December 22, 2025"
    },
    {
        filename: "Essentials_of_Prompt_Engineering_AWS_12_22_2025.png",
        name: "Essentials of Prompt Engineering",
        issuer: "AWS",
        date: new Date(2025, 11, 22),
        dateFormatted: "December 22, 2025"
    },
    {
        filename: "Security_Compliance_and_Governance_for_AI_Solutions_AWS_12_22_2025.png",
        name: "Security, Compliance, and Governance for AI Solutions",
        issuer: "AWS",
        date: new Date(2025, 11, 22),
        dateFormatted: "December 22, 2025"
    },
    {
        filename: "Optimizing_Foundation_Models_AWS_12_20_2025.png",
        name: "Optimizing Foundation Models",
        issuer: "AWS",
        date: new Date(2025, 11, 20),
        dateFormatted: "December 20, 2025"
    },
    {
        filename: "Developing_Machine_Learning_Solutions_AWS_12_20_2025.png",
        name: "Developing Machine Learning Solutions",
        issuer: "AWS",
        date: new Date(2025, 11, 20),
        dateFormatted: "December 20, 2025"
    },
    {
        filename: "Developing_Generative_Artificial_Intelligence_Solutions_AWS_12_20_2025.png",
        name: "Developing Generative Artificial Intelligence Solutions",
        issuer: "AWS",
        date: new Date(2025, 11, 20),
        dateFormatted: "December 20, 2025"
    },
    {
        filename: "Responsible_Artificial_Intelligence_Practices_AWS_12_19_2025.png",
        name: "Responsible Artificial Intelligence Practices",
        issuer: "AWS",
        date: new Date(2025, 11, 19),
        dateFormatted: "December 19, 2025"
    },
    {
        filename: "Exploring_Artificial_Intelligence_Use_Cases_and_Applications_AWS_12_18_2025.png",
        name: "Exploring Artificial Intelligence Use Cases and Applications",
        issuer: "AWS",
        date: new Date(2025, 11, 18),
        dateFormatted: "December 18, 2025"
    },
    {
        filename: "Fundamentals_of_Machine_Learning_and_Artificial_Intelligence_AWS_12_18_2025.png",
        name: "Fundamentals of Machine Learning and Artificial Intelligence",
        issuer: "AWS",
        date: new Date(2025, 11, 18),
        dateFormatted: "December 18, 2025"
    },
    {
        filename: "AWS_Cloud_Practitioner_Essentials_AWS_12_09_2025.png",
        name: "AWS Cloud Practitioner Essentials",
        issuer: "AWS",
        date: new Date(2025, 11, 9),
        dateFormatted: "December 9, 2025"
    },
    {
        filename: "Serverless_Application_Development_II_QUANTIC_12_04_2025.png",
        name: "Serverless Application Development II",
        issuer: "QUANTIC",
        date: new Date(2025, 11, 4),
        dateFormatted: "December 4, 2025"
    },
    {
        filename: "Serverless_Application_Development_I_QUANTIC_12_02_2025.png",
        name: "Serverless Application Development I",
        issuer: "QUANTIC",
        date: new Date(2025, 11, 2),
        dateFormatted: "December 2, 2025"
    },
    {
        filename: "Migrating_An_Existing_Web_Application_II_QUANTIC_11_28_2025.png",
        name: "Migrating an Existing Web Application II",
        issuer: "QUANTIC",
        date: new Date(2025, 10, 28),
        dateFormatted: "November 28, 2025"
    },
    {
        filename: "Migrating_An_Existing_Web_Application_I_QUANTIC_11_26_2025.png",
        name: "Migrating an Existing Web Application I",
        issuer: "QUANTIC",
        date: new Date(2025, 10, 26),
        dateFormatted: "November 26, 2025"
    },
    {
        filename: "AWS_Academy_Cloud_Foundations_QUANTIC_11_25_2025.png",
        name: "AWS Academy Cloud Foundations",
        issuer: "QUANTIC",
        date: new Date(2025, 10, 25),
        dateFormatted: "November 25, 2025"
    },
    {
        filename: "Cloud_Foundations_AWS_ACADEMY_11_24_2025.png",
        name: "Cloud Foundations",
        issuer: "AWS ACADEMY",
        date: new Date(2025, 10, 24),
        dateFormatted: "November 24, 2025"
    },
    {
        filename: "AWS_Technical_Essentials_AWS_11_19_2025.png",
        name: "AWS Technical Essentials",
        issuer: "AWS",
        date: new Date(2025, 10, 19), 
        dateFormatted: "November 19, 2025"
    },
    {
        filename: "Performance_Monitoring_QUANTIC_10_28_2025.png",
        name: "Performance Monitoring",
        issuer: "QUANTIC",
        date: new Date(2025, 9, 28),
        dateFormatted: "October 28, 2025"
    },
    {
        filename: "Learn_How_to_Use_AI_for_Coding_CODECADEMY_10_09_2025.png",
        name: "Learn How to Use AI for Coding",
        issuer: "CODECADEMY",
        date: new Date(2025, 9, 9),
        dateFormatted: "October 9, 2025"
    },
    {
        filename: "Learn_How_to_Use_ChatGPT_CODECADEMY_10_06_2025.png",
        name: "Learn How to Use ChatGPT",
        issuer: "CODECADEMY",
        date: new Date(2025, 9, 6),
        dateFormatted: "October 6, 2025"
    },
    {
        filename: "CICD_And_Software-Maintenance_QUANTIC_10_08_2025.png",
        name: "CI/CD And Software-Maintenance",
        issuer: "QUANTIC",
        date: new Date(2025, 9, 8),
        dateFormatted: "October 8, 2025"
    },
    {
        filename: "Generative_AI_for_Everyone_CODECADEMY_10_09_2025.png",
        name: "Generative AI for Everyone",
        issuer: "CODECADEMY",
        date: new Date(2025, 9, 9),
        dateFormatted: "October 9, 2025"
    },
    {
        filename: "Intro_to_Vibe_Coding_CODECADEMY_09_26_2025.png",
        name: "Intro to Vibe Coding",
        issuer: "CODECADEMY",
        date: new Date(2025, 8, 26),
        dateFormatted: "September 26, 2025"
    },
    {
        filename: "Software_Testing_QUANTIC_09_25_2025.png",
        name: "Software Testing",
        issuer: "QUANTIC",
        date: new Date(2025, 8, 25),
        dateFormatted: "September 25, 2025"
    },
    {
        filename: "Cloud_Services_And_Architectures_QUANTIC_09_10_2025.png",
        name: "Cloud Services And Architectures",
        issuer: "QUANTIC",
        date: new Date(2025, 8, 10),
        dateFormatted: "September 10, 2025"
    },
    {
        filename: "Introduction_to_Git_And_Github_QUANTIC_09_06_2025.png",
        name: "Introduction to Git And Github",
        issuer: "QUANTIC",
        date: new Date(2025, 8, 6),
        dateFormatted: "September 6, 2025"
    },
    {
        filename: "Enterprise_Architectures_QUANTIC_08_22_2025.png",
        name: "Enterprise Architectures",
        issuer: "QUANTIC",
        date: new Date(2025, 7, 22),
        dateFormatted: "August 22, 2025"
    },
    {
        filename: "Paradigms_And_Patterns_QUANTIC_08_09_2025.png",
        name: "Paradigms And Patterns",
        issuer: "QUANTIC",
        date: new Date(2025, 7, 9),
        dateFormatted: "August 9, 2025"
    },
    {
        filename: "Organizational_Behavior_Working_In_Groups_And_Teams_QUANTIC_07_05_2025.png",
        name: "Organizational Behavior Working In Groups And Teams",
        issuer: "QUANTIC",
        date: new Date(2025, 6, 5),
        dateFormatted: "July 5, 2025"
    },
    {
        filename: "Design_And_UML_QUANTIC_06_29_2025.png",
        name: "Design And UML",
        issuer: "QUANTIC",
        date: new Date(2025, 5, 29),
        dateFormatted: "June 29, 2025"
    },
    {
        filename: "Back_Ends_QUANTIC_06_23_2025.png",
        name: "Back Ends",
        issuer: "QUANTIC",
        date: new Date(2025, 5, 23),
        dateFormatted: "June 23, 2025"
    },
    {
        filename: "Relational_Databases_QUANTIC_06_16_2025.png",
        name: "Relational Databases",
        issuer: "QUANTIC",
        date: new Date(2025, 5, 16),
        dateFormatted: "June 16, 2025"
    },
    {
        filename: "Interactive_Web_Pages_QUANTIC_06_10_2025.png",
        name: "Interactive Web Pages",
        issuer: "QUANTIC",
        date: new Date(2025, 5, 10),
        dateFormatted: "June 10, 2025"
    },
    {
        filename: "Cultural_Intelligence_QUANTIC_06_02_2025.png",
        name: "Cultural Intelligence",
        issuer: "QUANTIC",
        date: new Date(2025, 5, 2),
        dateFormatted: "June 2, 2025"
    },
    {
        filename: "Web_Application_Foundations_QUANTIC_06_04_2025.png",
        name: "Web Application Foundations",
        issuer: "QUANTIC",
        date: new Date(2025, 5, 4),
        dateFormatted: "June 4, 2025"
    },
    {
        filename: "Cloud_Foundations_QUANTIC_05_29_2025.png",
        name: "Cloud Foundations",
        issuer: "QUANTIC",
        date: new Date(2025, 4, 29),
        dateFormatted: "May 29, 2025"
    },
    {
        filename: "Professionalism_And_Ethics_QUANTIC_05_31_2025.png",
        name: "Professionalism And Ethics",
        issuer: "QUANTIC",
        date: new Date(2025, 4, 31),
        dateFormatted: "May 31, 2025"
    },
    {
        filename: "Change_Leadership_QUANTIC_03_05_2025.png",
        name: "Change Leadership",
        issuer: "QUANTIC",
        date: new Date(2025, 2, 5),
        dateFormatted: "March 5, 2025"
    },
    {
        filename: "Manager_Mindset_QUANTIC_03_04_2025.png",
        name: "Manager Mindset",
        issuer: "QUANTIC",
        date: new Date(2025, 2, 4),
        dateFormatted: "March 4, 2025"
    },
    {
        filename: "Blue_Ocean_Strategy_QUANTIC_03_06_2025.png",
        name: "Blue Ocean Strategy",
        issuer: "QUANTIC",
        date: new Date(2025, 2, 6),
        dateFormatted: "March 6, 2025"
    },
    {
        filename: "Entrepreneurship_1_Customer_Discovery_QUANTIC_02_24_2025.png",
        name: "Entrepreneurship 1 Customer Discovery",
        issuer: "QUANTIC",
        date: new Date(2025, 1, 24),
        dateFormatted: "February 24, 2025"
    },
    {
        filename: "User-Centered_Design_QUANTIC_02_21_2025.png",
        name: "User-Centered Design",
        issuer: "QUANTIC",
        date: new Date(2025, 1, 21),
        dateFormatted: "February 21, 2025"
    },
    {
        filename: "Learn_to_Code_with_ChatGPT_QUANTIC_02_20_2025.png",
        name: "Learn to Code with ChatGPT",
        issuer: "QUANTIC",
        date: new Date(2025, 1, 20),
        dateFormatted: "February 20, 2025"
    },
    {
        filename: "Introduction_to_Machine_Learning_QUANTIC_02_27_2025.png",
        name: "Introduction to Machine Learning",
        issuer: "QUANTIC",
        date: new Date(2025, 1, 27),
        dateFormatted: "February 27, 2025"
    },
    {
        filename: "Introduction_to_Artificial_Intelligence_QUANTIC_02_19_2025.png",
        name: "Introduction to Artificial Intelligence",
        issuer: "QUANTIC",
        date: new Date(2025, 1, 19),
        dateFormatted: "February 19, 2025"
    },
    {
        filename: "Managing_Application_Development_QUANTIC_02_18_2025.png",
        name: "Managing Application Development",
        issuer: "QUANTIC",
        date: new Date(2025, 1, 18),
        dateFormatted: "February 18, 2025"
    }
].sort((a, b) => b.date - a.date); // Sort by most recent date first