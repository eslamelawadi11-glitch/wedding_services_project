<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlist = Wishlist::where('user_id', auth()->id())
            ->with('service.vendor')
            ->get();

        return response()->json($wishlist);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|exists:services,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $wishlist = Wishlist::firstOrCreate([
            'user_id' => auth()->id(),
            'service_id' => $request->service_id,
        ]);

        return response()->json($wishlist->load('service'), 201);
    }

    public function destroy($id)
    {
        $wishlist = Wishlist::where('user_id', auth()->id())
            ->where('service_id', $id)
            ->firstOrFail();

        $wishlist->delete();

        return response()->json(['message' => 'Removed from wishlist']);
    }
}

