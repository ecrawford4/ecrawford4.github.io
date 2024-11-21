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
  
        const container = document.querySelector("main");
        if (!container) {
          console.error('main container not found');
          return;
        }
  
        data.music.forEach(key => {
          const template = `
          <figure class="music-folio-grid-container">
            <h2 class="music-folio">${key.title}</h2>
            <audio src="${key.audioSrc}" controls></audio>
            <a class="music-folio-badge" href="${key.scoreSrc}" target="_blank">View Score</a>
          </figure>
        `;
          container.insertAdjacentHTML('afterbegin', template);
        });
    });
});