// gerar-hash.ts
import bcrypt from 'bcryptjs';

(async () => {
  const hash = await bcrypt.hash('senha123', 10);
  console.log('Hash correto para "senha123":');
  console.log(hash);
})();