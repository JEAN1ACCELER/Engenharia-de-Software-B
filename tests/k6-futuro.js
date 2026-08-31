// ⚡ Template de carga para a futura API remota do E-Project.
// Executar somente em ambiente autorizado e com dados sintéticos.
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 25 },
    { duration: '5m', target: 25 },
    { duration: '2m', target: 75 },
    { duration: '5m', target: 75 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000', 'p(99)<4000'],
    checks: ['rate>0.99'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://staging.example.invalid';

export default function () {
  const response = http.get(`${BASE_URL}/health`, {
    tags: { flow: 'smoke', service: 'api' },
  });

  check(response, {
    'health responde 2xx': (res) => res.status >= 200 && res.status < 300,
    'health responde em até 2s': (res) => res.timings.duration < 2000,
  });

  // Substituir pelos fluxos autorizados de login, dashboard e tarefas.
  // Não registrar tokens, senhas ou dados pessoais no console.
  sleep(1);
}

export function handleSummary(data) {
  return {
    'artifacts/k6-summary.json': JSON.stringify(data, null, 2),
  };
}
