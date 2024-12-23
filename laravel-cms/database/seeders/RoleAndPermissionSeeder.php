<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Vô hiệu hóa ràng buộc khóa ngoại
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        // Xóa dữ liệu cũ
        Role::truncate();
        Permission::truncate();

        // Tạo quyền
        $permissions = [
            'create-post',
            'edit-post',
            'delete-post',
            'view-post',
            'approve-post'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Tạo vai trò và gán quyền
        $adminRole = Role::create(['name' => 'admin']);
        $editorRole = Role::create(['name' => 'editor']);
        $viewerRole = Role::create(['name' => 'viewer']);

        $adminRole->givePermissionTo(Permission::all());
        $editorRole->givePermissionTo(['create-post', 'edit-post', 'view-post']);
        $viewerRole->givePermissionTo('view-post');
    }
}
