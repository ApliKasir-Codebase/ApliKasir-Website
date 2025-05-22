<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\User;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Mendapatkan data user, customer, dan produk
        $users = User::all();
        
        if ($users->count() > 0) {
            $user1 = $users[0]; // Budi
            $customers1 = Customer::where('user_id', $user1->id)->get();
            $products1 = Product::where('user_id', $user1->id)->get();
            
            // Jika ada customer dan produk untuk user 1
            if ($customers1->count() > 0 && $products1->count() > 0) {
                // Transaksi tunai untuk pelanggan pertama
                Transaction::create([
                    'user_id' => $user1->id,
                    'tanggal_transaksi' => Carbon::now()->subDays(2),
                    'total_belanja' => 24500,
                    'total_modal' => 17000,
                    'metode_pembayaran' => 'Tunai',
                    'status_pembayaran' => 'Lunas',
                    'id_pelanggan' => $customers1[0]->id,
                    'detail_items' => json_encode([
                        [
                            'product_id' => $products1[0]->id,
                            'nama_produk' => $products1[0]->nama_produk,
                            'jumlah' => 5,
                            'harga_satuan' => $products1[0]->harga_jual,
                            'subtotal' => 5 * $products1[0]->harga_jual,
                            'modal_satuan' => $products1[0]->harga_modal,
                            'subtotal_modal' => 5 * $products1[0]->harga_modal,
                        ],
                        [
                            'product_id' => $products1[1]->id,
                            'nama_produk' => $products1[1]->nama_produk,
                            'jumlah' => 2,
                            'harga_satuan' => $products1[1]->harga_jual,
                            'subtotal' => 2 * $products1[1]->harga_jual,
                            'modal_satuan' => $products1[1]->harga_modal,
                            'subtotal_modal' => 2 * $products1[1]->harga_modal,
                        ]
                    ]),
                    'jumlah_bayar' => 25000,
                    'jumlah_kembali' => 500,
                ]);
                
                // Transaksi kredit untuk pelanggan kedua
                $kreditTransaction = Transaction::create([
                    'user_id' => $user1->id,
                    'tanggal_transaksi' => Carbon::now()->subDays(1),
                    'total_belanja' => 16000,
                    'total_modal' => 10000,
                    'metode_pembayaran' => 'Kredit',
                    'status_pembayaran' => 'Belum Lunas',
                    'id_pelanggan' => $customers1[1]->id,
                    'detail_items' => json_encode([
                        [
                            'product_id' => $products1[2]->id,
                            'nama_produk' => $products1[2]->nama_produk,
                            'jumlah' => 2,
                            'harga_satuan' => $products1[2]->harga_jual,
                            'subtotal' => 2 * $products1[2]->harga_jual,
                            'modal_satuan' => $products1[2]->harga_modal,
                            'subtotal_modal' => 2 * $products1[2]->harga_modal,
                        ]
                    ]),
                    'jumlah_bayar' => 0,
                    'jumlah_kembali' => 0,
                ]);
                
                // Transaksi pembayaran kredit berikutnya
                Transaction::create([
                    'user_id' => $user1->id,
                    'tanggal_transaksi' => Carbon::now(),
                    'total_belanja' => 10000,
                    'total_modal' => 0, // Tidak ada modal karena pembayaran hutang
                    'metode_pembayaran' => 'Pembayaran Kredit Tunai',
                    'status_pembayaran' => 'Lunas',
                    'id_pelanggan' => $customers1[1]->id,
                    'detail_items' => json_encode([
                        [
                            'payment_for' => 'Pembayaran hutang',
                            'amount' => 10000
                        ]
                    ]),
                    'jumlah_bayar' => 10000,
                    'jumlah_kembali' => 0,
                    'id_transaksi_hutang' => $kreditTransaction->id,
                ]);
                
                // Tambahkan beberapa transaksi kredit lainnya untuk pelanggan yang berbeda
                if ($customers1->count() > 2) {
                    // Transaksi kredit untuk pelanggan ketiga
                    Transaction::create([
                        'user_id' => $user1->id,
                        'tanggal_transaksi' => Carbon::now()->subDays(5),
                        'total_belanja' => 45000,
                        'total_modal' => 30000,
                        'metode_pembayaran' => 'Kredit',
                        'status_pembayaran' => 'Belum Lunas',
                        'id_pelanggan' => $customers1[2]->id,
                        'detail_items' => json_encode([
                            [
                                'product_id' => $products1[0]->id,
                                'nama_produk' => $products1[0]->nama_produk,
                                'jumlah' => 10,
                                'harga_satuan' => $products1[0]->harga_jual,
                                'subtotal' => 10 * $products1[0]->harga_jual,
                                'modal_satuan' => $products1[0]->harga_modal,
                                'subtotal_modal' => 10 * $products1[0]->harga_modal,
                            ]
                        ]),
                        'jumlah_bayar' => 0,
                        'jumlah_kembali' => 0,
                    ]);
                }
            }
            
            // Transaksi untuk user kedua jika ada
            if ($users->count() > 1) {
                $user2 = $users[1]; // Ani
                $customers2 = Customer::where('user_id', $user2->id)->get();
                $products2 = Product::where('user_id', $user2->id)->get();
                
                if ($customers2->count() > 0 && $products2->count() > 0) {
                    // Transaksi QRIS
                    Transaction::create([
                        'user_id' => $user2->id,
                        'tanggal_transaksi' => Carbon::now()->subDays(3),
                        'total_belanja' => 30000,
                        'total_modal' => 24000,
                        'metode_pembayaran' => 'QRIS',
                        'status_pembayaran' => 'Lunas',
                        'id_pelanggan' => $customers2[0]->id,
                        'detail_items' => json_encode([
                            [
                                'product_id' => $products2[0]->id,
                                'nama_produk' => $products2[0]->nama_produk,
                                'jumlah' => 10,
                                'harga_satuan' => $products2[0]->harga_jual,
                                'subtotal' => 10 * $products2[0]->harga_jual,
                                'modal_satuan' => $products2[0]->harga_modal,
                                'subtotal_modal' => 10 * $products2[0]->harga_modal,
                            ]
                        ]),
                        'jumlah_bayar' => 30000,
                        'jumlah_kembali' => 0,
                    ]);
                    
                    // Transaksi kredit untuk pelanggan
                    Transaction::create([
                        'user_id' => $user2->id,
                        'tanggal_transaksi' => Carbon::now()->subDays(2),
                        'total_belanja' => 25000,
                        'total_modal' => 18000,
                        'metode_pembayaran' => 'Kredit',
                        'status_pembayaran' => 'Belum Lunas',
                        'id_pelanggan' => $customers2[0]->id,
                        'detail_items' => json_encode([
                            [
                                'product_id' => $products2[1]->id,
                                'nama_produk' => $products2[1]->nama_produk,
                                'jumlah' => 5,
                                'harga_satuan' => $products2[1]->harga_jual,
                                'subtotal' => 5 * $products2[1]->harga_jual,
                                'modal_satuan' => $products2[1]->harga_modal,
                                'subtotal_modal' => 5 * $products2[1]->harga_modal,
                            ]
                        ]),
                        'jumlah_bayar' => 0,
                        'jumlah_kembali' => 0,
                    ]);
                    
                    if ($customers2->count() > 1) {
                        // Transaksi kredit untuk pelanggan kedua
                        Transaction::create([
                            'user_id' => $user2->id,
                            'tanggal_transaksi' => Carbon::now()->subDays(4),
                            'total_belanja' => 36000,
                            'total_modal' => 24000,
                            'metode_pembayaran' => 'Kredit',
                            'status_pembayaran' => 'Belum Lunas',
                            'id_pelanggan' => $customers2[1]->id,
                            'detail_items' => json_encode([
                                [
                                    'product_id' => $products2[0]->id,
                                    'nama_produk' => $products2[0]->nama_produk,
                                    'jumlah' => 4,
                                    'harga_satuan' => $products2[0]->harga_jual,
                                    'subtotal' => 4 * $products2[0]->harga_jual,
                                    'modal_satuan' => $products2[0]->harga_modal,
                                    'subtotal_modal' => 4 * $products2[0]->harga_modal,
                                ],
                                [
                                    'product_id' => $products2[1]->id,
                                    'nama_produk' => $products2[1]->nama_produk,
                                    'jumlah' => 2,
                                    'harga_satuan' => $products2[1]->harga_jual,
                                    'subtotal' => 2 * $products2[1]->harga_jual,
                                    'modal_satuan' => $products2[1]->harga_modal,
                                    'subtotal_modal' => 2 * $products2[1]->harga_modal,
                                ]
                            ]),
                            'jumlah_bayar' => 0,
                            'jumlah_kembali' => 0,
                        ]);
                    }
                }
            }
        }
    }
}
