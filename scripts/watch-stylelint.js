import {spawnSync} from 'node:child_process'

console.log('STYLELINT_START')
spawnSync('npm', ['run', 'lint:style', '--silent', '--', '--formatter=compact'], {
  stdio: 'inherit',
  shell: true,
})
console.log('STYLELINT_END')
