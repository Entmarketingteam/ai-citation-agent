#!/usr/bin/env node

/**
 * Delete only the AI Citation Agent tables
 * This deletes: Audit_Runs, Trust_Nodes, Citations, LLM_Responses, Priorities
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1]] = match[2];
  }
});

const AIRTABLE_API_KEY = envVars.AIRTABLE_API_KEY;
const BASE_ID = envVars.AIRTABLE_BASE_ID;

const TABLES_TO_DELETE = ['Audit_Runs', 'Trust_Nodes', 'Citations', 'LLM_Responses', 'Priorities'];

function makeRequest(method, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.airtable.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body ? JSON.parse(body) : {});
        } else {
          reject(new Error(`API Error ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function deleteCitationTables() {
  console.log('🗑️  Deleting AI Citation Agent tables...\n');
  console.log('Tables to delete:', TABLES_TO_DELETE.join(', '));
  console.log('');

  try {
    // Get current tables
    const response = await makeRequest('GET', `/v0/meta/bases/${BASE_ID}/tables`);
    const tables = response.tables;

    let deleted = 0;
    let notFound = 0;

    for (const tableName of TABLES_TO_DELETE) {
      const table = tables.find(t => t.name === tableName);
      if (table) {
        try {
          await makeRequest('DELETE', `/v0/meta/bases/${BASE_ID}/tables/${table.id}`);
          console.log(`  ✓ Deleted: ${tableName}`);
          deleted++;
        } catch (error) {
          console.error(`  ✗ Failed to delete ${tableName}:`, error.message);
        }
      } else {
        console.log(`  ⊘ Not found: ${tableName} (may already be deleted)`);
        notFound++;
      }
    }

    console.log(`\n✅ Cleanup complete!`);
    console.log(`   Deleted: ${deleted} tables`);
    if (notFound > 0) {
      console.log(`   Not found: ${notFound} tables`);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

deleteCitationTables();
