<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Models\User;

class PostController extends Controller implements  HasMiddleware
{
    public static function middleware(): array
    {
        return [
//            'role_or_permission:manager|edit articles', //Kiểm tra nếu người dùng có vai trò hoặc quyền cụ thể.
            new Middleware('role:admin', only: ['store', 'udpate', 'destroy']), //Kiểm tra vai trò Admin
//            new Middleware('role:viewer', only: ['index']), //Kiểm tra vai trò Admin
//            new Middleware(\Spatie\Permission\Middleware\RoleMiddleware::using('manager'), except:['show']), // Sử dụng middleware role với vai trò manager.
//            new Middleware(\Spatie\Permission\Middleware\PermissionMiddleware::using('delete records,api'), only:['destroy']), //Kiểm tra quyền delete records và api.
        ];
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index() {
        return Post::all();
    }

    /**
     * @param Post $post
     * @return mixed
     */
    public function show(Post $post) {
        if (!auth()->user()->hasAnyRole(['editor', 'admin'])) {
            return response()->json([
                'message' => 'Bạn không có quyền truy cập bài viết này.',
                'status' => 403
            ], 403);
        }
        return response()->json($post);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request) {
        $post = Post::create($request->all());
        return response()->json($post, 201);
    }

    /**
     * @param Request $request
     * @param Post $post
     * @return mixed
     */
    public function update(Request $request, Post $post) {
        $post->update($request->all());
        return response()->json($post);
    }

    /**
     * @param Post $post
     * @return mixed
     */
    public function destroy(Post $post) {
        $post->delete();
        return response()->json(null, 204);
    }
}
