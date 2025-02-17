<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\User;
use Laravel\Passport\Passport;
use Laravel\Socialite\Facades\Socialite;


class AuthController extends Controller
{
    /**
     * Registration
     */
    public function register(Request $request)
    {
        $request->validate( [
            'name' => 'required|min:4',
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $token = $user->createToken('LaravelAuthApp')->accessToken;

        return response()->json([
            'message' => 'Register successfully',
            'token' => $token,
        ], 200);

    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;

        if ($request->remember_me)
        {
            $token->expires_at = Carbon::now()->addMinute(5);
        }else
        {
            $token->expires_at = Passport::personalAccessTokensExpireIn();
        }
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getUserRoles(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'roles' => $user->getRoleNames(),
//            'permissions' => $user->getPermissionNames(),
            'permissions' => $user->getAllPermissions()->pluck('name'),
        ]);
    }

    /**
     * @return mixed
     */
    public function redirectToGoogle()
    {
        $url = Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
        return response()->json(['url' => $url]);
    }

    /**
     * @return mixed
     */
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            $user = User::updateOrCreate(
                ['email' => $googleUser->email],
                [
                    'name' => $googleUser->name,
                    'google_id' => $googleUser->id,
                    'avatar' => $googleUser->avatar,
                ]
            );

            $token = $user->createToken('Personal Access Token')->accessToken;

            return redirect('http://13.213.53.146:3000/auth/google/callback/?token='.$token.'&user_id='.$user->id);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to login'], 500);
        }
    }
}
