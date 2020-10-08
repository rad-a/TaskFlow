import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent,Container } from '@material-ui/core';
import moment from 'moment'
import styles from './styles.css'


//new project form component
const ProjectForm = () => {

    const [ProjectForm, setProjectForm] = useState({
        title: "",
        description: "",
        dueDate: ""

    })
    const [errors, setErrors] = useState({})
    const [formFeedback, setFormFeedback] = useState(false)

    function handleFormChange(e) {
        //console.log(e.currentTarget.name)
        const { name, value } = e.currentTarget;
        setProjectForm({ ...ProjectForm, [name]: value });
        setFormFeedback(false)

    }



    const onFormSubmit = (event) => {
        event.preventDefault()
        console.log(ProjectForm)
        // if (errors) {
        //     console.log(errors)
        //     return
        // }
        // else {
            
            //we will run an axios post request
            axios.post('/api/project', {
                 title:ProjectForm.title,
                 description:ProjectForm.description,
                 dueDate:ProjectForm.dueDate,
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            
            const clearState = {
                title: "",
                description: "",
                dueDate: ""
            }

            setProjectForm({ ...clearState })

            setFormFeedback(true)
        
    }

    async function handleDate(e){
        console.log(e.target.value)
        const value =await e.target.value;
   
        convert(value)
    }

    async function convert(x){
        let newDate= moment(x,'YYYY-MM-DD').format('MMMM Do YYYY')
        await setProjectForm({ ...ProjectForm, dueDate: newDate});
    }
    return (
        <Container>
        <div styles={styles} className="forms"  >
            <Card styles={{marginLeft: 100}}>
                <CardContent>
                    <form >
                        <div className="form-group">
                            <label><h5>Title of Project</h5></label>
                            <input
                                onChange={handleFormChange}
                                name="title"
                                value={ProjectForm.title}
                                className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label><h5>Project Objective</h5></label>
                            <small className="form-text text-muted">Please give a brief description of the goal of your project</small>
                            <input
                                onChange={handleFormChange}
                                name="description"
                                value={ProjectForm.description}
                                className="form-control"
                                rows={3}/>
                        </div>
                        
                        <div className="form-group date" data-provide="datepicker">
                        <div className="form-group date" data-provide="datepicker">
                            <label>Overall Due Date for your Project</label>
                            
                        </div>
                        <label for="start">Completion date :</label>
                        <input onChange={handleDate} type="date" id="start" name="trip-start"
       value=''
       min="2020-01-01" max="2040-12-31"></input>
       <h5>{ProjectForm.dueDate &&<h4> Due Date:{ProjectForm.dueDate}</h4> }</h5>
                        </div>
                        <button onClick={onFormSubmit} className="btn btn-primary">Submit Project</button>
                    </form>
                </CardContent>
            </Card>    
        </div>
        </Container>
    )
}

export default ProjectForm