import http from 'k6/http'
import { check, group, sleep } from "k6";
import { Counter, Rate, Trend } from "k6/metrics";

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// output to a simple http report, can output to Promethesis timeseries, InfluxDB Grafana or Cloud APM etc
export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

const BASE_URL = 'https://secondphasedev-dev-sflight-srv.cfapps.ap10.hana.ondemand.com';

// 1. init code
export let options = {
    stages: [
      { target: 10, duration: "1m" }, // Linearly ramp up from 1 to 50 VUs during first minute
      { target: 10, duration: "3m30s" }, // Hold at 50 VUs for the next 3 minutes and 30 seconds
      { target: 0, duration: "30s" }     // Linearly ramp down from 50 to 0 50 VUs over the last 30 seconds
      // // Total execution time will be ~5 minutes
    ],
    thresholds: {
      "http_req_duration": ["p(95)<500"], // We want the 95th percentile of all HTTP request durations to be less than 500ms
      "http_req_duration{staticAsset:yes}": ["p(99)<250"],   // Requests with the staticAsset tag should finish even faster
      // Thresholds based on the custom metric we defined and use to track application failures
      "check_failure_rate": [
        "rate<0.01",      // Global failure rate should be less than 1%
        { threshold: "rate<=0.05", abortOnFail: true }  // Abort the test early if it climbs over 5%
      ]
    }
  };


const loginData = JSON.parse(open("./users.json"));

// 2. setup vu
export function setup() {
  const tokenURL = __ENV.TOKENURL; //'https://secondphase.authentication.ap10.hana.ondemand.com/oauth/token';
  const clientId = __ENV.CLIENTID;
  const clientSecret = __ENV.CLIENTSECRET;
  let credentials = loginData.users[Math.floor(Math.random() * 1)];

  const requestBody = {
    grant_type: 'password',
    client_id: clientId,
    client_secret: clientSecret,
    scope: "",
    username: credentials.username,
    password: credentials.password
  };

  const res = http.post(tokenURL, requestBody);
  return JSON.parse(res.body).access_token; //jwt
}

// 3. virtual user tests
export default function main(access_token) {
  //   // use har converter or browser recorder to capture tests based on actual user input 
  //   // a nice feature for generating tests from swagger / openai also 
  group('inital load of sflight app', () => {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      }
    }
    const res = http.get(`${BASE_URL}/analytics/Bookings`, params);
    console.log(res.status)
  });
}

// 4. teardown code
export function teardown() {
}
