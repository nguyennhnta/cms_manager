<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PostController extends Controller implements  HasMiddleware
{
    public static function middleware(): array
    {
        return [
//            'role_or_permission:manager|edit articles', //Kiểm tra nếu người dùng có vai trò hoặc quyền cụ thể.
            new Middleware('role:Admin', only: ['index']), //Kiểm tra vai trò Admin
//            new Middleware(\Spatie\Permission\Middleware\RoleMiddleware::using('manager'), except:['show']), // Sử dụng middleware role với vai trò manager.
//            new Middleware(\Spatie\Permission\Middleware\PermissionMiddleware::using('delete records,api'), only:['destroy']), //Kiểm tra quyền delete records và api.
        ];
    }

    public function index()
    {
        return Post::all();
    }

    public function store(Request $request)
    {
        $post = Post::create($request->all());
        return response()->json($post, 201);
    }

    public function update(Request $request, Post $post)
    {
        $post->update($request->all());
        return response()->json($post);
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(null, 204);
    }
}
