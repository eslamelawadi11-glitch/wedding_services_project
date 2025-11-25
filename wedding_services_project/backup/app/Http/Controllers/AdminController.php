<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Service;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function stats()
    {
        $stats = [
            'total_users' => User::where('role', 'user')->count(),
            'total_vendors' => Vendor::count(),
            'total_services' => Service::count(),
            'total_bookings' => Booking::count(),
        ];

        return response()->json($stats);
    }

    public function users()
    {
        $users = User::where('role', 'user')->paginate(15);
        return response()->json($users);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        if ($user->role === 'admin') {
            return response()->json(['message' => 'Cannot delete admin user'], 403);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    public function vendors()
    {
        $vendors = Vendor::with('user')->paginate(15);
        return response()->json($vendors);
    }

    public function deleteVendor($id)
    {
        $vendor = Vendor::findOrFail($id);
        $vendor->user->delete(); // This will cascade delete vendor
        return response()->json(['message' => 'Vendor deleted successfully']);
    }

    public function services(Request $request)
    {
        $query = Service::with(['vendor', 'reviews']);

        if ($request->has('admin')) {
            // Show all services including pending
        } else {
            $query->where('status', 'approved');
        }

        $services = $query->paginate(15);
        return response()->json($services);
    }

    public function updateServiceStatus(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'status' => 'required|in:approved,rejected',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $service->update(['status' => $request->status]);

        return response()->json($service);
    }

    public function bookings()
    {
        $bookings = Booking::with(['user', 'vendor', 'service'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json($bookings);
    }
}

