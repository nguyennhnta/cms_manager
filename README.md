Các bước để cài đặt laravel_cms (laravel version 11  + nuxt 3 trên cùng 1 ec2 )  

Tạo EC2 Instance dùng t3.medium và 20gb mới đủ sử dụng ,( lưu ý bản miễn phí t2 micro thì không đủ)  
* Chạy EC2 Ubuntu 22.04 hoặc 20.04.  
* Mở các cổng sau trong Security Group: 
    * 80, 443 (cho Nginx reverse proxy)  
    * 3000 (nếu bạn muốn truy cập trực tiếp vào Nuxt)  
    * 22 (SSH)  

Cài đặt Docker & Docker Compose  
sudo apt update && sudo apt upgrade -y  
sudo apt install -y docker.io docker-compose  
sudo systemctl enable docker  
sudo usermod -aG docker $USER  # Thêm quyền Docker cho user hiện tại  
Đăng xuất và đăng nhập lại để áp dụng quyền. (Thoát ssh ec2 và đăng nhập lại)  

Docker ps để kiểm tra.  
———————————————————

Git clone source code git clone https://github.com/nguyennhnta/cms_manager.git 
git checkout feature/aws 

Source api là laravel_cms , source nuxt là nuxt_cms , có 2 source cần build 2 docker khác nhau 

I. Cài đặt souce laravel api: 

———  File config nginx ——— 
server {
listen 80;
server_name localhost;

    root /var/www/public/;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass laravel_cms_app:9000;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;
    }

    location ~ /\.ht {
        deny all;
    }
}

——— Docker composer  ———— 
services:
app:
build:
context: ./
dockerfile: Dockerfile
        image: laravel_cms
        container_name: laravel_cms_app
        restart: unless-stopped
        working_dir: /var/www/
        volumes:
            - ./:/var/www
        networks:
            - laravel_cms

    db:
        image: mysql:8.0
        container_name: laravel_cms_db
        restart: unless-stopped
        ports:
            - ${MYSQL_PORT_EXTRA:-3306}:3306
        environment:
            MYSQL_DATABASE: ${DB_DATABASE}
            MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
            MYSQL_USER: ${DB_MYSQL_USER}
            MYSQL_PASSWORD: ${DB_MYSQL_PASSWORD}
            SERVICE_TAGS: dev
            SERVICE_NAME: mysql
        command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --max_connections=2213 --group_concat_max_len=1000000
        volumes:
            - mysql_data:/var/lib/mysql
            - ./docker-compose/mysql:/docker-entrypoint-initdb.d
        networks:
            - laravel_cms

    nginx:
        image: nginx:alpine
        container_name: laravel_cms_nginx
        restart: unless-stopped
        ports:
            - 80:80
        volumes:
            - ./:/var/www
            - ./docker-compose/nginx:/etc/nginx/conf.d/
        networks:
            - laravel_cms
volumes:
mysql_data:
networks:
laravel_cms:
driver: bridge

—————————————
Tạo RDS trên aws và  kết nối navicat hoặc mysql mysql workbench để tạo database laravel. 
connection_name : tự đặt 
host : laravel.ct8mgmqk627h.ap-southeast-1.rds.amazonaws.com (end point của rds trong aws) 
port ( 3306) 
username: user_laravel 
passport: password 

Sau đó connect đến sửa lại file .env , lưu ý là cần tạo rds để có thể connect đến. 
DB_CONNECTION=mysql
DB_HOST=laravel.ct8mgmqk627h.ap-southeast-1.rds.amazonaws.com
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=user_laravel
DB_PASSWORD=password

---------------------


———————
Dành cho build Local :   
DB_CONNECTION=mysql 
DB_HOST=laravel_cms_db 
DB_PORT=3306 
DB_DATABASE=laravel_cms 
DB_USERNAME=root 
DB_PASSWORD=root 
DB_MYSQL_USER=laravel_cms 
DB_MYSQL_PASSWORD=password_laravel_cms 



GOOGLE_CLIENT_ID= 
GOOGLE_CLIENT_SECRET= 
GOOGLE_REDIRECT_URI= 
—————————————
B1. clone source    
B2. cp .env.example .env      
B3. docker-compose up -d    
B4. docker exec -it --user root  laravel_cms_app bash   
B5. composer install     
B6. php artisan key:generate   
B7. php artisan migrate:refresh --seed 
B8. php artisan passport:client --personal 
B10. php artisan passport:keys --force 
B11. php artisan config:cache 
B12. php artisan cache:clear 
B13. php artisan view:clear 
B14. php artisan config:cache 
B15. Exit -> sudo chmod -R 777 storage/ 

———————
Sau khi chạy các lệnh trên test lại trên browser 
http://13.214.183.18 hoặc trên postman http://13.214.183.18/api/register với method post 
body {
email : nguyennhdn@gmail.com
password: admin12345
name : hoang nguyen2121
}

——————
Tham khảo thêm các lệnh: 

rebuild docker image :docker-compose up -d --build --force-recreate 
docker-compose build --no-cache 
docker-compose  up -d 
docker-compose  down 
docker-compose -f docker-compose.dev.yml down 
php artisan config:cache 
php artisan install:api --passport 
php artisan passport:client --personal 
php artisan passport:keys --force 
php artisan config:clear 
php artisan cache:clear 
php artisan route:clear 
php artisan make:seeder RoleAndPermissionSeeder 


————————————————
Nếu không chạy được, Kiểm tra cấu hình nginx 
docker exec -it laravel_cms_nginx sh 
docker logs laravel_cms_nginx 
nginx -t/  
ls -l /etc/nginx/conf.d 
cat /etc/nginx/conf.d/laravel_cms.conf———— 


—————

Cài đặt souce nuxt  : 
————

docker-compose down -v 
docker-compose build --no-cache 
docker-compose up -d 
docker-compose up -d --build --force-recreate 
————

Kiểm tra lỗi khi build docker docker ps 
docker logs nuxt_cms_app 

————

Truy cấp http://your-ip.com:3000/signup với source next 
——————

Xóa tất cả docker tham khảo: 
Bước 1: Dừng tất cả container đang chạy 
docker stop $(docker ps -q) 
Bước 2: Xóa tất cả container 
docker rm $(docker ps -aq) 
Bước 3: Xóa tất cả images 
docker rmi $(docker images -q) -f 
Bước 4: Xóa tất cả volumes 
docker volume rm $(docker volume ls -q) 
Hoặc nếu gặp lỗi do volume đang sử dụng: 
docker volume prune -f 
Bước 5: Xóa tất cả networks 
docker network rm $(docker network ls -q) 
Hoặc để xóa tất cả network không dùng: 
docker network prune -f 
Bước 6: Dọn dẹp toàn bộ Docker (nếu cần) 
Nếu  muốn reset Docker hoàn toàn: 
docker system prune -a --volumes -f 

