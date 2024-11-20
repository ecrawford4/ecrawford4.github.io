const dataSource = "http://ecrawford.me/data.json";

fetch(dataSource)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Data fetched successfully:', data);

    const container = document.querySelector("main");
    if (!container) {
      console.error('Main container not found');
      return;
    }

    data.music.forEach(key => {
      const template = `
        <section>
          <h3>${key.title}</h3>
          <audio controls src="${key.audioSrc}"></audio>
          <a href="${key.scoreSrc}" target="_blank">View Score</a>
        </section>
      `;
      container.insertAdjacentHTML('afterbegin', template);
    });

    const contactContainer = document.querySelector(".contact");
    if (!contactContainer) {
      console.error('Contact container not found');
      return;
    }

    data.socials.forEach(social => {
      const socialTemplate = `
        <a href="${social.socialLink}" target="_blank">
          <img src="${social.imgSrc}" alt="${social.altText}" width="${social.width}" height="${social.height}">
        </a>
      `;
      contactContainer.insertAdjacentHTML('beforeend', socialTemplate);
    });
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });