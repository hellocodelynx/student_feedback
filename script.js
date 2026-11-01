document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.sidebar a[data-endpoint]');
    const contentDiv = document.getElementById('content');

    function loadContent(endpoint) {
        fetch(endpoint)
            .then(resp => {
                if (!resp.ok) throw new Error('Network response was not ok');
                return resp.text();
            })
            .then(html => {
                contentDiv.innerHTML = html;
            })
            .catch(err => {
                contentDiv.innerHTML = `<p style="color:red;">Error loading ${endpoint}: ${err.message}</p>`;
            });
    }

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            // highlight active link
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const endpoint = link.getAttribute('data-endpoint');
            loadContent(endpoint);
        });
    });
});

