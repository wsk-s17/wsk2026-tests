<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $errors = [];

        foreach (['email', 'password'] as $field) {
            $value = $request->json($field);

            if ($value === null || (is_string($value) && trim($value) === '')) {
                $errors[$field] = 'required';
            } elseif (! is_string($value)) {
                $errors[$field] = 'invalid';
            }
        }

        if ($errors) {
            return response()->json(['message' => 'Validation failed', 'errors' => $errors], 400);
        }

        $user = User::where('email', $request->json('email'))->first();

        if (! $user || ! Hash::check($request->json('password'), $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user->api_token = Str::random(60);
        $user->save();

        return response()->json([
            'token' => $user->api_token,
            'user' => ['id' => $user->id, 'name' => $user->name, 'email' => $user->email],
        ]);
    }
}
