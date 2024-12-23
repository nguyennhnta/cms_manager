B1. clone source  
B2. cp .env.example .env    
B3. docker-compose up -d   
B4. docker exec -it --user root  laravel_cms_app bash  
B5. composer install   
B6. php artisan key:generate  
B7. php artisan migrate

rebuild docker image :docker-compose up -d --build --force-recreate
docker-compose -f docker-compose.dev.yml build --no-cache
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml down

php artisan config:cache
php artisan cache:clear
php artisan passport:client --personal



------------------production-------------------------
docker-compose -f docker-compose.prod.yml up -d --build
