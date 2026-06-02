#!/usr/bin/env bash
set -euo pipefail

apt update && apt upgrade -y
apt install -y nginx ufw

mkdir -p /var/www/scorpius
chown -R www-data:www-data /var/www/scorpius

cat > /etc/nginx/sites-available/scorpius << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    root /var/www/scorpius;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
}
EOF

ln -sf /etc/nginx/sites-available/scorpius /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "Server setup complete."
