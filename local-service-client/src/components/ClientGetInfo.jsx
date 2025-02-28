import React, { use, useEffect, useState } from 'react';

const ClientGetInfo = () => {

const [jobs, setJobs] = useState([]);

useEffect(() => {
    fetch('https://api.example.com/jobs')
    .then((response) => response.json())
    .then((data) => setJobs(data))
}, [])

};

export default ClientGetInfo;
