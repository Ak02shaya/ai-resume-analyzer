document.addEventListener('DOMContentLoaded', () => {
    const resumeFileInput = document.getElementById('resume-file');
    const analyzeButton = document.getElementById('analyze-button');
    const dropZone = document.querySelector('.drop-zone');

    dropZone.addEventListener('click', () => resumeFileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#39E079';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '#dbdfe6';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#dbdfe6';
        if (e.dataTransfer.files.length > 0) {
            resumeFileInput.files = e.dataTransfer.files;
            const dropZoneText = dropZone.querySelector('p');
            dropZoneText.textContent = e.dataTransfer.files[0].name;
        }
    });

    resumeFileInput.addEventListener('change', () => {
        const dropZoneText = dropZone.querySelector('p');
        if (resumeFileInput.files.length > 0) {
            dropZoneText.textContent = resumeFileInput.files[0].name;
        } else {
            dropZoneText.textContent = 'Drop your resume here';
        }
    });

    const roleSkills = {
        'software engineer': ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'Python', 'SQL', 'AWS', 'Docker', 'Git'],
        'product manager': ['Agile', 'Roadmapping', 'User Research', 'JIRA', 'Product Lifecycle Management', 'A/B Testing', 'Market Analysis'],
        'data scientist': ['Python', 'R', 'SQL', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Statistics', 'Data Visualization'],
        'ux designer': ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
        'default': ['Communication', 'Teamwork', 'Problem Solving', 'Microsoft Office', 'Project Management']
    };

    function getSkillsForRole(role) {
        const lowerCaseRole = role.toLowerCase().trim();
        let skills = roleSkills[lowerCaseRole];

        // If the exact role is not found, check for keywords
        if (!skills) {
            const roleKeywords = Object.keys(roleSkills).find(k => lowerCaseRole.includes(k));
            skills = roleKeywords ? roleSkills[roleKeywords] : roleSkills['default'];
        }

        // Shuffle skills for randomness
        const shuffledSkills = [...skills].sort(() => 0.5 - Math.random());

        // Split skills into found and missing, ensuring at least one of each
        const splitPoint = Math.max(1, Math.floor(Math.random() * (shuffledSkills.length - 1)));
        const skillsFound = shuffledSkills.slice(0, splitPoint);
        const missingSkills = shuffledSkills.slice(splitPoint);

        return { skillsFound, missingSkills };
    }

    analyzeButton.addEventListener('click', () => {
        const jobRole = document.getElementById('job-role').value;
        const resumeFile = resumeFileInput.files[0];

        if (!resumeFile || !jobRole) {
            alert('Please upload a resume and enter a job role.');
            return;
        }

        // Simulate analysis based on job role
        const score = Math.floor(Math.random() * 51) + 50; // 50-100
        const { skillsFound, missingSkills } = getSkillsForRole(jobRole);

        updateResults(score, skillsFound, missingSkills);
    });

    function updateResults(score, skillsFound, missingSkills) {
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = score;

        const skillsFoundList = document.getElementById('skills-found-list');
        skillsFoundList.innerHTML = '';
        skillsFound.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsFoundList.appendChild(li);
        });

        const skillsMissingList = document.getElementById('skills-missing-list');
        skillsMissingList.innerHTML = '';
        missingSkills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsMissingList.appendChild(li);
        });
    }
});
