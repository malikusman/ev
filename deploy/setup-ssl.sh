#!/usr/bin/env bash
# Run on the Droplet after ev.dev-scorpiusnetworks.com DNS points to this server.
# Usage: bash deploy/setup-ssl.sh your@email.com
set -euo pipefail

DOMAIN="ev.dev-scorpiusnetworks.com"
EMAIL="${1:-}"

if ! dig +short "$DOMAIN" A | grep -q .; then
  echo "ERROR: $DOMAIN has no DNS A record yet."
  echo "Add in Cloudflare: Type A, Name ev, Content 157.230.217.97, Proxied ON"
  exit 1
fi

CERTBOT_ARGS=(--nginx -d "$DOMAIN" --non-interactive --agree-tos --redirect)
if [[ -n "$EMAIL" ]]; then
  CERTBOT_ARGS+=(--email "$EMAIL")
else
  CERTBOT_ARGS+=(--register-unsafely-without-email)
fi

certbot "${CERTBOT_ARGS[@]}"
nginx -t && systemctl reload nginx
echo "HTTPS enabled for https://$DOMAIN"
echo "Set Cloudflare SSL/TLS mode to Full (strict) if using orange-cloud proxy."
