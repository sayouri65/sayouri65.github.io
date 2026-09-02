// Archive access configuration.
//
// The real password is NOT committed here — it lives as a GitHub Actions
// repository secret named ARCH_PASSWORD (repo Settings > Secrets and
// variables > Actions). The deploy workflow
// (.github/workflows/deploy-pages.yml) hashes that secret with SHA-256 and
// substitutes it for the placeholder below at build time, just before the
// site is published, so the plaintext password never touches the repo.
//
// This is still just a light client-side gate, not real security — the
// published hash is readable by anyone with dev tools. It only keeps the
// archive out of casual view/search engines.
//
// For local testing, temporarily replace the placeholder with a real
// SHA-256 hash, e.g.:
//   crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourPassword'))
//     .then(buf => console.log([...new Uint8Array(buf)]
//       .map(b => b.toString(16).padStart(2, '0')).join('')));
//
window.ARCH_PASSWORD_HASH = "__ARCH_PASSWORD_HASH__";
