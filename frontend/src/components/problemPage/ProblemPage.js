import './problems.css';
import {Button, IconButton} from '@mui/material'
import {Question} from 'phosphor-react'

const ProblemPage = ()=>{
    return <>
    <div className='problemPage'>
    <div className='problem-navbar'>
        <div className='left'>
            <p>Problems</p>
        </div>
        <div className='right'>
            <Button variant='outlined'> <IconButton><Question></Question></IconButton> Ask a Question</Button>
        </div>
    </div>
    </div>
    </>;
}

export default ProblemPage;