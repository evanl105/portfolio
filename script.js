// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function(){

    // =========================
    // Add "View Demo" Buttons
    // =========================
    const cards = document.querySelectorAll('#projects .card');

    cards.forEach(card => {
        const actions = document.createElement('div');
        actions.className = 'project-actions';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'project-btn external';
        btn.textContent = 'View demo';

        const url = card.dataset.url || '';

        if(url){
            btn.dataset.url = url;
        } else {
            btn.disabled = true;
            btn.title = 'Set data-url on the article element to enable';
        }

        btn.addEventListener('click', function(){
            const u = this.dataset.url;

            if(!u){
                alert('No demo URL set. Add the URL as data-url on the project <article> element.');
                return;
            }

            openProject(u);
        });

        actions.appendChild(btn);
        card.appendChild(actions);
    });

    // =========================
    // Auto-update Footer Year
    // =========================
    const yearEl = document.getElementById('year');
    if(yearEl){
        yearEl.textContent = new Date().getFullYear();
    }

});


// =========================
// Open Project in New Tab
// =========================
function openProject(url){
    if(!url) return false;

    try{
        window.open(url, '_blank', 'noopener,noreferrer');
        return true;
    }catch(e){
        window.location.href = url;
        return true;
    }
}


// =========================
// Contact Form
// =========================
function sendMail(e){
    e.preventDefault();

    const name = encodeURIComponent(document.getElementById('name').value.trim());
    const body = encodeURIComponent(
        document.getElementById('message').value.trim() + "\n\n— " + name
    );
    const subject = encodeURIComponent(
        'Portfolio inquiry from ' + (name || 'Website')
    );

    window.location.href =
        `mailto:evantluong105@gmail.com?subject=${subject}&body=${body}`;
}


// =========================
// Copy Email
// =========================
function copyEmail(){
    const email = 'evantluong105@gmail.com';

    if(navigator.clipboard){
        navigator.clipboard.writeText(email)
            .then(() => alert('Email copied to clipboard'));
    } else {
        const tmp = document.createElement('input');
        document.body.appendChild(tmp);
        tmp.value = email;
        tmp.select();
        document.execCommand('copy');
        tmp.remove();
        alert('Email copied to clipboard');
    }
}
