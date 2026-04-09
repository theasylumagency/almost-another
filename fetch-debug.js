fetch('http://localhost:3000/aabc/aa-trump').then(r=>r.text()).then(t=>require('fs').writeFileSync('debug.html', t));
