<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Models\User;

class ProductController extends Controller implements  HasMiddleware
{
    /**
     * @return Middleware[]
     */
    public static function middleware(): array
    {
        return [
//            'role_or_permission:manager|edit articles', //Kiểm tra nếu người dùng có vai trò hoặc quyền cụ thể.
//            new Middleware('role:admin', only: ['store', 'udpate', 'destroy']), //Kiểm tra vai trò Admin
//            new Middleware('role:viewer', only: ['index']), //Kiểm tra vai trò Admin
//            new Middleware(\Spatie\Permission\Middleware\RoleMiddleware::using('manager'), except:['show']), // Sử dụng middleware role với vai trò manager.
//            new Middleware(\Spatie\Permission\Middleware\PermissionMiddleware::using('delete records,api'), only:['destroy']), //Kiểm tra quyền delete records và api.
        ];
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index(Request $request) {
        $perPage = $request->input('per_page', 10);
        $products = Product::paginate($perPage);
        return response()->json($products);
    }

    /**
     * @param Product $product
     * @return mixed
     */
    public function show(Product $product) {
//        if (!auth()->user()->hasAnyRole(['editor', 'admin'])) {
//            return response()->json([
//                'message' => 'You do not have the required authorization.',
//                'status' => 403
//            ], 403);
//        }
        return response()->json($product);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request) {
        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    /**
     * @param Request $request
     * @param Product $product
     * @return mixed
     */
    public function update(Request $request, Product $product) {
        $product->update($request->all());
        return response()->json($product);
    }

    /**
     * @param Product $product
     * @return mixed
     */
    public function destroy(Product $product) {
        $product->delete();
        return response()->json([
            'message' => 'Product deleted successfully',
            'product_id' => $product->id,
        ], 200); //
    }
}
