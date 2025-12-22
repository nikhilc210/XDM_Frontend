cd /var/www
git clone https://github.com/nikhilc210/XDM_Frontend.git
cd xdm_frontend





/var/www/
 ├── xdm_news_frontend   (Next.js)
 ├── xdm_news_api        (Node API)
 └── xdm_news_backend 


 pm2 start npm --name XDM_Frontend -- start -- -p 3000



cd /var/www
git clone https://github.com/nikhilc210/xdm_api.git
cd xdm_api


pm2 start index.js --name xdm_api



cd /var/www
git clone https://github.com/nikhilc210/xdm_backend.git
cd xdm_backend


nano /etc/nginx/sites-available/xdiasporamedia.com
xdiasporamedia.com



server {
    server_name xdiasporamedia.com www.xdiasporamedia.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}



ln -s /etc/nginx/sites-available/api.xdiasporamedia.com /etc/nginx/sites-enabled/


nano /etc/nginx/sites-available/admin.xdiasporamedia.com

server {
    server_name admin.xdiasporamedia.com;

    root /var/www/xdm_backend/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}


ln -s /etc/nginx/sites-available/admin.xdiasporamedia.com /etc/nginx/sites-enabled/


certbot --nginx \
-d xdiasporamedia.com \
-d www.xdiasporamedia.com \
-d api.xdiasporamedia.com \
-d admin.xdiasporamedia.com
