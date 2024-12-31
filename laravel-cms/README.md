B1. clone source  
B2. cp .env.example .env    
B3. docker-compose up -d   
B4. docker exec -it --user root  laravel_cms_app bash  
B5. composer install   
B6. php artisan key:generate  
B7. php artisan migrate:refresh --seed
php artisan passport:client --personal
B8. php artisan cache:clear
B9. php artisan view:clear

rebuild docker image :docker-compose up -d --build --force-recreate
docker-compose build --no-cache
docker-compose  up -d
docker-compose  down
docker-compose -f docker-compose.dev.yml down

php artisan config:cache

php artisan install:api --passport


sudo chmod -R 777 storage/

php artisan passport:keys --force
php artisan make:seeder RoleAndPermissionSeeder





------------------production-------------------------
docker-compose -f docker-compose.prod.yml up -d --build
