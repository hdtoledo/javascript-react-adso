#!/usr/bin/env node

/**
 * ============================================================================
 * VALIDADOR INTERACTIVO EN CONSOLA PARA APRENDICES ADSO - FICHA 3314621
 * Centro Agroempresarial y Desarrollo Pecuario del Huila - Garzón
 * ============================================================================
 */

import { spawn } from 'node:child_process';
import readline from 'node:readline';

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  greenBg: "\x1b[42m\x1b[30m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  white: "\x1b[37m"
};

console.clear();
console.log(`${colors.greenBg}   S E N A   ·   F I C H A   3 3 1 4 6 2 1   ${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}Validador Automático de Retos: JavaScript Moderno ➔ React + Vite${colors.reset}`);
console.log(`${colors.dim}Centro Agroempresarial y Desarrollo Pecuario del Huila (CADPH Garzón)${colors.reset}\n`);

const child = spawn('node', ['--test', 'test/validador.test.js'], {
  stdio: ['inherit', 'pipe', 'pipe']
});

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

const rlOut = readline.createInterface({ input: child.stdout });
const rlErr = readline.createInterface({ input: child.stderr });

rlOut.on('line', (line) => {
  if (line.includes('ok ') && line.includes('RETO')) {
    console.log(`\n${colors.bright}${colors.green}✔ ${line.trim()}${colors.reset}`);
  } else if (line.includes('ok ') && !line.includes('RETO')) {
    passedTests++;
    const testName = line.replace(/ok \d+ - /, '').trim();
    console.log(`  ${colors.green}✔${colors.reset} ${colors.dim}${testName}${colors.reset}`);
  } else if (line.includes('not ok ')) {
    failedTests++;
    const testName = line.replace(/not ok \d+ - /, '').trim();
    console.log(`  ${colors.red}✖ ${testName}${colors.reset}`);
  }
});

rlErr.on('line', (line) => {
  console.error(`${colors.red}${line}${colors.reset}`);
});

child.on('close', (code) => {
  console.log(`\n${colors.dim}-------------------------------------------------------${colors.reset}`);
  if (code === 0) {
    console.log(`${colors.bright}${colors.green}🎉 ¡FELICITACIONES! Todos los retos pasaron satisfactoriamente.${colors.reset}`);
    console.log(`${colors.yellow}⭐ Tu código está listo para ser sustentado y subido a tu repositorio de evidencias.${colors.reset}`);
    console.log(`${colors.dim}Siguiente paso: git add . && git commit -m "feat: completar retos js moderno ficha 3314621" && git push${colors.reset}\n`);
  } else {
    console.log(`${colors.bright}${colors.red}⚠️ Hay pruebas que aún no pasan.${colors.reset}`);
    console.log(`${colors.yellow}Revisa los mensajes anteriores y verifica tus archivos en la carpeta /retos${colors.reset}\n`);
  }
});
