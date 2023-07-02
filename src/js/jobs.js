console.log('jobs.js')
let jobs = [];

function formatTime(inputTime) {
    const date = new Date(inputTime);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    return formattedDate;
  }

const fetchJobs = async () => {
    try {
        const response = await fetch('https://jobsearch4.p.rapidapi.com/api/v1/Jobs/Search?SearchQuery=java', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '7e18f8d590msh35a7a6e6e5a36dep1ae26bjsn0163a43d408c',
                'X-RapidAPI-Host': 'jobsearch4.p.rapidapi.com'
            }
        });
        const result = await response.json();
        jobs = result.data;
        console.log(jobs);
    } catch (error) {
        console.error(error);
    }

    if (jobs.length > 0) {
        let jobsHtml = '';
        jobs.forEach(job => {
            jobsHtml += `
            <div class="job-item p-4 mb-4">
            <div class="row g-4">
                <div class="col-sm-12 col-md-8 d-flex align-items-center">
                    <img class="flex-shrink-0 img-fluid border rounded" src="img/com-logo-1.jpg" alt="" style="width: 80px; height: 80px;">
                    <div class="text-start ps-4">
                        <h5 class="mb-3">${job.title}</h5>
                        <span class="text-truncate me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>${job.location ? job.location : 'N/A'}</span>
                        <span class="text-truncate me-3"><i class="far fa-clock text-primary me-2"></i>Full Time</span>
                        <span class="text-truncate me-3"><i class="far fa-money-bill-alt text-primary me-2"></i>${job.salary ? job.salary : 'N/A'}</span>
                        <span class="text-truncate me-0"><i class="far fa-building text-primary me-2"></i>${job.company ? job.company : 'N/A'}</span>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                    <div class="d-flex mb-3">
                        <a class="btn btn-light btn-square me-3" href=""><i class="far fa-heart text-primary"></i></a>
                        <a target="_blank" class="btn btn-primary" href="${job.url}">Apply Now</a>
                    </div>
                    <small class="text-truncate"><i class="far fa-calendar-alt text-primary me-2"></i>Date Line: ${formatTime(job.dateAdded)}</small>
                </div>
            </div>
        </div>
            `;
        });
        document.querySelector('#tab-1').innerHTML = jobsHtml+`<a class="btn btn-primary py-3 px-5" href="">Browse More Jobs</a>`;
    }
}

fetchJobs();