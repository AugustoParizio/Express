const {
    request,
    response,
} = require('express');
const express = require('express');
const {
    v4: uuidv4
} = require('uuid');

const app = express();


app.use(express.json());

const projects = [];

app.get('/projects', (request, response) => {
    const {
        title,
        owner
    } = request.query

    console.log(title);
    console.log(owner);

    return response.json(projects)
});

app.post('/projects', (request, response) => {
    const {
        title,
        owner
    } = request.body;
    const project = {
        id: uuidv4(),
        title,
        owner
    };

    projects.push(project);

    return response.json(project);
});

//console.log(title);
//console.log(owner);



app.put('/projects/:id', (request, response) => {
    const {id} = request.params;
    const {title,owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id == id)
    if (projectIndex < 0){
        return response.status(400).json({error: 'Projeto nao encontrado'});
    }

    const project = {
            id,
            title,
            owner,
    }

    project[projectIndex] = project

     return response.json (project); 
});

app.delete('/projects/:id', (request, response) => {
    const {id} = request.params;
    
    const projectIndex = projects.findIndex(project => project.id == id)
   
    if (projectIndex < 0){
        return response.status(400).json({error: 'Projeto nao encontrado'});
        }
        projects.splice(projectIndex, 1);
        return response.status(204).send()
    });


   app.listen(3000);