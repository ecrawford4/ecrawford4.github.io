document.addEventListener('DOMContentLoaded', () => {
  // take the time at the moment the page is loaded, display it as the "current session"
  const dateTimeString = new Date().toLocaleString();
  const [datePart, timePart] = dateTimeString.split(', ');
  document.getElementById('current-session').innerHTML = `Current Session:<br>${datePart}<br>${timePart}`;

  // real time clock display: update the time every second
  setInterval(() => {
    const dateTimeString = new Date().toLocaleString();
    const [datePart, timePart] = dateTimeString.split(', ');
    document.getElementById('real-time-clock').innerHTML = `Current Time:<br>${datePart}<br>${timePart}`;
  }, 1000);

  // fetch the data from the data.json file
  const dataSource = "https://ecrawford4-assets.s3.us-east-2.amazonaws.com/data.json";

  fetch(dataSource)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data fetched successfully:', data);

      // select the project container
      const projectContainer = document.querySelector("figure.pinned-project-grid-container");
      if (!projectContainer) {
        console.error('Project container not found');
        return;
      }

      //  populate pinned projects
      data.pinnedProjects.forEach(project => {
        const projectTemplate = `
        <a class="grid-item" target="_blank" href="${project.link}">${project.title}</a>`;
        projectContainer.insertAdjacentHTML('beforeend', projectTemplate);
      })

      // select the contact container
      const contactContainer = document.querySelector("div.contact");
      if (!contactContainer) {
        console.error('Contact container not found');
        return;
      }

      // populate social badges
      data.socials.forEach(social => {
        const socialTemplate = `
        <a class="social-badge" target="_blank" href="${social.socialLink}">
          <img class="social-badge" src="${social.imgSrc}" alt="${social.altText}" width="${social.width}" height="${social.height}">
        </a>
      `;
        contactContainer.insertAdjacentHTML('beforeend', socialTemplate);
      });

      // select the music container
      const container = document.querySelector("figure.music-folio-grid-container");
      if (!container) {
        console.error('figure.music-folio-grid-container container not found');
        return;
      }

      // populate music portfolio
      data.music.forEach(key => {
        const template = `
          <figure>
            <h2 class="music-folio">${key.title}</h2>
            <audio src="${key.audioSrc}" controls></audio>
            <a class="music-folio-badge" target="_blank" href="${key.scoreSrc}">View Score</a>
          </figure>
        `;
        container.insertAdjacentHTML('afterbegin', template);
      });
    });
});