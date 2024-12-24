<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Spatie\Permission\Exceptions\UnauthorizedException;

class CustomRoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role = null): Response
    {
        if (is_null($role)) {
            return response()->json([
                'message' => 'Role không được cung cấp. Vui lòng kiểm tra lại!',
                'status' => 400
            ], 400);
        }
        if (!$request->user() || !$request->user()->hasRole($role)) {
            return response()->json([
                'message' => 'Bạn không có quyền truy cập. Vui lòng liên hệ quản trị viên!',
                'status' => 403
            ], 403);
        }

        return $next($request);
    }
}
