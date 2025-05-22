<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Contoh pengguna aplikasi mobile
        $users = [
            [
                'name' => 'Budi Santoso',
                'email' => 'budi@gmail.com',
                'phoneNumber' => '08123456789',
                'storeName' => 'Toko Budi Jaya',
                'storeAddress' => 'Jl. Kemanggisan No. 123, Jakarta Barat',
                'passwordHash' => Hash::make('Budi123!'),
                'profileImagePath' => 'https://firebasestorage.googleapis.com/v0/b/aplikasir-database.appspot.com/o/profile_images%2Fprofile_1744869027062-881212378.png?alt=media&token=4ca2b32f-98ad-454c-a6b6-069593fdd241',
                'kodeQR' => 'QR-BUDI-' . strtoupper(substr(md5(rand()), 0, 8)),
                'last_sync_time' => now(),
            ],
            [
                'name' => 'Ani Wijaya',
                'email' => 'ani.wijaya@yahoo.com',
                'phoneNumber' => '08234567890',
                'storeName' => 'Mini Market Ani',
                'storeAddress' => 'Jl. Raya Bogor KM 5, Depok',
                'passwordHash' => Hash::make('Ani123!'),
                'profileImagePath' => 'https://firebasestorage.googleapis.com/v0/b/aplikasir-database.appspot.com/o/profile_images%2Fprofile_1744869027062-881212378.png?alt=media&token=4ca2b32f-98ad-454c-a6b6-069593fdd241',
                'kodeQR' => 'QR-ANI-' . strtoupper(substr(md5(rand()), 0, 8)),
                'last_sync_time' => now(),
            ],
            [
                'name' => 'Siska Dewi',
                'email' => 'siskadewi@gmail.com',
                'phoneNumber' => '08345678901',
                'storeName' => 'Warung Siska',
                'storeAddress' => 'Jl. Margonda Raya No. 54, Depok',
                'passwordHash' => Hash::make('Siska123!'),
                'profileImagePath' => 'https://firebasestorage.googleapis.com/v0/b/aplikasir-database.appspot.com/o/profile_images%2Fprofile_1744869027062-881212378.png?alt=media&token=4ca2b32f-98ad-454c-a6b6-069593fdd241',
                'kodeQR' => 'QR-SISKA-' . strtoupper(substr(md5(rand()), 0, 8)),
                'last_sync_time' => null,
            ],
            [
                'name' => 'Ahmad Fauzi',
                'email' => 'ahmad.fauzi@gmail.com',
                'phoneNumber' => '08765432109',
                'storeName' => 'Warung Makan Berkah',
                'storeAddress' => 'Jl. Veteran No. 25, Bandung',
                'passwordHash' => Hash::make('Ahmad123!'),
                'profileImagePath' => 'https://firebasestorage.googleapis.com/v0/b/aplikasir-database.appspot.com/o/profile_images%2Fprofile_1744869027062-881212378.png?alt=media&token=4ca2b32f-98ad-454c-a6b6-069593fdd241',
                'kodeQR' => 'QR-AHMAD-' . strtoupper(substr(md5(rand()), 0, 8)),
                'last_sync_time' => now(),
            ],
            [
                'name' => 'Dewi Susanti',
                'email' => 'dewi.susanti@yahoo.com',
                'phoneNumber' => '08987654321',
                'storeName' => 'Toko Elektronik Dewi',
                'storeAddress' => 'Jl. Sudirman Blok A3, Jakarta Selatan',
                'passwordHash' => Hash::make('Dewi123!'),
                'profileImagePath' => 'https://firebasestorage.googleapis.com/v0/b/aplikasir-database.appspot.com/o/profile_images%2Fprofile_1744869027062-881212378.png?alt=media&token=4ca2b32f-98ad-454c-a6b6-069593fdd241',
                'kodeQR' => 'QR-DEWI-' . strtoupper(substr(md5(rand()), 0, 8)),
                'last_sync_time' => now(),
            ],
            [
                'name' => 'Rudi Hartono',
                'email' => 'rudi.hartono@gmail.com',
                'phoneNumber' => '08123456780',
                'storeName' => 'Kios Buah Rudi',
                'storeAddress' => 'Jl. Flamboyan No. 12, Surabaya',
                'passwordHash' => Hash::make('Rudi123!'),
                'profileImagePath' => 'https://firebasestorage.googleapis.com/v0/b/aplikasir-database.appspot.com/o/profile_images%2Fprofile_1744869027062-881212378.png?alt=media&token=4ca2b32f-98ad-454c-a6b6-069593fdd241',
                'kodeQR' => 'QR-RUDI-' . strtoupper(substr(md5(rand()), 0, 8)),
                'last_sync_time' => now()->subDays(5),
            ],
            [
                'name' => 'Siti Nurhaliza',
                'email' => 'siti@gmail.com',
                'phoneNumber' => '08567890123',
                'storeName' => 'Butik Siti',
                'storeAddress' => 'Jl. Gatot Subroto No. 45, Jakarta Pusat',
                'passwordHash' => Hash::make('Siti123!'),
                'profileImagePath' => 'https://firebasestorage.googleapis.com/v0/b/aplikasir-database.appspot.com/o/profile_images%2Fprofile_1744869027062-881212378.png?alt=media&token=4ca2b32f-98ad-454c-a6b6-069593fdd241',
                'kodeQR' => 'QR-SITI-' . strtoupper(substr(md5(rand()), 0, 8)),
                'last_sync_time' => now()->subDays(2),
            ],
            [
                'name' => 'Joko Widodo',
                'email' => 'joko@yahoo.com',
                'phoneNumber' => '08678901234',
                'storeName' => 'Mebel Jaya',
                'storeAddress' => 'Jl. Pahlawan No. 17, Solo',
                'passwordHash' => Hash::make('Joko123!'),
                'profileImagePath' => 'https://firebasestorage.googleapis.com/v0/b/aplikasir-database.appspot.com/o/profile_images%2Fprofile_1744869027062-881212378.png?alt=media&token=4ca2b32f-98ad-454c-a6b6-069593fdd241',
                'kodeQR' => 'QR-JOKO-' . strtoupper(substr(md5(rand()), 0, 8)),
                'last_sync_time' => now()->subDays(1),
            ],
            [
                'name' => 'Maya Putri',
                'email' => 'maya.putri@gmail.com',
                'phoneNumber' => '08789012345',
                'storeName' => 'Salon Maya',
                'storeAddress' => 'Jl. Diponegoro No. 78, Semarang',
                'passwordHash' => Hash::make('Maya123!'),
                'profileImagePath' => 'https://firebasestorage.googleapis.com/v0/b/aplikasir-database.appspot.com/o/profile_images%2Fprofile_1744869027062-881212378.png?alt=media&token=4ca2b32f-98ad-454c-a6b6-069593fdd241',
                'kodeQR' => 'QR-MAYA-' . strtoupper(substr(md5(rand()), 0, 8)),
                'last_sync_time' => null,
            ],
            [
                'name' => 'Hadi Susanto',
                'email' => 'hadi@gmail.com',
                'phoneNumber' => '08890123456',
                'storeName' => 'Bengkel Hadi',
                'storeAddress' => 'Jl. Raya Cibubur No. 56, Jakarta Timur',
                'passwordHash' => Hash::make('Hadi123!'),
                'profileImagePath' => 'https://firebasestorage.googleapis.com/v0/b/aplikasir-database.appspot.com/o/profile_images%2Fprofile_1744869027062-881212378.png?alt=media&token=4ca2b32f-98ad-454c-a6b6-069593fdd241',
                'kodeQR' => 'QR-HADI-' . strtoupper(substr(md5(rand()), 0, 8)),
                'last_sync_time' => now()->subDays(3),
            ],
            [
                'name' => 'Rina Marlina',
                'email' => 'rina@yahoo.com',
                'phoneNumber' => '08901234567',
                'storeName' => 'Apotek Sehat',
                'storeAddress' => 'Jl. Antasari No. 34, Banjarmasin',
                'passwordHash' => Hash::make('Rina123!'),
                'profileImagePath' => 'https://firebasestorage.googleapis.com/v0/b/aplikasir-database.appspot.com/o/profile_images%2Fprofile_1744869027062-881212378.png?alt=media&token=4ca2b32f-98ad-454c-a6b6-069593fdd241',
                'kodeQR' => 'QR-RINA-' . strtoupper(substr(md5(rand()), 0, 8)),
                'last_sync_time' => now()->subWeeks(1),
            ],
        ];

        foreach ($users as $userData) {
            User::create($userData);
        }
    }
}
