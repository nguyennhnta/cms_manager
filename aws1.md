# Cài đặt Laravel với MySQL trên EC2 không dùng RDS

## 1. Cài đặt Nginx Server
```bash
sudo apt update
sudo apt install nginx
systemctl status nginx
sudo systemctl restart nginx
sudo systemctl start nginx
sudo systemctl enable nginx
sudo nginx -t
```

### **Disable apache2 (Đối với Ubuntu)**
```bash
sudo lsof -i :80 # Kiểm tra cổng 80 xem có bị chiếm không
sudo systemctl stop apache2
sudo systemctl disable apache2
```

Kiểm tra lại bằng cách truy cập:
```
http://your-ec2-public-ip
```

---
## 2. Cài đặt PHP với các package cần thiết
```bash
sudo apt update
sudo apt install php8.3
sudo apt-get install php8.3-cli php8.3-common php8.3-mysql php8.3-zip php8.3-gd php8.3-mbstring php8.3-curl php8.3-xml php8.3-bcmath php8.3-fpm
```

### **Cấu hình PHP-FPM**
```bash
sudo apt install php8.3-fpm
sudo systemctl start php-fpm
sudo systemctl enable php-fpm
```

---
## 3. Cài đặt Composer (PHP Package Manager)
```bash
sudo curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
composer -v
```

---
## 4. Cấu hình Nginx

### **Ubuntu**
```bash
sudo nano /etc/nginx/sites-available/laravel
```

Thêm nội dung sau:
```nginx
server {
    listen 80;
    server_name your-ec2-public-ip;

    root /var/www/laravel/public;
    index index.php index.html index.htm;

    error_log /var/log/nginx/laravel_error.log;
    access_log /var/log/nginx/laravel_access.log;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/laravel /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### **Linux**
```bash
sudo nano /etc/nginx/conf.d/laravel.conf
```

Thêm nội dung sau:
```nginx
server {
    listen 80;
    server_name your-ec2-public-ip;

    root /var/www/your-laravel-project/public;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php-fpm/www.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }
}
```
```bash
sudo nginx -t
sudo systemctl restart nginx
```

---
## 5. Cài đặt Laravel
```bash
sudo chmod -R 777 source/laravel
composer create-project --prefer-dist laravel/laravel laravel
cd laravel
cp .env.example .env
php artisan key:generate
sudo chmod -R 775 /var/www/source/laravel/
```

---
## 6. Cài đặt MySQL Database

### **Ubuntu**
```bash
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
sudo apt install php-mysql
sudo apt install php8.3-mysql
sudo systemctl restart nginx
```

Cấu hình MySQL:
```bash
sudo mysql
CREATE DATABASE laravel;
CREATE USER 'user_laravel'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON laravel.* TO 'user_laravel'@'localhost';
FLUSH PRIVILEGES;
```

Cấu hình Laravel `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=user_laravel
DB_PASSWORD=password
```
```bash
php artisan migrate
```

### **Linux**
```bash
sudo yum localinstall https://dev.mysql.com/get/mysql80-community-release-el9-1.noarch.rpm
sudo yum update --nogpgcheck -y
sudo yum install mysql-server
sudo systemctl start mysqld
```

Lấy mật khẩu tạm thời:
```bash
sudo grep 'temporary password' /var/log/mysqld.log
```
```bash
mysql_secure_installation
```

Đăng nhập MySQL và cấu hình:
```bash
sudo mysql -u root -p
CREATE DATABASE laravel;
SET GLOBAL validate_password.policy = LOW;
SET GLOBAL validate_password.length = 6;
CREATE USER 'user_laravel'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON laravel.* TO 'user_laravel'@'localhost';
FLUSH PRIVILEGES;
```

```bash
sudo yum install php-mysqli
php artisan migrate
```

---
## 7. Kết nối Navicat

### **Cho phép MySQL chấp nhận kết nối từ xa**
Mở file cấu hình:
```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf  # Ubuntu
sudo nano /etc/my.cnf  # Linux
```
Thay đổi:
```conf
bind-address = 0.0.0.0
```
Khởi động lại MySQL:
```bash
sudo systemctl restart mysql
sudo systemctl restart mysqld  # Linux
```

### **Cấp quyền truy cập từ xa cho người dùng MySQL**
```bash
sudo mysql
CREATE USER 'user_laravel'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON laravel.* TO 'user_laravel'@'%';
```

### **Mở cổng 3306 trên AWS Security Group**

---
## 8. Cấu hình HTTPS với Certbot trên Nginx

---
## 9. Cấu hình RDS với MySQL
Khi tạo xong RDS, chỉ cần cập nhật file `.env`:
```env
DB_HOST=your-rds-endpoint
```
Xóa cache:
```bash
php artisan config:clear
php artisan config:cache
