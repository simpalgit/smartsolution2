const https = require('https');

function makeRequest(path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const options = {
      hostname: 'loanbaazaar.com',
      port: 443,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Application-Source': 'smartmumbaisolutions',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', error => reject(error));
    req.write(data);
    req.end();
  });
}

async function testAPIs() {
  const loanPayload = {
    loanType: "personal-loan",
    fullName: "Test User",
    mobileNumber: "9876543210",
    employmentType: "salaried",
    annualIncome: 600000
  };

  const insurancePayload = {
    insuranceType: "health-insurance",
    fullName: "Test User",
    mobileNumber: "9876543210",
    employmentType: "salaried",
    annualIncome: 600000
  };

  console.log("--- Testing Loan API ---");
  console.log("Sending:", JSON.stringify(loanPayload));
  try {
    const res = await makeRequest('/api/applications/loan', loanPayload);
    console.log("Loan Status:", res.status);
    console.log("Loan Response:", res.data);
  } catch (err) {
    console.error("Loan Error:", err);
  }

  console.log("\n--- Testing Insurance API ---");
  console.log("Sending:", JSON.stringify(insurancePayload));
  try {
    const res = await makeRequest('/api/applications/insurance', insurancePayload);
    console.log("Insurance Status:", res.status);
    console.log("Insurance Response:", res.data);
  } catch (err) {
    console.error("Insurance Error:", err);
  }
}

testAPIs();
