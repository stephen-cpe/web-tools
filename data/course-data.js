const certificates = certificatesData;

const mssceCourses = [
    {
        title: "MANAGING SOFTWARE ENGINEER",
        courses: [
            { name: "Managing Application Development", status: "complete", certificate: certificates.find(c => c.name === 'Managing Application Development') },
            { name: "User-Centered Design", status: "complete", certificate: certificates.find(c => c.name === 'User-Centered Design') },
            { name: "Cloud Foundations", status: "complete", certificate: certificates.find(c => c.name === 'Cloud Foundations') },
            { name: "Professionalism And Ethics", status: "complete", certificate: certificates.find(c => c.name === 'Professionalism And Ethics') },
            { name: "Exam and Project", status: "complete" }
        ]
    },
    {
        title: "WEB APPLICATION AND INTERFACE DESIGN",
        courses: [
            { name: "Web Application Foundations", status: "complete", certificate: certificates.find(c => c.name === 'Web Application Foundations') },
            { name: "Interactive Web Pages", status: "complete", certificate: certificates.find(c => c.name === 'Interactive Web Pages') },
            { name: "Relational Databases", status: "complete", certificate: certificates.find(c => c.name === 'Relational Databases') },
            { name: "Back Ends", status: "complete", certificate: certificates.find(c => c.name === 'Back Ends') },
            { name: "Exam and Project", status: "complete" }
        ]
    },
    {
        title: "SOFTWARE DESIGN AND ARCHITECTURE",
        courses: [
            { name: "Design And UML", status: "complete", certificate: certificates.find(c => c.name === 'Design And UML') },
            { name: "Paradigms And Patterns", status: "complete", certificate: certificates.find(c => c.name === 'Paradigms And Patterns') },
            { name: "Enterprise Architectures", status: "complete", certificate: certificates.find(c => c.name === 'Enterprise Architectures') },
            { name: "Cloud Services And Architectures", status: "complete", certificate: certificates.find(c => c.name === 'Cloud Services And Architectures') },
            { name: "Exam and Project", status: "complete" }
        ]
    },
    {
        title: "SOFTWARE TESTING AND CI/CD",
        courses: [
            { name: "Introduction to Git and GitHub", status: "complete", certificate: certificates.find(c => c.name === 'Introduction to Git And Github') },
            { name: "Software Testing", status: "complete", certificate: certificates.find(c => c.name === 'Software Testing') },
            { name: "CI/CD and Software Maintenance", status: "complete", certificate: certificates.find(c => c.name === 'CI/CD And Software-Maintenance') },
            { name: "Performance Monitoring", status: "complete", certificate: certificates.find(c => c.name === 'Performance Monitoring') },
            { name: "Exam", status: "complete" }
        ]
    },
    {
        title: "CLOUD AND APPLICATIONS ARCHITECTURES",
        courses: [
            { name: "AWS Academy Cloud Foundations", status: "complete", certificate: certificates.find(c => c.name === 'AWS Academy Cloud Foundations') },
            { name: "Migrating an Existing Web Application I", status: "complete", certificate: certificates.find(c => c.name === 'Migrating an Existing Web Application I') },
            { name: "Migrating an Existing Web Application II", status: "complete", certificate: certificates.find(c => c.name === 'Migrating an Existing Web Application II') },
            { name: "Serverless Application Development I", status: "complete", certificate: certificates.find(c => c.name === 'Serverless Application Development I') },
            { name: "Serverless Application Development II", status: "complete", certificate: certificates.find(c => c.name === 'Serverless Application Development II') },
            { name: "Exam", status: "complete" }
        ]
    },
    {
        title: "INTRODUCTION TO MACHINE LEARNING",
        courses: [
            { name: "Introduction to Machine Learning", status: "complete", certificate: certificates.find(c => c.name === 'Introduction to Machine Learning') },
            { name: "Data Preprocessing", status: "complete", certificate: certificates.find(c => c.name === 'Data Preprocessing') },
            { name: "Linear Algebra for Machine Learning", status: "complete", certificate: certificates.find(c => c.name === 'Linear Algebra For Machine Learning') },
            { name: "Logistic Regression", status: "complete", certificate: certificates.find(c => c.name === 'Logistic Regression') },
            { name: "Decision Trees and Random Forests", status: "complete", certificate: certificates.find(c => c.name === 'Decision Trees And Random Forests') },
            { name: "Clustering with Unsupervised Learning", status: "complete", certificate: certificates.find(c => c.name === 'Clustering With Unsupervised Learning') },
            { name: "Introduction to Deep Learning", status: "complete", certificate: certificates.find(c => c.name === 'Introduction To Deep Learning') },
            { name: "Exam and Project", status: "complete" }
        ]
    },
    {
        title: "ARTIFICIAL INTELLIGENCE ENGINEERING",
        courses: [
            { name: "Adopting AI in Your Organization", status: "complete", certificate: certificates.find(c => c.name === 'Adopting AI in Your Organization')  },
            { name: "LLM-Based Apps", status: "complete", certificate: certificates.find(c => c.name === 'LLM-Based Apps')  },
            { name: "Model Fine-Tuning", status: "complete", certificate: certificates.find(c => c.name === 'Model Fine-Tuning')  },
            { name: "Exam and Presentation", status: "complete" }
        ]
    },
    {
        title: "MICROSERVICES ARCHITECTURES",
        courses: [
            { name: "Microservices I: Designing and Building", status: "incomplete" },
            { name: "Microservices II: Deploying and Testing", status: "incomplete" },
            { name: "Microservices III: Scaling and Kubernetes", status: "incomplete"  },
            { name: "Exam", status: "incomplete" }
        ]
    },

];

const otherCourses = [
    {
        platform: "Codecademy",
        courses: [
            { name: "AIF-C01 AWS Certified AI Practitioner", status: "complete", certificate: certificates.find(c => c.name === 'AIF-C01 AWS Certified AI Practitioner') },
            { name: "Generative AI for Everyone (Skill Path)", status: "complete", certificate: certificates.find(c => c.name === 'Generative AI for Everyone') },
            { name: "More Courses to be added.", status: "incomplete" }
        ]
    },
    {
        platform: "AWS Training and Certification",
        courses: [
            { name: "AWS Technical Essentials", status: "complete", certificate: certificates.find(c => c.name === 'AWS Technical Essentials') },
            { name: "Cloud Foundations", status: "complete", certificate: certificates.find(c => c.name === 'Cloud Foundations') },
            { name: "AWS Cloud Practitioner Essentials", status: "complete", certificate: certificates.find(c => c.name === 'AWS Cloud Practitioner Essentials') },
            { name: "More Courses to be added.", status: "incomplete" }
        ]
    }
];