<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Services\AdminActivityLogger;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $oldData = $user->only(['name', 'email']);
        
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        
        // Track changes
        $changes = [];
        if ($user->isDirty('name')) {
            $changes['name'] = [
                'old' => $oldData['name'],
                'new' => $user->name
            ];
        }
        if ($user->isDirty('email')) {
            $changes['email'] = [
                'old' => $oldData['email'],
                'new' => $user->email
            ];
        }
        
        $user->save();
        
        // Log activity if there were changes
        if (!empty($changes)) {
            AdminActivityLogger::log(
                'profile', 
                'updated',
                "Mengubah profil admin: {$user->name}",
                [
                    'admin_id' => $user->id,
                    'changes' => $changes
                ]
            );
        }

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();
        $userInfo = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email
        ];

        // Log activity before logging out and deleting user
        AdminActivityLogger::log(
            'profile', 
            'deleted',
            "Menghapus akun admin: {$user->name}",
            $userInfo
        );

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
