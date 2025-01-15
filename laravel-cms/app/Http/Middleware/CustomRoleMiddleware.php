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
                'message' => 'Role is not provided. Please check again!',
                'status' => 400
            ], 400);
        }
        if (!$request->user() || !$request->user()->hasRole($role)) {
            return response()->json([
                'message' => 'You do not have access permission. Please contact the administrator!',
                'status' => 403
            ], 403);
        }

        return $next($request);
    }
}
