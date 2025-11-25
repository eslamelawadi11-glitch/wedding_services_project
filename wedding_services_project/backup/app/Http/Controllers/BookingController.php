<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $query = Booking::with(['user', 'vendor', 'service']);

        if ($request->has('user') && auth()->check() && auth()->user()->role === 'user') {
            $query->where('user_id', auth()->id());
        }

        if ($request->has('vendor') && auth()->check() && auth()->user()->role === 'vendor') {
            $query->where('vendor_id', auth()->user()->vendor->id);
        }

        if ($request->has('admin') && auth()->check() && auth()->user()->role === 'admin') {
            // Show all bookings
        }

        if ($request->has('limit')) {
            $bookings = $query->orderBy('created_at', 'desc')->limit($request->limit)->get();
        } else {
            $bookings = $query->orderBy('created_at', 'desc')->paginate(15);
        }

        return response()->json($bookings);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date|after:today',
            'message' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $service = \App\Models\Service::findOrFail($request->service_id);

        $booking = Booking::create([
            'user_id' => auth()->id(),
            'vendor_id' => $service->vendor_id,
            'service_id' => $request->service_id,
            'date' => $request->date,
            'message' => $request->message,
            'status' => 'pending',
        ]);

        return response()->json($booking, 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

        // Check authorization
        if (auth()->user()->role === 'vendor' && $booking->vendor_id !== auth()->user()->vendor->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:accepted,rejected',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $booking->update(['status' => $request->status]);

        return response()->json($booking);
    }
}

