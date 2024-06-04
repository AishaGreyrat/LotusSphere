document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('/proyectos/getAll', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Si estás utilizando tokens para autenticación
            }
        });

        const projects = response.data;
        const projectContainer = document.getElementById('projectContainer');

        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project-item');
            projectElement.innerHTML = `
                <h2>${project.nombre}</h2>
                <p>${project.descripcion}</p>
            `;
            projectContainer.appendChild(projectElement);
        });
    } catch (error) {
        console.error('Error al obtener los proyectos:', error);
    }
});
