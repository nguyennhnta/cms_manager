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
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Role::truncate();
        Permission::truncate();

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

        $adminRole = Role::create(['name' => 'admin']);
//        Role::create(['name' => 'admin', 'guard_name' => 'api']); // Chỉ định guard cho vai trò 'admin' là 'api'
        $editorRole = Role::create(['name' => 'editor']);
        $viewerRole = Role::create(['name' => 'viewer']);

        $adminRole->givePermissionTo(Permission::all());
        $editorRole->givePermissionTo(['create-post', 'edit-post', 'view-post']);
        $viewerRole->givePermissionTo('view-post');
    }
}
