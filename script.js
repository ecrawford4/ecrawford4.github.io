document.addEventListener('DOMContentLoaded', () => {
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

      const contactContainer = document.querySelector("div.contact");
      if (!contactContainer) {
        console.error('Contact container not found');
        return;
      }

      data.socials.forEach(social => {
        const socialTemplate = `
        <a class="social-badge" href="${social.socialLink}" target="_blank">
          <img class="social-badge" src="${social.imgSrc}" alt="${social.altText}" width="${social.width}" height="${social.height}">
        </a>
      `;
        contactContainer.insertAdjacentHTML('beforeend', socialTemplate);
      }).catch(error => {
        console.error('Fetch error:', error);
      });

      const projectContainer = document.querySelector("figure.pinned-project-grid-container");
      if (!projectContainer) {
        console.error('Project container not found');
        return;
      }

      data.pinnedProjects.forEach(project => {
        const projectTemplate = `
        <a class="grid-item" href="${project.link}">${project.title}</a>`;
        projectContainer.insertAdjacentHTML('beforeend', projectTemplate);
      }).catch(error => {
        console.error('Fetch error:', error);
      });
    });
});