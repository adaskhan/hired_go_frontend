import { Select } from 'antd';

const defaultValue = [
    'SQL',
    'Python',
    'JavaScript',
    'Java',
    'HTML',
    'CSS',
    'React',
    'Angular',
    'Vue',
    'Node.js',
    'Express.js',
    'MongoDB',
    'MySQL',
    'PostgreSQL',
    'AWS',
    'Azure',
    'Google Cloud',
    'Docker',
    'Kubernetes',
    'Git',
    'Jenkins',
    'Python Django',
    'Ruby',
    'Ruby on Rails',
    'C#',
    'ASP.NET',
    'PHP',
    'Laravel',
    'WordPress',
    'Flutter',
    'Swift',
    'Kotlin',
    'C++',
    'C',
    'Rust',
    'Go',
    'Scala',
    'TypeScript',
    'Redux',
    'GraphQL',
    'RESTful API',
    'Microservices',
    'Big Data',
    'Machine Learning',
    'Deep Learning',
    'Artificial Intelligence',
    'Data Science',
    'Blockchain',
    'Cybersecurity',
    'UI/UX Design',
    'Responsive Web Design',
    'Mobile App Development',
    'Game Development',
    'DevOps',
    'Agile Methodology',
    'Scrum',
    'Kanban',
    'Test-Driven Development',
    'Continuous Integration',
    'Continuous Delivery',
    'Serverless Architecture',
    'Firebase',
    'TensorFlow',
    'PyTorch',
    'Natural Language Processing',
    'Computer Vision',
    'Robotics',
    'AR/VR',
    'IoT',
    'Blockchain',
    'Cryptocurrency',
    'Ethical Hacking',
    'SEO',
    'Google Analytics',
    'Social Media Marketing',
    'Content Marketing',
    'UI/UX Design',
    'Graphic Design',
    'Illustration',
    'Motion Graphics',
    'Video Editing',
    'Copywriting',
    'Content Writing',
    'Blogging',
    'Email Marketing',
    'Product Management',
    'Project Management',
    'Agile Methodology',
    'Leadership',
    'Teamwork',
];  

const SelectSkills = ({ value, onChange }) => {
    const handleChange = (selectedSkills) => {
      onChange(selectedSkills);
    };
  
    return (
        <Select
        mode="tags"
        style={{ width: '100%' }}
        placeholder="Tags Mode"
        value={value} // Pass the value prop
        onChange={handleChange}
      >
        {defaultValue.map((skill) => (
          <Select.Option key={skill} value={skill}>
            {skill}
          </Select.Option>
        ))}
      </Select>
    );
  };
  
  export default SelectSkills;
  