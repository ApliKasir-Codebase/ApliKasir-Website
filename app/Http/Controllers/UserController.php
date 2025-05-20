<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Transaction;
use App\Services\AdminActivityLogger;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{    /**
     * Display a listing of the users.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $query = User::select('id', 'name', 'email', 'phoneNumber', 'storeName', 'created_at');
        
        // Apply search if provided
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phoneNumber', 'like', "%{$search}%")
                  ->orWhere('storeName', 'like', "%{$search}%");
            });
        }
        
        $users = $query->orderBy('created_at', 'desc')
                     ->paginate(10)
                     ->withQueryString();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created user in storage.
     */    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phoneNumber' => 'required|string|unique:users',
            'storeName' => 'required|string|max:255',
            'storeAddress' => 'required|string',
            'password' => 'required|string|min:8',
        ]);

        $validated['passwordHash'] = bcrypt($request->password);

        $user = User::create($validated);
        
        // Log admin activity
        AdminActivityLogger::log(
            'users', 
            'created',
            "Membuat pengguna baru: {$user->name}",
            [
                'user_id' => $user->id,
                'user_email' => $user->email,
                'store_name' => $user->storeName
            ]
        );

        return redirect()->route('users.index')->with('success', 'Pengguna berhasil ditambahkan!');
    }/**
     * Display the specified user.
     */    public function show(User $user)
    {
        $user->load([
            'customers' => function ($query) {
                $query->where('is_deleted', false)
                      ->orderBy('nama_pelanggan');
            },
            'transactions' => function ($query) {
                $query->where('is_deleted', false)
                      ->with('customer')  // Load the customer relationship
                      ->orderBy('tanggal_transaksi', 'desc')
                      ->limit(10);
            },
            'products' => function ($query) {
                $query->where('is_deleted', false)
                      ->orderBy('nama_produk');
            }
        ]);

        // Get all unpaid transactions (debts)
        $customerDebts = Transaction::where('id_pengguna', $user->id)
            ->where('status_pembayaran', 'Belum Lunas')
            ->where('is_deleted', false)
            ->with('customer')
            ->get();

        return Inertia::render('Users/Show', [
            'user' => $user,
            'customerDebts' => $customerDebts
        ]);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified user in storage.
     */    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'phoneNumber' => 'required|string|unique:users,phoneNumber,'.$user->id,
            'storeName' => 'required|string|max:255',
            'storeAddress' => 'required|string',
        ]);

        // Track changes for logging
        $changes = [];
        foreach ($validated as $key => $value) {
            if ($user->{$key} != $value) {
                $changes[$key] = [
                    'old' => $user->{$key},
                    'new' => $value
                ];
            }
        }
        
        // Check if password is changing
        if ($request->filled('password')) {
            $validated['passwordHash'] = bcrypt($request->password);
            $changes['password'] = ['old' => '[hidden]', 'new' => '[hidden-new]'];
        }

        $user->update($validated);
        
        // Log admin activity if there were changes
        if (!empty($changes)) {
            AdminActivityLogger::log(
                'users', 
                'updated',
                "Mengubah data pengguna: {$user->name}",
                [
                    'user_id' => $user->id,
                    'changes' => $changes
                ]
            );
        }

        return redirect()->route('users.index')->with('success', 'Pengguna berhasil diperbarui!');
    }

    /**
     * Remove the specified user from storage.
     */    public function destroy(User $user)
    {
        $userName = $user->name;
        $userId = $user->id;
        
        $user->delete();
        
        // Log admin activity
        AdminActivityLogger::log(
            'users', 
            'deleted',
            "Menghapus pengguna: {$userName}",
            [
                'user_id' => $userId,
                'user_email' => $user->email,
                'store_name' => $user->storeName
            ]
        );

        return redirect()->route('users.index')->with('success', 'Pengguna berhasil dihapus!');
    }
}
