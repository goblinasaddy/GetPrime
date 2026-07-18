const fs = require('fs');
const path = require('path');

const logPath = path.join(
  'C:', 'Users', 'Aditya Kumar Singh', '.gemini', 'antigravity', 'brain',
  '23b3b5dd-f9e4-47f8-955c-082947ba56a9', '.system_generated', 'steps', '915', 'output.txt'
);

try {
  const content = fs.readFileSync(logPath, 'utf8');
  
  // Parse outer JSON
  const outer = JSON.parse(content);
  const outerResult = outer.result;
  
  const jsonStart = outerResult.indexOf('{"result":');
  const lastCurly = outerResult.lastIndexOf('}');
  const innerJsonStr = outerResult.substring(jsonStart, lastCurly + 1);
  
  const inner = JSON.parse(innerJsonStr);
  const rawLogs = inner.result;
  
  console.log(`Total logs: ${rawLogs.length}`);
  
  // Filter logs with ERROR severity
  const errors = rawLogs.filter(log => log.error_severity === 'ERROR');
  
  console.log(`Found ${errors.length} ERROR logs:`);
  errors.forEach((log, index) => {
    console.log(`--- [Error ${index + 1}] ---`);
    console.log(`Timestamp: ${log.timestamp}`);
    console.log(`Severity: ${log.error_severity}`);
    console.log(`Message: ${log.event_message}`);
  });
} catch (e) {
  console.error(e);
}
