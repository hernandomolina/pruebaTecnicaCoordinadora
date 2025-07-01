const https = require('https');

const data = JSON.stringify(require('./screenplay/data/guia_valida.json'));

const options = {
  hostname: 'apiv2-test.coordinadora.com',
  port: 443,
  path: '/guias/cm-guias-ms/guia',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'PostmanRuntime/7.44.1',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let responseBody = '';
  res.on('data', (chunk) => {
    responseBody += chunk;
  });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Headers:', res.headers);
    console.log('Body:', responseBody);
  });
});

req.on('error', (e) => {
  console.error('Error:', e);
});

req.write(data);
req.end(); 