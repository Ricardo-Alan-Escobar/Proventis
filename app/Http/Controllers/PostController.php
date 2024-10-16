<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'image' => 'nullable|image',
            'file' => 'nullable|file',
        ]);

        $post = new Post();
        $post->user_id = auth()->id();
        $post->content = $request->content;

        if ($request->hasFile('image')) {
            $post->image = $request->file('image')->store('images', 'public');
        }

        if ($request->hasFile('file')) {
            $post->file = $request->file('file')->store('files', 'public');
        }

        $post->save();

        return redirect()->back();
    }

    public function index()
    {
        $posts = Post::with('user')->latest()->get();
        return inertia('Dashboard', ['posts' => $posts]);
    }

    
public function update(Request $request, Post $post)
{
   
    if (auth()->id() !== $post->user_id) {
        return response()->json(['message' => 'Unauthorized'], 403); 
    }

    $request->validate([
        'content' => 'required|string',
        'image' => 'nullable|image',
    ]);

    $post->content = $request->content;

    if ($request->hasFile('image')) {
        // Borra la imagen antigua si existe
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }
        $post->image = $request->file('image')->store('images', 'public');
    }

    $post->save();

    return response()->json(['message' => 'Post updated successfully', 'post' => $post]);
}


public function destroy(Post $post)
{
    
    if (auth()->id() !== $post->user_id) {
        return response()->json(['message' => 'Unauthorized'], 403); 
    }

    if ($post->image) {
        Storage::disk('public')->delete($post->image);
    }

    if ($post->file) {
        Storage::disk('public')->delete($post->file);
    }

    $post->delete();

    return response()->json(['message' => 'Post deleted successfully']);
}




}