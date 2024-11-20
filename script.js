const dataSource = "http://ecrawford.me/data.json";

fetch(dataSource)
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector("main");

    data.music.map(key => {
      const template = `
        <section>
          <h3>${key.title}</h3>
          <audio controls src="${key.audioSrc}"></audio>
          <a href="${key.scoreSrc}" target="_blank">View Score</a>
        </section>
      `;
      container.insertAdjacentHTML('afterbegin', template);
    });

    const contactContainer = document.querySelector("div .contact");

    data.socials.map(social => {
      const socialTemplate = `
        <a href="${social.socialLink}" target="_blank">
          <img src="${social.imgSrc}" alt="${social.altText}" width="${social.width}" height="${social.height}">
        </a>
      `;
      contactContainer.insertAdjacentHTML('beforeend', socialTemplate);
    });
  });