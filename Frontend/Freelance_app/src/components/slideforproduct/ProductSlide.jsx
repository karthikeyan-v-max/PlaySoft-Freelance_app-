import React, { Children } from 'react'
import "./productslide.css"
import { projects } from '../../data'
import ProjectCard from '../productCard/ProjectsCard'




const ProductSlide = () => {
  
  return (
    <div className='slidep'>
        <div className="containersp">
        {projects.map(project=>(
          <ProjectCard item={project} key={project.id}/>
        ))}
        </div>
    </div>
          
)}

export default ProductSlide