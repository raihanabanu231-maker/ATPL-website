import http from 'http';

function check(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

async function run() {
  console.log('Testing 5180:', await check('http://localhost:5180/factory-map.html'));
  console.log('Testing 5180 root:', await check('http://localhost:5180/#factory-3d'));
}
run();
