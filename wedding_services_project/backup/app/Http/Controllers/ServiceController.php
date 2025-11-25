<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Service::with(['vendor', 'reviews'])->where('status', 'approved');

        // Filters
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('city')) {
            $query->whereHas('vendor', function($q) use ($request) {
                $q->where('city', 'like', '%' . $request->city . '%');
            });
        }

        if ($request->has('price_min')) {
            $query->where('price', '>=', $request->price_min);
        }

        if ($request->has('price_max')) {
            $query->where('price', '<=', $request->price_max);
        }

        if ($request->has('rating')) {
            $query->whereHas('reviews', function($q) use ($request) {
                $q->havingRaw('AVG(rating) >= ?', [$request->rating]);
            });
        }

        if ($request->has('search')) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Vendor filter (for vendor dashboard)
        if ($request->has('vendor') && auth()->check() && auth()->user()->role === 'vendor') {
            $query->where('vendor_id', auth()->user()->vendor->id);
        }

        $services = $query->paginate(12);

        return response()->json($services);
    }

    public function show($id)
    {
        $service = Service::with(['vendor.user', 'reviews.user'])->findOrFail($id);
        return response()->json($service);
    }

    public function store(Request $request)
    {
        if (auth()->user()->role !== 'vendor') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'address' => 'required|string',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
            'features' => 'nullable|array',
            'images' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $vendor = auth()->user()->vendor;

        $service = Service::create([
            'vendor_id' => $vendor->id,
            'title' => $request->title,
            'category' => $request->category,
            'description' => $request->description,
            'price' => $request->price,
            'address' => $request->address,
            'lat' => $request->lat,
            'lng' => $request->lng,
            'features' => $request->features,
            'images' => $request->images,
            'status' => 'pending',
        ]);

        return response()->json($service, 201);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        if (auth()->user()->role !== 'vendor' || $service->vendor_id !== auth()->user()->vendor->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'category' => 'sometimes|string',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'address' => 'sometimes|string',
            'lat' => 'nullable|numeric',
            'lng' => 'nullable|numeric',
            'features' => 'nullable|array',
            'images' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $service->update($request->only([
            'title', 'category', 'description', 'price', 'address',
            'lat', 'lng', 'features', 'images'
        ]));

        return response()->json($service);
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);

        if (auth()->user()->role !== 'vendor' || $service->vendor_id !== auth()->user()->vendor->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $service->delete();

        return response()->json(['message' => 'Service deleted successfully']);
    }

    public function featured()
    {
        $services = Service::with(['vendor', 'reviews'])
            ->where('status', 'approved')
            ->inRandomOrder()
            ->limit(8)
            ->get();

        return response()->json($services);
    }

    public function topRated()
    {
        $services = Service::with(['vendor', 'reviews'])
            ->where('status', 'approved')
            ->withAvg('reviews', 'rating')
            ->orderBy('reviews_avg_rating', 'desc')
            ->limit(8)
            ->get();

        return response()->json($services);
    }
}

