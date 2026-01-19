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

    analyzeButton.addEventListener('click', () => {
        const jobRole = document.getElementById('job-role').value;
        const resumeFile = resumeFileInput.files[0];

        if (!resumeFile || !jobRole) {
            alert('Please upload a resume and enter a job role.');
            return;
        }

        // Simulate analysis
        const score = Math.floor(Math.random() * 51) + 50; // 50-100
        const skillsFound = ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS'];
        const missingSkills = ['Python', 'SQL', 'AWS'];

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
