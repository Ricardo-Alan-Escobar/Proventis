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
            'video_url' => 'nullable|file|mimetypes:video/mp4,video/avi,video/mov,video/wmv|max:20000',
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

        if ($request->hasFile('video_url')) {
            $post->video_url = $request->file('video_url')->store('videos', 'public');
        }
        

        $post->save();

        return redirect()->back();
    }

    public function index()
{
    $userId = auth()->id(); 

    $posts = Post::with('user')->latest()->get()->map(function ($post) use ($userId) {
        return [
            'id' => $post->id,
            'title' => $post->title,
            'content' => $post->content,
            'image' => $post->image,
            'file' => $post->file,
            'video_url' => $post->video_url,
            'created_at' => $post->created_at,
            'user' => $post->user, 
            'likes_count' => $post->likes()->count(), 
            'isOwner' => $post->user_id === $userId, 
        ];
    }); 

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
        'video_url' => 'nullable|file|mimetypes:video/mp4,video/avi,video/mov,video/wmv|max:20000',
    ]);

    $post->content = $request->content;

    if ($request->hasFile('image')) {
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }
        $post->image = $request->file('image')->store('images', 'public');
    }

    if ($request->hasFile('video_url')) {
        if ($post->video_url) {
            Storage::disk('public')->delete($post->video_url);
        }
        $post->video_url = $request->file('video_url')->store('videos', 'public');
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

    if ($post->video_url) {
        Storage::disk('public')->delete($post->video_url);
    }

    $post->delete();

    return response()->json(['message' => 'Post deleted successfully']);
}

public function like(Post $post)
{
    $user = auth()->user();

    if ($post->likes()->where('user_id', $user->id)->exists()) {
        $post->likes()->detach($user->id); 
        $likedByUser = false;
    } else {
        $post->likes()->attach($user->id); 
        $likedByUser = true;
    }

    return response()->json([
        'likes_count' => $post->likes()->count(),
        'likedByUser' => $likedByUser, 
    ]);
}

public function getLikes(Post $post)
{
    $user = auth()->user();
    $likedByUser = $post->likes()->where('user_id', $user->id)->exists();

    return response()->json([
        'likes' => $post->likes()->count(),
        'likedByUser' => $likedByUser, // Devolver si el usuario ha dado like
    ]);
}

public function getAllLikes()
{
    $likes = Post::withCount('likes')->get()->pluck('likes_count', 'id');
    return response()->json(['likes' => $likes]);
}


public function show(Post $post)
{
    return response()->json([
        'post' => $post,
        'likes_count' => $post->likes()->count(), // Incluye el conteo de likes
    ]);
}
}