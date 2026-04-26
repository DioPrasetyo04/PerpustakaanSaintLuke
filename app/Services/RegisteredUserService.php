<?php

namespace App\Services;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RegisteredUserService
{
    public function Register($request)
    {
        $name = $request->name;
        $avatarPath = null;

        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('users', 'public');
        }

        $user = User::create([
            'name' => $name,
            'username' => generateUsername($name),
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'avatar' => $avatarPath
        ]);

        $user->assignRole('member');

        event(new Registered($user));

        Auth::login($user);
    }
}
