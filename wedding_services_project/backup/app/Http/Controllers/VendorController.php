<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Service;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    public function stats()
    {
        $vendor = auth()->user()->vendor;

        $stats = [
            'total_services' => Service::where('vendor_id', $vendor->id)->count(),
            'pending_bookings' => Booking::where('vendor_id', $vendor->id)
                ->where('status', 'pending')
                ->count(),
            'accepted_bookings' => Booking::where('vendor_id', $vendor->id)
                ->where('status', 'accepted')
                ->count(),
            'total_revenue' => Booking::where('vendor_id', $vendor->id)
                ->where('status', 'accepted')
                ->join('services', 'bookings.service_id', '=', 'services.id')
                ->sum('services.price'),
        ];

        return response()->json($stats);
    }

    public function bookings(Request $request)
    {
        $vendor = auth()->user()->vendor;

        $bookings = Booking::where('vendor_id', $vendor->id)
            ->with(['user', 'service'])
            ->orderBy('created_at', 'desc');

        if ($request->has('limit')) {
            $bookings = $bookings->limit($request->limit)->get();
        } else {
            $bookings = $bookings->paginate(15);
        }

        return response()->json($bookings);
    }
}

